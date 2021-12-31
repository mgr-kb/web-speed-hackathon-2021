import { calculate } from '../utils/sounds_to_soundwave';

/**
 * @typedef {object} Props
 * @property {ArrayBuffer} buffer
 */

/**
 * @type {React.VFC<Props>}
 */
async function convertSound2Svg(soundData) {
  const { peaks, max } = await calculate(soundData);

  return `
    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 100 1">
      ${peaks.map((peak, idx) => {
        const ratio = peak / max;
        return `<rect key="${idx}" fill="#2563EB" height="${ratio}" width="1" x="${idx}" y="${1 - ratio}" />`;
      })}
    </svg>
  `;
};

export { convertSound2Svg };