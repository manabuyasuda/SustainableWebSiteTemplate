const fs = require('fs');
const path = require('path');

/**
 * 指定されたディレクトリ内のJSONファイルをマージします。
 * @param {string} inputDir - JSONファイルが格納されているディレクトリのパス
 * @returns {Object} マージされたJSONデータ
 */
const getMergedData = (inputDir) => {
  return fs.readdirSync(inputDir).reduce((acc, file) => {
    if (path.extname(file) === '.json') {
      const key = path.basename(file, '.json');
      const data = require(path.join(inputDir, file));
      acc[key] = data;
    }
    return acc;
  }, {});
};

// 入力ディレクトリと出力ディレクトリの設定
const inputDir = path.join(__dirname, '../src/_data/json');
const outputDir = path.join(__dirname, '../src/_data');
const outputFile = path.join(outputDir, 'data.json');

// マージされたデータを取得
const mergedData = getMergedData(inputDir);

// マージされたデータをファイルに出力
fs.writeFileSync(outputFile, JSON.stringify(mergedData, null, 2));
