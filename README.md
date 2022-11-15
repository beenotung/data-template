# data-template

Lightweight and minimal dom template helpers

[![npm Package Version](https://img.shields.io/npm/v/data-template)](https://www.npmjs.com/package/data-template)

## Features

- [x] apply data into dom based on dataset (`data-*`) attributes
- [x] auto repeat elements if the value is an array
- [x] fetch and cache html template and api response with localStorage
- [x] lightweight, [<1KB minified and gzipped](#size)

**Supported `data-*` attributes**:

text, disabled, readonly, open, hidden, show, value, checked, class, href, src, alt, title, onclick

## Quick Example with CDN

(For script tag with exact version and integrity checksum, see [below section](#get-started-with-cdn))

```html
<script src="https://cdn.jsdelivr.net/npm/data-template@1/base.js"></script>

<header id="header" data-template="header.html"></header>

<main id="main" data-template="article" data-bind="articles">
  loading articles...
</main>

<template data-name="article">
  <article>
    <h2 data-text="title"></h2>
    <ul class="tags">
      <li class="tag" data-text="tags"></li>
    </ul>
    <p data-text="intro"></p>
    <a data-href="detail" data-class="highlight">Details</a>
  </article>
</template>

<script>
  renderTemplate(header)

  getJSON('/articles').then(articles => renderTemplate(main, { articles }))
  /* sample data:
  [
    {
      title: '...',
      tags: ['a', 'b'],
      intro: '...',
      detail: '/article.html?id=1',
      highlight: false,
    },
    {
      title: '...',
      tags: [],
      intro: '...',
      detail: '/article.html?id=2',
      highlight: true,
    },
  ]
  */
</script>
```

More examples see [template/public](template/public)

## Functions

**Render Functions**:

```javascript
// render data-* attributes
function renderData(container, values);

// render template on specific host element
function renderTemplate(hostElement, binds);

// recursive scan for templates and render them
function scanTemplates(rootElement, binds);
```

**AJAX Functions**:

```javascript
// return promise of string, cached with localStorage
function getText(url, options);

// return promise of object, cached with localStorage
function getJSON(url, options);

// send ajax request in application/x-www-form-urlencoded, return promise of response
function submitForm(event_or_form);

// send ajax request in multipart/form-data, return promise of response
function uploadForm(event_or_form);
```

## Size

| Format         | File Size |
| -------------- | --------- |
| base.js        | 3.9 KB    |
| base.min.js    | 1.9 KB    |
| base.min.js.gz | 1001 B    |

## Get Started (with CDN)

Drop below line in your html:

```html
<script
  src="https://cdn.jsdelivr.net/npm/data-template@1.2.1/base.js"
  crossorigin="anonymous"
  integrity="sha384-pIpxsfeo8XmN5+qGeucupfP8UDgy2tQKnJQp+rfq3F1G2Jn3oNWjgkn/Iur/KgJJ"
></script>
```

Or use the minified version:

```html
<script
  src="https://cdn.jsdelivr.net/npm/data-template@1.2.1/base.min.js"
  crossorigin="anonymous"
  integrity="sha384-58Lesjm+5rLLdnxIfjjWCoznZ9IoY/6f6ZUFB/wDSKl1d6z45KXpD4hO7CVuTxU7"
></script>
```

## Get Started (with template project)

```bash
npx data-template my-app
cd my-app
# then see the guides in the console output and README.md file
```

## License

This project is licensed with [BSD-2-Clause](./LICENSE)

This is free, libre, and open-source software. It comes down to four essential freedoms [[ref]](https://seirdy.one/2021/01/27/whatsapp-and-the-domestication-of-users.html#fnref:2):

- The freedom to run the program as you wish, for any purpose
- The freedom to study how the program works, and change it so it does your computing as you wish
- The freedom to redistribute copies so you can help others
- The freedom to distribute copies of your modified versions to others
