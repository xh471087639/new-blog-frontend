// 引入
export const requireFile = (path: string, root: string) => new URL(path, root).href;
