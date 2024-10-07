import { useLoaderData } from "@remix-run/react"
import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node"
import { getWikiPage } from "../data"
import invariant from "tiny-invariant"
import parse from 'html-react-parser'

export const action = async ({
  params,
  request
}: ActionFunctionArgs) => {
  invariant(params.pageId, "Missing pageid param")
  const formData = await request.formData()
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.pageId, "Missing pageId param")
  const page = await getWikiPage(params.pageId)
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
          )}
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