import { useEffect, useState } from "react"
import { json } from "@remix-run/node"
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node"
import { useDebounceSubmit } from "remix-utils/use-debounce-submit"
import {
  Form,
  NavLink,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
} from "@remix-run/react"
/* istanbul ignore next */
import appStylesHref from "./app.css?url"
import { getData, WikiPage } from "./data"

export const loader = async (
  { request }: LoaderFunctionArgs
) => {
  const url = new URL(request.url)
  const q = url.searchParams.get("q")
  if (!q) {
    console.error('Query is null or undefined');
    return json({ pages: [], q: null });
  }
  const pages = await getData(q)
  return json({ pages, q })
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
]

export default function App() {
  const { pages, q } = useLoaderData<typeof loader>()
  const navigation = useNavigation()
  const submit = useDebounceSubmit()
  const searching = navigation.location &&
    new URLSearchParams(navigation.location.search).has("q")
  const [query, setQuery] = useState(q || "")
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    setQuery(q || "")
    const start = performance.now()
    if (!history.includes(q || "")) setHistory(history => [...history, q || ""])
  }, [q])

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="sidebar">
          <h1>Wiki pages</h1>
          <div>
            <Form
              id="search-form"
              onChange={(e) => {
                submit(e.currentTarget, {
                  debounceTimeout: 1000,
                })
              }}
              role="search">
              <input
                id="q"
                aria-label="Search pages"
                className={searching ? "loading" : ""}
                value={query}
                placeholder="Search"
                type="search"
                name="q"
                onChange={(e) => setQuery(e.currentTarget.value)}
              />
              <div id="search-spinner" aria-hidden hidden={!searching} />
            </Form>
            <Form>
              <button onClick={() => setQuery('')} type="reset">Clear</button>
            </Form>
          </div>
          <nav>
            {pages ? (
              <ul>
                {pages.map((page: WikiPage) => (
                  <li key={page.id}>
                    <NavLink to={`pages/${page.pageid}`}>
                      {page.title ? (
                        <>
                          {page.title}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No pages</i>
              </p>
            )}
            {history.length > 0 && (
              <>
                <h3>Search History</h3>
                <ul>
                  {history.map((query, index) => (
                    <li key={index}>
                      <strong>{query}</strong>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </nav>
        </div>
        <div className={
          navigation.state === "loading" && !searching
            ? "loading"
            : ""
        }
          id="detail">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}