import type {VehicleSpecification} from './catalog';

type ManufacturerReference = {
  label: string;
  url: string;
  checkedAt: string;
  variantName: string;
  variantId: string;
  applicability: string;
  specs: VehicleSpecification[];
};

const bz3xSource = 'https://www.gac-toyota.com.cn/minisite/Campaigns/bozhi3xTable?model=610max';

// A manufacturer comparison reference, kept separate from the supplied catalog
// version. The linked table does not state a model year; it cannot validate the
// workbook's year or an individual export offer.
export const manufacturerReferences: Record<string, ManufacturerReference> = {
  'toyota/bz3x': {
    label: 'GAC Toyota official specification table',
    url: bz3xSource,
    checkedAt: '2026-10-19',
    variantName: '610 Max',
    variantId: '2026-bfb41a1d46',
    applicability: 'Manufacturer reference for the 610 Max. The linked table does not state a model year. Match it to the exact year, package and vehicle in your offer.',
    specs: [
      {label:'Dimensions (L × W × H)',value:'4600 × 1850 × 1645',unit:'mm',source:bz3xSource,note:'The optional LiDAR package is listed as 4600 × 1875 × 1645 mm.'},
      {label:'Wheelbase',value:'2765',unit:'mm',source:bz3xSource},
      {label:'Battery type',value:'Lithium iron phosphate (LFP)',source:bz3xSource},
      {label:'Battery energy',value:'67.92',unit:'kWh',source:bz3xSource},
      {label:'Electric range',value:'610',unit:'km',testCycle:'CLTC',source:bz3xSource,note:'Manufacturer test-cycle reference; actual range varies with use and conditions.'},
      {label:'Maximum motor power',value:'165',unit:'kW',source:bz3xSource},
      {label:'Maximum motor torque',value:'210',unit:'N·m',source:bz3xSource},
    ],
  },
};
