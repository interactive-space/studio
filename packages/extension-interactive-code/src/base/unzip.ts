import * as JSZip from 'jszip';
import type { MemFS } from './memfs';

export class UnZip {
  private readonly zipUrl: string;

  constructor(zipUrl: string) {
    this.zipUrl = zipUrl;
  }

  async loadFileToWorkspace(memfs: MemFS): Promise<void> {
    const res = await fetch(this.zipUrl);
    const data = await res.arrayBuffer();
    const zip = await JSZip.loadAsync(data);

    const files: string[] = [];
    let fileRootPath: string;
    zip.forEach((path, file) => {
      if (typeof fileRootPath === 'undefined') {
        fileRootPath = file.dir ? path : '';
      }
      if (!file.dir) {
        files.push(path);
      }
    });

    fileRootPath = fileRootPath! || '';
    for (const filepath of files) {
      const content = await zip.file(filepath)?.async('uint8array');
      if (content) {
        const fileRelativePath = filepath.replace(new RegExp(`^${fileRootPath}`), '');
        const uri = memfs.getUriByRelativePath(`${fileRelativePath}?readonly=1`);
        memfs.writeFileRecursively(uri, content, { create: true, overwrite: true });
      }
    }
  }
};
