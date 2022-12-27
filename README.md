# data-template

Lightweight and minimal dom template helpers

[![npm Package Version](https://img.shields.io/npm/v/data-template)](https://www.npmjs.com/package/data-template)

## Features

- [x] apply data into dom based on dataset (`data-*`) attributes
- [x] auto repeat elements if the value is an array
- [x] fetch and cache html template and api response with localStorage
- [x] lightweight, [1KB minified and gzipped](#size)

**Supported `data-*` attributes**:

text, disabled, readonly, open, hidden, show, value, checked, class, id, href, src, alt, title, onclick

## Quick Example with CDN

(For script tag with exact version and integrity checksum, see [below section](#get-started-with-cdn))

```html
<script src="https://cdn.jsdelivr.net/npm/data-template@1.4/base.js"></script>

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
function getText(url, options, callback);

// return promise of json value, cached with localStorage
function getJSON(url, options, callback);

// submit form with ajax request in application/json
function submitJSON(event_or_form): Promise<Response>

// submit form with ajax request in application/x-www-form-urlencoded
function submitForm(event_or_form): Promise<Response>

// submit form with ajax request in multipart/form-data
function uploadForm(event_or_form): Promise<Response>

// send ajax request in application/json
function postJSON(url, body): Promise<Response>
function patchJSON(url, body): Promise<Response>
function putJSON(url, body): Promise<Response>
```

For the `getText()` and `getJSON()` functions, the `options` and `cb` arguments are optional.

The `options` object is the second argument passed to the `fetch` function.

The `callback` function will be called with cached _and/or_ fetched data [(details)](#when-will-the-callback-function-be-called).

If is recommended to provide `{ cache: 'reload' }` in the `options` or use callback function to receive the data if you want to avoid staled view.

The returned promise can be used to do error handling.

### When will the callback function be called

If the fetching data is already cached by url, the callback will be called immediately.
Then the data will be fetched no matter cached or not.
If the newly fetched data is different from the cached data, the callback will be called again.

## Size

| Format         | File Size |
| -------------- | --------- |
| base.js        | 4.7 KB    |
| base.min.js    | 2.3 KB    |
| base.min.js.gz | 1.2 KB    |

## Get Started (with CDN)

Drop below line in your html:

```html
<script
  src="https://cdn.jsdelivr.net/npm/data-template@1.5.0/base.js"
  crossorigin="anonymous"
  integrity="sha384-WzWqGULLEfZOWsR8olKuhg2s6Q2hMKb1vP5rkCFCn15rlCO477nPv4a/yGI/dUsv"
></script>
```

Or use the minified version:

```html
<script
  src="https://cdn.jsdelivr.net/npm/data-template@1.5.0/base.min.js"
  crossorigin="anonymous"
  integrity="sha384-KlZgGfvJ9BfctZVzZGoZQStBDh4gI2QqEtvdoS7Xhdgskf7Xf7F8F/hh9TBKhU+M"
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
