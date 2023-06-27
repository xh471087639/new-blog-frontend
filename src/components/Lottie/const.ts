import { hexToFloatArray, rgbaToFloatArray, rgbToFloatArray } from "@/utils/color";
import { traverseToBasicTypes } from "@/utils/default";

export enum ELottieType {
    loading,
}

export const LOTTIE_MAP = {
    [ELottieType.loading]: './json/loading.json',
}

export const changeLottieColor = (animationData: any, color: string) => {
    let resColor = [0, 0, 0, 0];
    switch (true) {
        case color.includes('#'):
            resColor = hexToFloatArray(color);
            break;
        case color.includes('rgb'):
            resColor = rgbToFloatArray(color);
            break;
        case color.includes('rgba'):
            resColor = rgbaToFloatArray(color);
            break;
    }
    if (animationData.layers?.length) {
        const newData = traverseToBasicTypes('animation', animationData.layers, (key, val) => {
            if (key === 'k' && val?.length === 4) {
                return resColor;
            }
            return val;
        });
        animationData.layers = newData;
    }
    return animationData;
}
