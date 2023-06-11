import { readdirSync, readFileSync, statSync, writeFileSync } from 'fs';
import { join } from 'path';
import { parse } from 'json5';
import type { RushProject, RushRepoInfo } from './types';

const repoRootPath = join(__dirname, '../../../');

const rushJSONStr = readFileSync(join(repoRootPath, 'rush.json'), 'utf8');
const { projects } = parse<RushRepoInfo>(rushJSONStr);
const changes: RushProject[] = [];

function traverseDirectory(directoryPath: string) {
  const files = readdirSync(directoryPath);

  files.forEach((file: string) => {
    const filePath = join(directoryPath, file);
    const stats = statSync(filePath);
    if (stats.isDirectory()) {
      traverseDirectory(filePath);
    } else if (filePath.endsWith('.json')) {
      const { packageName } = require(filePath);
      const packageInfo = projects.find(project => project.packageName === packageName);
      if (packageInfo) {
        changes.push(packageInfo);
      }
    }
  });
}

traverseDirectory(join(repoRootPath, 'common/changes'));

console.log('changes', '\n', JSON.stringify(changes, null, 2));

writeFileSync(join(__dirname, './temp-changes.json'), JSON.stringify(changes));
writeFileSync(join(__dirname, './temp-changes-count.txt'), JSON.stringify(changes.length));
