import request, { IBaseRes } from "@/api/request";

export interface IBlogItem {
    id: string;
    title: string;
    view: number;
    tag: string[];
    desc: string;
}

export const getBlogListInfo = async (page: number) => {
    return request.post<IBaseRes<IBlogItem[]>>('/blog/list', {page})
}
