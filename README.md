# Wikipedia-Search-and-Analysis-Tool

## Software Engineer Fullstack Assignment Challenge Requirements:

1. Backend Integration and State Management:
- Q. Develop a simple Node.js server to manage Wikipedia API
interactions from multiple users while keeping performance in
mind.
- A . Configure a simple [Express](https://expressjs.com/) TypeScript server with and I will use a [Remix](https://remix.run/) template with [Vite](https://vite.dev/guide/why) for fast local development.

- [Remix Express ts set up](https://dev.to/mihaiandrei97/remix-express-ts-1614)
- [Remix tutorial](https://remix.run/docs/en/main/start/tutorial)

time = .3h

2. Search Results and Relevance:
- Q. Display search results.
- Q. Employ virtualized lists for improved performance.
- Q. Keep track of search history.
- A . get familiar with [wikipedia api](https://www.mediawiki.org/wiki/API:Main_page) how the data generated using the
wiki [ApiSandbox](https://en.wikipedia.org/wiki/Special:ApiSandbox#action=jsondata&format=json&title=&formatversion=2)
time = 3h
3.5
3. UI/UX Design:
- Q. Create a user interface to display the results using visual
feedback during data fetching. Apply input debouncing to
reduce search latency.
- A . Remix
2.5
6 hours

4. Testing and Optimization:
- Write critical tests for primary logic around state, components,
etc.
- A . Jest

5. Documentation and Security:
- Compile a README.md outlining setup procedures and
architectural choices.

2h
total 8 hours



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

- [Remix data loading](https://remix.run/docs/en/main/guides/data-loading)
- [Vercel Remix](https://vercel.com/docs/frameworks/remix)
- [Remix utils](https://remix.run/resources/remix-utils)
- [testing](https://app.studyraid.com/en/read/5717/124616/testing-your-remix-application)
