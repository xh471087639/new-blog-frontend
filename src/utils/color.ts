// 将十六进制颜色转换为 0-1 浮点数数组
export function hexToFloatArray(hex: string) {
    // 移除 # 字符
    hex = hex.replace("#", "");

    // 判断颜色是否为缩写形式，如 #fff
    if (hex.length === 3) {
        hex = hex.replace(/(.)/g, "$1$1");
    }

    // 解析颜色的红、绿、蓝部分
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    return [r, g, b, 1];
}

// 将 RGB 颜色转换为 0-1 浮点数数组
export function rgbToFloatArray(rgb) {
    // 提取红、绿、蓝部分的数值
    const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) {
        throw new Error("Invalid RGB color format.");
    }

    const r = parseInt(match[1], 10) / 255;
    const g = parseInt(match[2], 10) / 255;
    const b = parseInt(match[3], 10) / 255;

    return [r, g, b, 1];
}

// 将 RGBA 颜色转换为 0-1 浮点数数组
export function rgbaToFloatArray(rgba) {
    // 提取红、绿、蓝、透明度部分的数值
    const match = rgba.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)$/);
    if (!match) {
        throw new Error("Invalid RGBA color format.");
    }

    const r = parseInt(match[1], 10) / 255;
    const g = parseInt(match[2], 10) / 255;
    const b = parseInt(match[3], 10) / 255;
    const a = parseFloat(match[4]);

    return [r, g, b, a];
}
