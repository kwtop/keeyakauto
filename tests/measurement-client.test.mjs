import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {webcrypto} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {build} from 'esbuild';

const CONSENT='keeyak.measurement-consent.v1';
const {outputFiles}=await build({
  entryPoints:[fileURLToPath(new URL('../src/scripts/measurement-client.ts',import.meta.url))],
  bundle:true,write:false,format:'iife',globalName:'MeasurementClient',platform:'browser',target:'es2022'
});
const code=outputFiles[0].text;
const settle=()=>new Promise(resolve=>setImmediate(resolve));

function storage(initial={},blocked=false){
  const values=new Map(Object.entries(initial)),writes=[];
  return {
    writes,
    getItem(key){if(blocked)throw new Error('Storage unavailable');return values.get(key)??null;},
    setItem(key,value){writes.push({key,value});values.set(key,String(value));},
    removeItem(key){values.delete(key);}
  };
}

function eventHub(){
  const listeners=new Map();
  return {
    addEventListener(type,listener){listeners.set(type,[...(listeners.get(type)||[]),listener]);},
    dispatchEvent(event){for(const listener of listeners.get(event.type)||[])listener(event);return true;}
  };
}

async function browser({choice=null,dnt='0',gpc=false,blockedStorage=false,path='/new-cars/toyota/corolla/?email=private@example.invalid'}={}){
  const requests=[],timers=new Map(),attributes=new Map();let timerId=0;
  const localStorage=storage(choice===null?{}:{[CONSENT]:choice},blockedStorage);
  const sessionStorage=storage();
  const window={...eventHub(),setTimeout(callback){timers.set(++timerId,callback);return timerId;}};
  const document={
    ...eventHub(),readyState:'complete',referrer:'',visibilityState:'visible',
    documentElement:{lang:'en',hasAttribute:name=>attributes.has(name),setAttribute:(name,value)=>attributes.set(name,value)},
    querySelector(){return null;},querySelectorAll(){return [];}
  };
  const context={
    window,document,localStorage,sessionStorage,navigator:{doNotTrack:dnt,globalPrivacyControl:gpc},
    location:new URL(path,'https://example.test'),URL,URLSearchParams,crypto:webcrypto,
    clearTimeout:id=>timers.delete(id),AbortSignal:{timeout:()=>undefined},
    CustomEvent:class {constructor(type,{detail}){this.type=type;this.detail=detail;}},
    fetch:async(url,options)=>{
      requests.push({url,body:JSON.parse(options.body),credentials:options.credentials});
      return {status:200,ok:true};
    }
  };
  vm.runInNewContext(code,context);
  await settle();
  return {
    api:context.MeasurementClient,requests,localStorage,
    async flushTimers(){
      for(let round=0;round<8&&timers.size;round++){
        const callbacks=[...timers.values()];timers.clear();
        for(const callback of callbacks)callback();
        await settle();
      }
    }
  };
}

test('a first visit starts a session and records page and vehicle views without a prompt',async()=>{
  const client=await browser();
  assert.equal(client.api.measurementAllowed(),true);
  assert.deepEqual(client.requests.map(request=>request.url),['/api/telemetry/session/','/api/telemetry/events/']);
  assert.deepEqual(client.requests[1].body.events.map(event=>event.name),['page_view','product_view']);
  assert.ok(client.requests.every(request=>request.credentials==='same-origin'));
  assert.ok(!JSON.stringify(client.requests).includes('private@example.invalid'));
});

test('default enablement does not manufacture a saved visitor consent choice',async()=>{
  const client=await browser();
  assert.equal(client.localStorage.getItem(CONSENT),null);
  assert.equal(client.localStorage.writes.length,0);
});

test('gallery interactions are measured on a first visit without an allow-button click',async()=>{
  const client=await browser();
  client.api.track('gallery_view','product_gallery');
  await client.flushTimers();
  const events=client.requests.filter(request=>request.url==='/api/telemetry/events/').flatMap(request=>request.body.events);
  assert.ok(events.some(event=>event.name==='gallery_view'&&event.position==='product_gallery'));
});

test('a saved basic-count preference remains anonymous and creates no visitor session',async()=>{
  const client=await browser({choice:'basic'});
  assert.equal(client.api.measurementAllowed(),false);
  assert.deepEqual(client.requests.map(request=>request.url),['/api/telemetry/counts/']);
  assert.equal(client.localStorage.getItem(CONSENT),'basic');
});

for(const [name,options] of [
  ['a saved off preference',{choice:'declined'}],
  ['Do Not Track',{dnt:'1'}],
  ['Global Privacy Control',{gpc:true}],
  ['unavailable browser storage',{blockedStorage:true}]
])test(`${name} keeps measurement off`,async()=>{
  const client=await browser(options);
  assert.equal(client.api.measurementAllowed(),false);
  assert.equal(client.requests.length,0);
});

test('admin and design pages do not start measurement sessions',async()=>{
  for(const path of ['/admin/','/design/example/','/design-preview/example/']){
    const client=await browser({path});
    assert.equal(client.requests.length,0);
  }
});
