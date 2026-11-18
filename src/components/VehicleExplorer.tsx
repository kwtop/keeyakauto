import {useEffect, useId, useMemo, useRef, useState} from 'react';
import {ArrowRight, CalendarDays, ChevronDown, CircleHelp, Fuel, Gauge, LayoutGrid, Leaf, PlugZap, Search, SlidersHorizontal, UsersRound, X, Zap, type LucideProps} from 'lucide-react';
import {vehicleHref} from '../data/catalogPaths';
import type {CatalogCardData} from '../data/catalogCardData';
import {vehicleCardFraming} from '../data/vehicleCardFraming';
import {vehicleSceneFraming} from '../data/catalogSceneFraming';
import {bodyGroupLabel, powertrainLabel} from '../data/catalogLabels';
import {catalogBrandAsset} from '../data/catalogBrandAssets';
import {newCarBrands} from '../data/catalogBrands';
import {vehicleCategories, vehicleCategory, vehicleCategoryLabel, type VehicleCategory} from '../data/vehicleCategories';
import {vehicleCategoryPaths, vehicleCategoryViewBox, vehicleCategoryWheels} from '../data/vehicleCategoryIcons';
import {blankCatalogFilters, catalogParameters, catalogRanges, hasCatalogFilters, matchesCatalog, readCatalogFilters, selectCatalogBrand, type CatalogFilters} from '../data/catalogFilters';
import {sortCatalogVehicles} from '../data/catalogSort';
import BrandPicker from './BrandPicker';
import CatalogBrandTabs from './CatalogBrandTabs';
import BrandLogo from './BrandLogo';
import '../styles/catalog-discovery.css';
import '../styles/catalog-showroom.css';
import '../styles/catalog-scene-framing.css';
import '../styles/used-catalog.css';
import '../styles/catalog-polish.css';

function CategoryIcon({category,size=23,strokeWidth=1.5,...props}:LucideProps & {category:VehicleCategory}) {
  return <svg data-vehicle-category={category} width={size} height={size} viewBox={vehicleCategoryViewBox} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" focusable="false" {...props}>{vehicleCategoryPaths[category].map(path=><path key={path} d={path}/>)}{vehicleCategoryWheels.map(wheel=><circle key={wheel.cx} {...wheel}/>)}</svg>;
}

