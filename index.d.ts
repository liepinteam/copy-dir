import { PathLike } from 'fs';

type CopyDirFilter = (state: 'file' | 'directory' | 'symbolicLink', filePath: string, fileName: string) => boolean;

type CopyFileOptions = {
    /**
     * keep addTime or modifyTime if true
     */
    utimes?: boolean | {};
    /**
     * keep file mode if true
     */
    mode?: boolean | number;
    /**
     * cover if file exists
     */
    cover?: boolean;
    /**
     * file filter
     */
    filter?: CopyDirFilter;
};

declare function copydir(src: PathLike, dest: PathLike, callback: (err: NodeJS.ErrnoException | null) => void): void;
declare function copydir(src: PathLike, dest: PathLike, options: CopyFileOptions, callback: (err: NodeJS.ErrnoException | null) => void): void;

declare namespace copydir {
  function sync(src: PathLike, dest: PathLike, options?: CopyFileOptions): void;
}

export = copydir;