// Owner-selected badge ranks are independent of the alphabetical display order.
export const popularBrandSlugs=['toyota','byd','changan','volkswagen','wuling','jetour','gwm'] as const;

export function brandPopularityRank(slug:string):number|undefined {
  const index=popularBrandSlugs.findIndex(brand=>brand===slug);
  return index<0?undefined:index+1;
}

export function brandPopularityDescription(slug:string):string|undefined {
  const rank=brandPopularityRank(slug);
  return rank?`Popular brand${rank<=3?`, selection number ${rank}`:''}`:undefined;
}

/** Popular entries lead the collapsed view; the complete view keeps every brand in A-Z order. */
export function catalogBrandChoices<T extends {slug:string;name:string}>(brands:readonly T[],selected:readonly string[],expanded:boolean):T[] {
  const alphabetical=(a:T,b:T)=>a.name.localeCompare(b.name,'en',{sensitivity:'base'});
  if(expanded)return [...brands].sort(alphabetical);
  return brands.filter(brand=>brandPopularityRank(brand.slug)||selected.includes(brand.slug)).sort((a,b)=>
    (brandPopularityRank(a.slug)??Number.MAX_SAFE_INTEGER)-(brandPopularityRank(b.slug)??Number.MAX_SAFE_INTEGER)||alphabetical(a,b)
  );
}

