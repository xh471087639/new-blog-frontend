export interface IAppItemInfo {
    title: string;
    path: string;
    active?: boolean;
    bgColor: string;
    activeColor: string;
}

export const APP_LIST_INFO: IAppItemInfo[] = [{
    title: '文档',
    path: 'home',
    bgColor: 'rgba(15,17,21)',
    activeColor: '#84a7d2'
}, {
    title: 'chat-gpt',
    path: 'chat-gpt',
    bgColor: 'rgba(37,39,46)',
    activeColor: '#FFB74D'
}, {
    title: '家庭设备',
    path: 'home-device',
    bgColor: 'rgba(31,32,49)',
    activeColor: '#E3F2FD'
},]
