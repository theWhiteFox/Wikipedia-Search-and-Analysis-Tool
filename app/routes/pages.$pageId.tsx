import { Form, useFetcher, useLoaderData } from "@remix-run/react"
import type { FunctionComponent } from "react"
import type { WikiPage } from "../data"
import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node"
import { getPage } from "../data"
import invariant from "tiny-invariant"
import parse from 'html-react-parser'

export const action = async ({
  params,
  request
}: ActionFunctionArgs) => {
  invariant(params.pageId, "Missing pageid param")
  const formData = await request.formData()
}

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.pageId, "Missing pageId param")
  const page = await getPage(params.pageId)
  if (!page) {
    throw new Response("Not Found", { status: 404 })
  }
  return json({ page })
}

export default function page() {
  const { page } = useLoaderData<typeof loader>()

  return (
    <div id="page">
      <div>
        <h1>
          {page.title ? (
            <>
              {page.title}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite page={page} />
        </h1>

        {page.snippet ? (
          <p>
            {parse(page.snippet)}
          </p>
        ) : null}

      </div>
    </div>
  )
}

const Favorite: FunctionComponent<{
  page: Pick<WikiPage, "favorite">
}> = ({ page }) => {
  const fetcher = useFetcher()
  const favorite = fetcher.formData
    ? fetcher.formData.get("favorite") === "true"
    : page.favorite

  return (
    <fetcher.Form method="post">
      <button
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
        name="favorite"
        value={favorite ? "false" : "true"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  )
}
