# data-template

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
function renderTemplate(hostElement, binds);

// recursive scan for templates and render them
function scanTemplates(rootElement, binds);
```

**Helper Functions**:

```javascript
// return promise of string, cached with localStorage
function getText(url, options);

// return promise of object, cached with localStorage
function getJSON(url, options);
```

## Size

| Format         | File Size |
| -------------- | --------- |
| base.js        | 2.2 KB    |
| base.min.js    | 1.1 KB    |
| base.min.js.gz | 623 B     |

## Get Started

```bash
npm init data-template my-app # or: npx create-data-template my-app
cd my-app
# then see the guides in the console output and README.md file
```
