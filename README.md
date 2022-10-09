# spa-lite

Lightweight and minimal dom helpers

## Features

- [x] apply data into dom based on dataset (`data-*`) attributes
- [x] fetch and cache html template and api response

**Supported `data-*` attributes**:

text, disabled, hidden, show, value, class, href, src, alt, title, onclick

## Functions

**Template Functions**:

```javascript
// render template on specific host element
function renderTemplate(hostElement, binds)

// recursive scan for templates and render them
function scanTemplates(rootElement, binds)
```

**Helper Functions**:

```javascript
// return promise of string, cached with localStorage
function getText(url,options)

// return promise of object, cached with localStorage
function getJSON(url,options)
```

## Get Started

For development mode:

1. Run `npm install` to install the dependencies
2. Run `npm run dev` to start the development server

For production deployment:

1. Run `npm run build` to compile the typescript project and minify the `base.js`
2. Run `npm start` to start the nodejs server

## Size

| Format         | File Size |
| -------------- | --------- |
| base.js        | 2.2 KB    |
| base.min.js    | 1.1 KB    |
| base.min.js.gz | 629 B     |
