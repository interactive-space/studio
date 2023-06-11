import { writeFileSync } from 'fs';
import { join } from 'path';
import type { RushProject } from './types';

const repoRootPath = join(__dirname, '../../../');
const changes: RushProject[] = require('./temp-changes.json');

const versions = changes.map(({ packageName, projectFolder }) => {
  const packageJSONPath = join(repoRootPath, projectFolder, './package.json');
  const packageJSON = require(packageJSONPath);

  return { packageName, projectFolder, version: packageJSON.version };
});

console.log('versions', '\n', JSON.stringify(versions, null, 2));

writeFileSync(join(__dirname, './temp-versions.json'), JSON.stringify(versions));
