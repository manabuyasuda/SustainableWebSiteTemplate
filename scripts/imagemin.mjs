import imagemin from 'imagemin-keep-folder';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminGifsicle from 'imagemin-gifsicle';
import imageminSvgo from 'imagemin-svgo';
import imageminWebp from 'imagemin-webp';

/**
 * WebPの使用とフォールバックのモードを指定します。
 * - 'noWebp': WebPを使用せず、元の画像のみ出力
 * - 'useIfPossible': WebPを使用する、WebPに変換できない元画像は出力する
 * - 'fallback': WebPを使用する、元の画像も出力
 */
optimizeImages('useIfPossible');

/**
 * WebPに変換可能な画像を最適化します。
 */
async function optimizeWebpConvertibleImages() {
  await imagemin(['src/**/*.{jpg,jpeg,png}'], {
    use: [
      imageminMozjpeg({ quality: 85, progressive: true }),
      imageminPngquant({ quality: [0.85, 0.9] }),
    ],
    replaceOutputDir: output => output.replace(/src\//, 'htdocs/')
  });
}

/**
 * WebPに変換不可能な画像を最適化します。
 */
async function optimizeNonWebpImages() {
  await imagemin(['src/**/*.{gif,svg}', '!src/assets/svg/*.svg'], {
    use: [
      imageminSvgo(),
      imageminGifsicle(),
    ],
    replaceOutputDir: output => output.replace(/src\//, 'htdocs/')
  });
}

/**
 * WebP画像を生成します。
 */
async function generateWebpImages() {
  await imagemin(['src/**/*.{jpg,jpeg,png}'], {
    use: [
      imageminWebp({ quality: 70 }),
    ],
    replaceOutputDir: output => output.replace(/src\//, 'htdocs/')
  });
}

/**
 * 画像を最適化します。
 * @param {string} webpMode - WebPの出力モード ('noWebp', 'useIfPossible', 'fallback')
 */
async function optimizeImages(webpMode) {
  switch (webpMode) {
    case 'noWebp':
      await optimizeWebpConvertibleImages();
      await optimizeNonWebpImages();
      break;
    case 'useIfPossible':
      await generateWebpImages();
      await optimizeNonWebpImages();
      break;
    case 'fallback':
      await optimizeWebpConvertibleImages();
      await generateWebpImages();
      await optimizeNonWebpImages();
      break;
    default:
      throw new Error('Invalid webpMode');
  }
}
