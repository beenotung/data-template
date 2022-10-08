# spa-lite

Lightweight and minimal dom helpers

## Features

- [x] apply data into dom based on dataset (`data-*`) attributes
- [x] fetch and cache html template

**Supported `data-*` attributes**:

text, disabled, hidden, value, class, href, src, alt, title, onclick

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
| base.js        | 2.1 KB    |
| base.min.js    | 951 B     |
| base.min.js.gz | 582 B     |
