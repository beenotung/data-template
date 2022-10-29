# my-app

Powered by [data-template](https://github.com/beenotung/data-template)

## Get Started

### Install dependencies

Run: `npm install`

Tips, you can also use below alternative installers:

- `pnpm i`
- `yarn install`
- `slnpm`

### Start development server

Run: `npm run dev`

You will see output like below:

```
listening on http://localhost:8100
listening on http://127.0.0.1:8100 (lo)
listening on http://192.168.1.2:8100 (wlp3s0)
```

Then you can open http://localhost:8100 with a browser

The port number may be changed by the `PORT` variable in the `.env` file

### Deploy production server

1. Run `npm run build` to compile the typescript project and minify the `base.js`
2. Run `npm start` to start the node.js server

If you have installed pm2, you can start the server with: `pm2 start --name my-app dist/main.js`

In the production mode, the server will enable compression (e.g. gzip) when the client supports it.

It will also use the minified `base.min.js` when requested `base.min`, so you don't have to change the `src` attribute in the `<script>` tags.

## Extra Tips

Checkout the `spdy` package, it supports http2 to reduce the network overhead when doing ajax.
However, it requires https cert to function practically. Hence, it is not included in the template for simplicity.

If you are new to https cert, checkout `mkcert` for local development, and `certbot` for production deployment.
