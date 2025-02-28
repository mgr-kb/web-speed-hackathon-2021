import { AudioContext } from 'web-audio-api';

/**
 * @param {ArrayBuffer} soundData
 * @returns {Promise<{ max: number, peaks: number[] }}
 */
async function calculate(soundData) {
  const audioCtx = new AudioContext();

  // 音声をデコードする
  /** @type {AudioBuffer} */
  const buffer = await new Promise((resolve, reject) => {
    audioCtx.decodeAudioData(soundData.slice(0), resolve, reject);
  });

  // 左の音声データの絶対値を取る
  const leftData = buffer.getChannelData(0).map(x => Math.abs(x));
  // 右の音声データの絶対値を取る
  const rightData = buffer.getChannelData(1).map(x => Math.abs(x));

  // 左右の音声データの平均を取る
  const normalized = leftData.map((data, idx) => {
    return (data + rightData[idx] || 0) / 2;
  })

  // 100 個の chunk に分ける
  const chunk = (arr, chunkSize = 1) => {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }
  const chunks = chunk(normalized, Math.ceil(normalized.length / 100));
  // chunk ごとに平均を取る
  const peaks = chunks.map(chunk => chunk.reduce((pre, cur) => pre + cur) / chunk.length);
  // chunk の平均の中から最大値を取る
  const max = peaks.reduce((a, b) => Math.max(a, b));

  return { max, peaks };
}

export { calculate };