import path from 'path';

const currentDir = __dirname;
const rootDir = path.join(currentDir, '..', '..');

export const publicPath = path.join(rootDir, 'public');
export const paths = {
    root: rootDir,
    public: publicPath
};
