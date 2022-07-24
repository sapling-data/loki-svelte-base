// eslint-disable-next-line import/extensions
import lokiConfig from '../../loki.config.mjs';

const injectLokiFreemarkerPlugin = () => ({
  name: 'inject-loki-freemarker',
  enforce: 'pre',
  apply: 'build',
  transformIndexHtml(html, ctx) {
    const pageUrn = `urn:com:${lokiConfig.appRoot}:${lokiConfig.appModelName}:app:pages:${lokiConfig.pageName}`;
    const lokiFreemarkerExpressions = [
      'urn:com:loki:js:app:pages:lokiJs',
      'urn:com:loki:jquery:app:pages:lokiJQuery',
    ];
    const scriptTag = {
      tag: 'script',
      injectTo: 'head',
      attrs: {
        type: 'text/javascript',
      },
    };
    const jQueryTag = {
      ...scriptTag,
      ...{
        attrs: {
          // eslint-disable-next-line no-template-curly-in-string
          src: "${loki.web.modelResUrl('urn:opensource:libs:jquery:3.2.1!jquery-3.2.1.min.js')}",
        },
      },
    };
    const lokiSessionTag = {
      tag: 'script',
      injectTo: 'body',
      attrs: {
        type: 'text/javascript',
        src: `\${loki.web.pageUrlWithCacheCheck('urn:com:loki:js:app:pages:lokiSession')}`,
        defer: true,
        async: true,
      },
    };
    const lokiTags = lokiFreemarkerExpressions.map((expression) => ({
      ...scriptTag,
      ...{
        attrs: {
          src: `\${loki.web.pageUrlWithCacheCheck('${expression}')}`,
        },
      },
    }));
    let bundleTags = Object.values(ctx.bundle).map((item) => ({
      empty: (item.code === '\n'),
      tag: item.type === 'asset' ? 'link' : 'script',
      injectTo: 'body',
      attrs: {
        ...(item.type === 'asset' && {
          rel: 'stylesheet',
          href: `\${loki.web.resourceUrl('${pageUrn}!${item.fileName}')}`,
          defer: true,
          async: true,
        }),
        ...(item.type === 'chunk' && {
          type: 'module',
          src: `\${loki.web.resourceUrl('${pageUrn}!${item.fileName}')}`,
          defer: true,
          async: true,
        }),
      },
    }));
    const headTags = [{
      tag: 'link',
      injectTo: 'prepend-head',
      attrs: {
        href: `\${loki.web.resourceUrl('${pageUrn}!favicon.ico')}`,
        rel: 'icon',
      },
    },
    {
      tag: 'title',
      children: lokiConfig.pageTitle,
    }];
    // Removes empty chunk rendered  by html entry point to
    // prevent extraneous tag in production html
    bundleTags = bundleTags.filter((tag) => !tag.empty);
    return {
      tags: [...bundleTags, ...lokiTags, lokiSessionTag, jQueryTag, ...headTags],
    };
  },
});

export default injectLokiFreemarkerPlugin;
