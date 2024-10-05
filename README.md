# Wikipedia-Search-and-Analysis-Tool

## Software Engineer Fullstack Assignment Challenge Requirements:

1. Backend Integration and State Management:
- Q. Develop a simple Node.js server to manage Wikipedia API
interactions from multiple users while keeping performance in
mind.
- A . Configure a simple [Express](https://expressjs.com/) TypeScript server with and I will use a [Remix](https://remix.run/) template with [Vite](https://vite.dev/guide/why) for fast local development.

- [Remix Express ts set up](https://dev.to/mihaiandrei97/remix-express-ts-1614)
- [Remix tutorial](https://remix.run/docs/en/main/start/tutorial)

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
