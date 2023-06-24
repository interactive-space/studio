export type RushProject = {
  packageName: string;
  projectFolder: string;
}

export type RushRepoInfo = {
  projects: RushProject[]
}

export type ChangeDetail = {
  packageName: string;
  changes: {
    packageName: string;
    comment: string;
    type: 'none' | 'patch' | 'minor' | 'major';
  }[];
}
