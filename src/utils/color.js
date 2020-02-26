/**
 * 验证十六进制颜色值
 * @param color 需要验证值
 * @return {boolean} 是否验证成功
 */
export function isHex(color) {
  const pattern = /#([\da-f]{3}){1,2}/i;
  return pattern.test(color);
}

/**
 * 验证RGBA颜色值
 * @param color 需要验证值
 * @return {boolean|object} 验证失败返回false,成功返回rgba对象
 */
export function isRgba(color) {
  const pattern = /rgba\((.+),(.+),(.+),(.+)\)/i;
  const result = pattern.exec(color);
  if (!result) return false;
  return {
    r: Number(result[1]),
    g: Number(result[2]),
    b: Number(result[3]),
    a: Number(result[4]),
  };
}

/**
 * 颜色HEX转换为RGBA
 * @param {string} hex 十六进制颜色 #333或#333333
 * @param {number} opacity 透明度 0~100
 * @return {string|null} rgba格式颜色，失败返回null
 */
export function hexToRgba(hex, opacity) {
  // 验证hex格式是否正确
  if (!isHex(hex)) return null;

  // opacity无效或不存在直接返回hex
  if (opacity === undefined || opacity === null || opacity < 0 || opacity > 100) { return hex; }

  const rgba = [];
  let _hex = hex.substr(1); // 去除前缀#

  if (_hex.length === 3) {
    _hex = _hex.replace(/(.)/g, '$1$1'); // 处理"#abc" => "#aabbcc"
  }

  _hex.replace(/../g, (n) => {
    rgba.push(parseInt(n, 0x10)); // 按16进制将数字转换为数字
  });

  rgba.push((100 - opacity) / 100);

  return `rgba(${rgba.join(',')})`;
}

/**
 * 颜色RGBA转换为HEX
 * @param rgba rgba格式颜色
 * @return {object|null} 返回hex颜色和透明度对象，失败返回null
 */
export function rgbaToHex(rgba) {
  const match = isRgba(rgba);

  if (!match) return null;

  const { r, g, b, a } = match;
  const hex = `#${[r, g, b].map((n) => {
    const hexNumber = Number(n).toString(16);
    return hexNumber.length < 2 ? `0${hexNumber}` : hexNumber;
  }).join('')}`;
  const opacity = 100 - Number(a) * 100;

  return { hex, opacity };
}

/**
 * 颜色RGBA转换为HSL
 * @param rgba rgba格式颜色
 * @return {object|null} 返回hsla对象，失败返回null
 */
export function rgbaToHsl(rgba) {
  const match = isRgba(rgba);

  if (!match) return null;

  const { r, g, b, a } = match;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 255 / 2;
  let h = 0;
  let s = 0;

  if (max !== min) { // max等于min时h、s为0
    const d = max - min;
    s = l > 0.5 ? d / (255 * 2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        h = 0;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
    a,
  };
}
