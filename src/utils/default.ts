export type TtraverseParamsObj = any;
export type TtraverseParamsHandleFn = (key: string, val: any) => any;

export function traverseToBasicTypes(objName: string, obj: TtraverseParamsObj, handleFn: TtraverseParamsHandleFn) {
    if (typeof obj === 'object' && obj !== null) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                obj[key] = traverseToBasicTypes(key, obj[key], handleFn);
            }
        }
    } else if (Array.isArray(obj)) {
        obj = (obj as any[]).map((item,index) => traverseToBasicTypes(index.toString(), item, handleFn));
    }
    return handleFn(objName, obj);
}
