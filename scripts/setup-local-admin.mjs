import {randomBytes,pbkdf2Sync} from 'node:crypto';
import {access,mkdir,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..');
try{await access(resolve(root,'.dev.vars'));console.log('Existing .dev.vars kept unchanged. Local credentials: .local/admin-access.txt');process.exit(0);}catch{}
const password=randomBytes(18).toString('base64url'),salt=randomBytes(18).toString('hex'),secret=randomBytes(48).toString('hex');
const record=`pbkdf2$100000$${salt}$${pbkdf2Sync(password,salt,100000,32,'sha256').toString('hex')}`;
await mkdir(resolve(root,'.local'),{recursive:true});
await writeFile(resolve(root,'.dev.vars'),[`APP_ENV=local`,`AUTH_MODE=local`,`ADMIN_USERNAME=local-admin`,`ADMIN_PASSWORD_HASH="${record}"`,`PRIVACY_SALT=${secret}`,`SITE_ORIGINS=http://127.0.0.1:8789,http://localhost:8789,http://127.0.0.1:8790,http://127.0.0.1:4322`,''].join('\n'),{mode:0o600,flag:'wx'});
await writeFile(resolve(root,'.local/admin-credentials.json'),JSON.stringify({username:'local-admin',password}),{mode:0o600});
await writeFile(resolve(root,'.local/admin-access.txt'),`Local KEEYAK admin only\nURL: http://127.0.0.1:8789/admin/\nUsername: local-admin\nPassword: ${password}\n\nDo not upload this file or .dev.vars. Production uses Cloudflare Access instead.\n`,{mode:0o600});
console.log('Local secrets generated. Credentials are in .local/admin-access.txt; no cloud resources were changed.');