function rangeOptions({anyLabel, options}: ReturnType<typeof catalogRanges>[number]) {
  return <><option value="">{anyLabel}</option>{options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</>;
}

export default function VehicleExplorer({items, initialPage = 1, basePath = '', pageSize = 12, fixedBrand}: {
  items: CatalogCardData[]; initialPage?: number; basePath?: string; pageSize?: number; fixedBrand?: string;
}) {
  const kind = items[0]?.kind || 'new';
  const [filters, setFilters] = useState<CatalogFilters>(() => blankCatalogFilters(kind));
  const [page, setPage] = useState(initialPage);
  const [ready, setReady] = useState(false);
  const [entering, setEntering] = useState(true);
  const [draft, setDraft] = useState<CatalogFilters>(() => blankCatalogFilters(kind));
  const dialog = useRef<HTMLDialogElement>(null);
  const filterButton = useRef<HTMLButtonElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const restoreScroll = useRef<number | null>(null);
  const id = useId();
  const ranges = catalogRanges(kind);
  const usedSortOptions = [{value: 'mileage', label: 'Lowest mileage'}, {value: 'featured', label: 'Newest first'}, {value: 'name', label: 'Name'}, {value: 'year', label: 'Model year'}];
  const resultNoun = (count:number) => kind==='new'?(count===1?'model':'models'):(count===1?'vehicle':'vehicles');
  const carBrands = useMemo(() => kind === 'new' ? [...newCarBrands] : [...new Map(items.map(vehicle => [vehicle.brandSlug, {name: vehicle.brand, slug: vehicle.brandSlug}])).values()], [items, kind]);
  const powers = useMemo(() => [...new Set(items.map(vehicle => vehicle.powertrain))].filter(power => power !== 'To confirm'), [items]);

  useEffect(() => {
    const timeout = window.setTimeout(() => setEntering(false), 560);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const read = () => {
      const next = readCatalogFilters(window.location.search, kind);
      if (fixedBrand) next.brands = [];
      const rawPage = new URLSearchParams(window.location.search).get('viewpage');
      const requestedPage = Number(rawPage);
      const nextPage = rawPage && Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : hasCatalogFilters(next, kind) ? 1 : initialPage;
      setFilters(next); setPage(nextPage); setReady(true);
      const parameters = catalogParameters(next, nextPage, initialPage, window.location.search, kind);
      const address = window.location.pathname + (parameters.size ? `?${parameters}` : '') + window.location.hash;
      window.history.replaceState(window.history.state, '', address);
      try {
        const saved = window.sessionStorage.getItem(`catalog-scroll:${window.location.pathname + (parameters.size ? `?${parameters}` : '')}`);
        restoreScroll.current = saved === null ? window.history.state?.catalogScroll ?? null : Number(saved);
      } catch { restoreScroll.current = null; }
    };
    read();
    window.addEventListener('popstate', read);
    return () => window.removeEventListener('popstate', read);
  }, [initialPage, fixedBrand, kind]);

  useEffect(() => {
    if (!ready || restoreScroll.current === null) return;
    const position = restoreScroll.current;
    restoreScroll.current = null;
    const frame = requestAnimationFrame(() => window.scrollTo({top: position, behavior: 'instant'}));
    return () => cancelAnimationFrame(frame);
  }, [ready, filters, page]);

  useEffect(() => {
    const media = window.matchMedia('(max-width:767px)');
    const closeOnDesktop = () => { if (!media.matches) dialog.current?.close(); };
    media.addEventListener('change', closeOnDesktop);
    return () => {media.removeEventListener('change', closeOnDesktop); document.documentElement.classList.remove('catalog-filters-open');};
  }, []);

  function commit(next: CatalogFilters, nextPage = 1, replace = false) {
    setEntering(false);
    setFilters(next); setPage(nextPage);
    const url = new URL(window.location.href);
    const parameters = catalogParameters(next, nextPage, initialPage, url.search, kind);
    const address = url.pathname + (parameters.size ? `?${parameters}` : '') + url.hash;
    if (address !== url.pathname + url.search + url.hash) {
      window.history.replaceState({...window.history.state, catalogScroll: window.scrollY}, '');
      window.history[replace ? 'replaceState' : 'pushState']({catalogScroll: window.scrollY}, '', address);
    }
  }
  function openFilters() {
    setEntering(false);
    setDraft({...filters, brands: [...filters.brands]});
    dialog.current?.showModal();
    document.documentElement.classList.add('catalog-filters-open');
  }
  function rememberScroll() {
    window.history.replaceState({...window.history.state, catalogScroll: window.scrollY}, '');
    try {window.sessionStorage.setItem(`catalog-scroll:${window.location.pathname + window.location.search}`, String(window.scrollY));} catch { /* Returning still restores filter parameters when storage is blocked. */ }
  }
  const filtered = useMemo(() => {
    const result = items.filter(vehicle => matchesCatalog(vehicle, filters));
    return sortCatalogVehicles(result, filters.sort, kind);
  }, [items, filters, kind]);
  const brandChoices = (state: CatalogFilters) => carBrands.map(brand => ({...brand, count: items.filter(vehicle => vehicle.brandSlug === brand.slug && matchesCatalog(vehicle, {...state, brands: []})).length}));
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const activePage = Math.min(page, totalPages);
  const shown = filtered.slice((activePage - 1) * pageSize, activePage * pageSize);
  const hasFilters = hasCatalogFilters(filters, kind);
  const resultParams = catalogParameters(filters, activePage, initialPage, '', kind);
  const returnPath = ready ? window.location.pathname + (resultParams.size ? `?${resultParams}` : '') : '';
  const detailLink = (vehicle: CatalogCardData) => vehicleHref(vehicle) + (returnPath ? `?from=${encodeURIComponent(returnPath)}` : '');
  const routeFor = (n: number) => basePath ? n === 1 ? basePath : `${basePath}page/${n}/` : undefined;
  const brandName = (slug: string) => carBrands.find(brand => brand.slug === slug)?.name || slug;
  const quoteParams = new URLSearchParams({kind});
  (fixedBrand ? [fixedBrand] : filters.brands).forEach(brand => quoteParams.append('brand', brandName(brand)));
  if (filters.category) quoteParams.set('category', filters.category);
  if (filters.power) quoteParams.set('powertrain', filters.power);
  if (returnPath) quoteParams.set('source', returnPath);
  const quoteHref = `/quote/?${quoteParams}`;
  const activeRanges = ranges.filter(({key}) => filters[key]);
  const mobileFilterCount = filters.brands.length + Number(!!filters.power) + activeRanges.length;

  return <div className="explorer catalog-discovery catalog-showroom-explorer" id="vehicle-results" aria-busy={!ready} data-entering={entering} onFocusCapture={() => setEntering(false)}>
    <div className="catalog-filter-panel" role="group" aria-label="Find vehicles">
      {!fixedBrand && <CatalogBrandTabs brands={brandChoices(filters)} selected={filters.brands} onSelect={brand => commit(selectCatalogBrand(filters, brand))} onClear={() => commit({...filters, brands: []})}/>}
      <div className="catalog-category-row" role="group" aria-label="Vehicle category">
        <button type="button" aria-pressed={!filters.category} onClick={() => commit({...filters, category: ''})}><LayoutGrid size={22} strokeWidth={1.5} aria-hidden="true"/>All</button>
        {vehicleCategories.map(category => <button type="button" key={category} aria-pressed={filters.category === category} onClick={() => commit({...filters, category})}><CategoryIcon category={category} size={23} strokeWidth={1.5} aria-hidden="true"/>{vehicleCategoryLabel(category)}</button>)}
      </div>
      <div className={kind === 'used' ? 'catalog-tools catalog-tools--used' : 'catalog-tools'} data-functional-region="filter">
        <label className="catalog-model-search"><Search size={20} strokeWidth={1.7} aria-hidden="true"/><input ref={searchInput} aria-label="Search models" value={filters.q} onChange={event => commit({...filters, q: event.target.value}, 1, true)} type="search" placeholder="Search cars"/></label>
        {kind === 'new' && <label className="catalog-power"><span>Powertrain</span><select aria-label="Powertrain" value={filters.power} onChange={event => commit({...filters, power: event.target.value})}><option value="">All powertrains</option>{powers.map(power => <option key={power} value={power}>{powertrainLabel(power)}</option>)}</select><ChevronDown className="catalog-select-chevron" size={18} strokeWidth={1.7} aria-hidden="true"/></label>}
        {ranges.map(range => <label className="catalog-power" key={range.key}>
          <span>{range.label}</span>
          <select aria-label={range.label} value={filters[range.key]} onChange={event => commit({...filters, [range.key]: event.target.value})}>{rangeOptions(range)}</select>
          <ChevronDown className="catalog-select-chevron" size={18} strokeWidth={1.7} aria-hidden="true"/>
        </label>)}
        {kind === 'used' && <label className="catalog-sort"><span>Sort by</span><select aria-label="Sort" value={filters.sort} onChange={event => commit({...filters, sort: event.target.value})}>{usedSortOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select><ChevronDown className="catalog-select-chevron" size={18} strokeWidth={1.7} aria-hidden="true"/></label>}
        <button ref={filterButton} className="catalog-mobile-filters" type="button" onClick={openFilters}><SlidersHorizontal size={18} aria-hidden="true"/>Filters{mobileFilterCount > 0 && <span>{mobileFilterCount}</span>}</button>
      </div>
    </div>
    <div className="catalog-result-bar">
      <span className="catalog-result-status" role="status" aria-live="polite">{ready && `${filtered.length} ${resultNoun(filtered.length)}`}</span>
      {hasFilters && <button type="button" className="catalog-reset" onClick={() => {
        commit(blankCatalogFilters(kind));
        searchInput.current?.focus({preventScroll: true});
      }}>Reset filters</button>}
      {(filters.power || activeRanges.length > 0) && <div className="catalog-mobile-selections" role="group" aria-label="Active filters">
        {filters.power && <button type="button" onClick={() => {commit({...filters, power: ''}); filterButton.current?.focus({preventScroll: true});}} aria-label="Remove powertrain filter">{powertrainLabel(filters.power)}<X size={14} aria-hidden="true"/></button>}
        {activeRanges.map(({key, label, options}) => <button type="button" key={key} onClick={() => {commit({...filters, [key]: ''}); filterButton.current?.focus({preventScroll: true});}} aria-label={`Remove ${label.toLowerCase()} filter`}>{options.find(option => option.value === filters[key])?.label}<X size={14} aria-hidden="true"/></button>)}
      </div>}
    </div>
    {shown.length ? <><div data-functional-region="results" className={'vehicle-grid' + (items.length === 1 ? ' vehicle-grid--single' : items.length === 2 ? ' vehicle-grid--small' : '')}>
      {shown.map((vehicle, index) => {
        const photo = vehicle.photo;
        const priorityPhoto = index === 0 && basePath === '/new-cars/' && !fixedBrand && initialPage === 1 && activePage === 1 && !hasFilters;
        const cardName = vehicle.usedRecord && !catalogBrandAsset(vehicle.brandSlug) ? vehicle.name : vehicle.modelName || vehicle.name.replace(vehicle.brand + ' ', '');
        const modelYear = vehicle.year !== 'To confirm' ? `${vehicle.year} model` : undefined;
        const framing = vehicle.kind === 'new' ? vehicleCardFraming(photo.src) : undefined;
        const sceneFraming = vehicle.kind === 'new' ? vehicleSceneFraming(photo.src) : undefined;
        const category = vehicleCategory(vehicle);
        const PowerIcon = vehicle.powertrain === 'Pure Electric' ? Zap : ['PHEV', 'EREV'].includes(vehicle.powertrain) ? PlugZap : vehicle.powertrain === 'Hybrid' ? Leaf : Fuel;
        const CardPowerIcon = vehicle.powertrain === 'To confirm' ? CircleHelp : PowerIcon;
        const inquiryParams = new URLSearchParams({model: vehicle.name, kind: vehicle.kind, brand: vehicle.brand, category, source: vehicleHref(vehicle)});
        if(vehicle.usedRecord){inquiryParams.set('variant',vehicle.usedRecord.reference);inquiryParams.set('trim',vehicle.usedRecord.trim);}
        if (vehicle.year !== 'To confirm') inquiryParams.set('year', vehicle.year);
        if (vehicle.powertrain !== 'To confirm') inquiryParams.set('powertrain', vehicle.powertrain);
        return <article className="vehicle-card" data-kind={vehicle.kind} data-supplied={Boolean(vehicle.usedRecord)} key={vehicle.kind + vehicle.brandSlug + vehicle.slug}>
          <a className={'vehicle-media' + (photo.srcSet ? ' vehicle-media--editorial' : '') + (framing ? ' vehicle-media--balanced' : '') + (sceneFraming ? ' vehicle-media--scene-framed' : '')} href={detailLink(vehicle)} tabIndex={-1} aria-hidden="true" onClick={rememberScroll}>
            <img {...photo} style={sceneFraming || framing || (vehicle.usedRecord&&!photo['data-ai-showroom']?{objectPosition:vehicle.imagePosition}:undefined)} sizes="(min-width:1280px) 400px, (min-width:768px) 32vw, 100vw" alt="" width={1400} height={1050} loading={priorityPhoto ? 'eager' : 'lazy'} fetchPriority={priorityPhoto ? 'high' : undefined}/>
          </a>
          <div className="vehicle-copy">
            <div className="vehicle-card-heading">
              <div className="vehicle-card-identity">
                <BrandLogo slug={vehicle.brandSlug} name={vehicle.brand} className="vehicle-card-brand-logo"/>
                <div className="vehicle-card-name">
                  <h3><a href={detailLink(vehicle)} onClick={rememberScroll} aria-label={vehicle.name + ' details'}>{cardName}</a></h3>
                  {vehicle.photoVersionNote&&<p className="vehicle-card-photo-note">{vehicle.photoVersionNote}</p>}
                </div>
              </div>
              {modelYear && <span className="vehicle-card-year">{modelYear}</span>}
            </div>
            {vehicle.kind === 'used' ? <dl className="vehicle-card-record">
              <div>
                <dt>Mileage</dt>
                <dd><Gauge aria-hidden="true"/><span>{vehicle.usedRecord ? `${vehicle.usedRecord.mileageKm.toLocaleString('en-US')} km` : <><span aria-hidden="true">Mileage </span>unknown</>}</span></dd>
              </div>
              <div>
                <dt>Registration date</dt>
                <dd><CalendarDays aria-hidden="true"/><span>{vehicle.usedRecord?.registrationMonth ? <><span aria-hidden="true">Registered </span>{vehicle.usedRecord.registrationMonth}</> : <><span aria-hidden="true">Registration </span>unknown</>}</span></dd>
              </div>
              <div>
                <dt>Body type</dt>
                <dd><CategoryIcon category={category || 'Sedan'} aria-hidden="true"/><span>{bodyGroupLabel(vehicle.body, vehicle.kind)}</span></dd>
              </div>
              <div>
                <dt>Powertrain</dt>
                <dd><PowerIcon aria-hidden="true"/><span>{powertrainLabel(vehicle.powertrain)}</span></dd>
              </div>
            </dl> : <div className="vehicle-card-specs">
              <p><CategoryIcon category={category || 'Sedan'} size={17} strokeWidth={1.6} aria-hidden="true"/>{bodyGroupLabel(vehicle.body)}</p>
              <p><CardPowerIcon size={17} strokeWidth={1.6} aria-hidden="true"/>{powertrainLabel(vehicle.powertrain)}</p>
              {vehicle.seats ? <p title={`${vehicle.seats} seats`}>
                <UsersRound size={17} strokeWidth={1.6} aria-hidden="true"/>
                <span>{vehicle.seats}<span className="vehicle-card-spec-caption"> seats</span></span>
              </p> : null}
            </div>}
            {items.length === 1 && <div className="single-model-intro">{!vehicle.usedRecord&&(vehicle.defaultVariantName ?? vehicle.variants?.[0]?.name) && <p>{vehicle.defaultVariantName ?? vehicle.variants?.[0]?.name}</p>}<p>{vehicle.kind === 'new' ? 'View the specifications and check the configuration for your destination.' : vehicle.usedRecord?'Review the supplied vehicle details and ask for current availability.':'Use this past listing to describe the car you want us to find.'}</p></div>}
            <div className="vehicle-card-actions">
              <a className="vehicle-card-inquiry" href={`/quote/?${inquiryParams}`} onClick={rememberScroll} aria-label={`Start an inquiry for ${vehicle.name}`}>Start an inquiry<ArrowRight size={19} strokeWidth={1.7} aria-hidden="true"/></a>
            </div>
          </div>
        </article>;
      })}
    </div>{totalPages > 1 && <nav className="pagination" aria-label="Catalog pages">{Array.from({length: totalPages}, (_, index) => index + 1).map(n => routeFor(n) && !hasFilters ? <a key={n} href={routeFor(n)} aria-current={n === activePage ? 'page' : undefined}>{n}</a> : <button key={n} type="button" aria-current={n === activePage ? 'page' : undefined} onClick={() => {commit(filters, n); document.getElementById('vehicle-results')?.scrollIntoView({block: 'start'});}}>{n}</button>)}</nav>}</> : <div className="empty-state catalog-empty" data-functional-region="results"><h3>{filters.category ? `Looking for ${filters.category === 'Pickup' ? 'a pickup' : vehicleCategoryLabel(filters.category) + ' models'}?` : 'No matching models'}</h3><p>Tell us your preferred brands, configuration and destination.</p><div><a className="button" href={quoteHref}>{filters.category ? 'Start a sourcing inquiry' : 'Request a model'}</a><button type="button" className="catalog-clear" onClick={() => commit(blankCatalogFilters(kind))}>Clear all filters</button></div></div>}
    <dialog ref={dialog} className="catalog-filter-dialog" aria-labelledby={`${id}-filter-title`} onClick={event => {if (event.target === dialog.current) dialog.current.close();}} onClose={() => {document.documentElement.classList.remove('catalog-filters-open');}}>
      <div className="catalog-dialog-content"><header><h2 id={`${id}-filter-title`}>Filters</h2><button type="button" onClick={() => dialog.current?.close()} aria-label="Close filters"><X size={24}/></button></header>
        <div className="catalog-dialog-body">
          <div className="catalog-dialog-controls">
          {kind === 'new' && <label className="catalog-dialog-power">Powertrain<select value={draft.power} onChange={event => setDraft(current => ({...current, power: event.target.value}))}><option value="">All powertrains</option>{powers.map(power => <option key={power} value={power}>{powertrainLabel(power)}</option>)}</select></label>}
          {ranges.map(range => <label className="catalog-dialog-power" key={range.key}>
            {range.label}<select value={draft[range.key]} onChange={event => setDraft(current => ({...current, [range.key]: event.target.value}))}>{rangeOptions(range)}</select>
          </label>)}
          {kind === 'used' && <label className="catalog-dialog-power">Sort<select value={draft.sort} onChange={event => setDraft(current => ({...current, sort: event.target.value}))}>{usedSortOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>}
          </div>
          {!fixedBrand && <BrandPicker full brands={brandChoices(draft)} selected={draft.brands} onSelect={brand => setDraft(current => selectCatalogBrand(current, brand))}/>}
        </div>
        <footer><button type="button" className="catalog-clear" onClick={() => setDraft({...blankCatalogFilters(kind), q: filters.q, category: filters.category})}>Reset filters</button><button type="button" className="button" onClick={() => {commit(draft); dialog.current?.close();}}>Show results</button></footer>
      </div>
    </dialog>
  </div>;
}
