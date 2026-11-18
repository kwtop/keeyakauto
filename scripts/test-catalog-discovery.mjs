import {build} from 'esbuild';
import {mkdtemp, rm, rmdir} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';

const folder = await mkdtemp(join(tmpdir(), 'keeyak-catalog-tests-'));
const output = join(folder, 'catalog-discovery.test.mjs');
try {
  await build({entryPoints: ['tests/catalog-discovery.test.mjs'], outfile: output, bundle: true, platform: 'node', format: 'esm', target: 'node22'});
  const result = spawnSync(process.execPath, ['--test', output], {stdio: 'inherit'});
  process.exitCode = result.status ?? 1;
} finally {
  await rm(output, {force: true});
  await rmdir(folder);
}
