# data-template

Lightweight and minimal dom template helpers

[![npm Package Version](https://img.shields.io/npm/v/data-template)](https://www.npmjs.com/package/data-template)

## Features

- [x] apply data into dom based on dataset (`data-*`) attributes
- [x] fetch and cache html template and api response with localStorage
- [x] lightweight, [<1KB minified and gzipped](#size)

**Supported `data-*` attributes**:

text, disabled, readonly, open, hidden, show, value, checked, class, href, src, alt, title, onclick

## Quick Example with CDN

```html
<script
  src="https://cdn.jsdelivr.net/npm/data-template@1.1.0/base.js"
  crossorigin="anonymous"
  integrity="sha384-ICpwtTEx/skf667ZbuQqfNng7NYiTS/jrv7dPZS8uO9DJ6td5od5+qpLAM3C4x3c"
></script>

<header id="header" data-template="header.html"></header>

<main id="main" data-template="article" data-bind="articles">
  loading articles...
</main>

<template data-name="article">
  <article>
    <h2 data-text="title"></h2>
    <p data-text="intro"></p>
    <a data-href="detail" data-class="highlight">Details</a>
  </article>
</template>

<script>
  renderTemplate(header)

  /* sample data:
  [
    { title: '...', intro: '...', detail: '/article.html?id=1', highlight: false },
    { title: '...', intro: '...', detail: '/article.html?id=2', highlight: true },
  ]
  */
  getJSON('/articles').then(articles => renderTemplate(main, { articles }))
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
| base.js        | 3.3 KB    |
| base.min.js    | 1.6 KB    |
| base.min.js.gz | 908 B     |

## Get Started (with CDN)

Drop below line in your html:

```html
<script
  src="https://cdn.jsdelivr.net/npm/data-template@1.1.0/base.js"
  crossorigin="anonymous"
  integrity="sha384-ICpwtTEx/skf667ZbuQqfNng7NYiTS/jrv7dPZS8uO9DJ6td5od5+qpLAM3C4x3c"
></script>
```

Or use the minified version:

```html
<script
  src="https://cdn.jsdelivr.net/npm/data-template@1.1.0/base.min.js"
  crossorigin="anonymous"
  integrity="sha384-krlHsSc5ddKlMGvhLenvp6GdNP1Y1zBdS5ruE9t1g4SHkR1+KCM4iQD7NATP9xqf"
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
