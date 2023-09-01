'use strict';

const fractal = module.exports = require('@frctl/fractal').create();
fractal.set('project.title', 'Styleguide');
fractal.set('project.version', 'v1.0');
fractal.set('project.author', 'Manabu Yasuda');
fractal.components.engine('@rsm/fractal-pug-adapter');
fractal.components.set('ext', '.pug');
fractal.components.set('path', __dirname + '/styleguide/components');
fractal.docs.set('path', __dirname + '/styleguide/docs');
fractal.web.set('static.path', __dirname + '/htdocs');
fractal.web.set('builder.dest', __dirname + '/htdocs/styleguide');
fractal.web.set('server.sync', true);
fractal.web.set('server.watch', true);
fractal.web.set('server.syncOptions', {
  open: true,
  notify: true,
});

const mandelbrot = require('@frctl/mandelbrot');
// https://fractal.build/guide/web/default-theme.html
const myCustomisedTheme = mandelbrot({
  // https://fractal.build/guide/web/default-theme.html#nav
  nav: ['search', 'components', 'docs'],
  panels: ['view', 'notes', 'html', 'context', 'resources'],
  // https://fractal.build/guide/web/default-theme.html#configuration
  labels : {
    panels: {
      view: 'Pug',
    },
  },
  // https://github.com/highlightjs/highlight.js/tree/main/src/styles
  // highlightStyles: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/github-dark-dimmed.min.css',
  lang: 'ja',
  // https://fractal.build/guide/web/default-theme.html#skin
  skin: 'olive',
  // https://fractal.build/guide/web/default-theme.html#styles
  styles: [
    'default',
    // スタイルガイドのドキュメント全体に読み込まれるCSS
    // TODO: `fractal start`ではパスが解決できず読み込めない
    '/themes/mandelbrot/css/styleguide.css'
  ]
});
fractal.web.theme(myCustomisedTheme);
