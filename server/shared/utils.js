/**
 * 
 * @authors chunhui.liu (https://github.com/Lch315)
 * @date    2017-06-28 22:27:48
 */

export const isFunc = arg => typeof arg === 'function';

export const isArray = arg => Object.prototype.toString.call(arg) === '[object Array]';
