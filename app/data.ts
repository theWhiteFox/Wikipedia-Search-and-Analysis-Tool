////////////////////////////////////////////////////////////////////////////////
// get and create data 
////////////////////////////////////////////////////////////////////////////////

type WikiPageMutation = {
  pageid?: string
  title?: string
  ns?: number
  snippet?: string
  favorite?: boolean
}

export type WikiPage = WikiPageMutation & {
  id: string
}

export const wikiPages = {
  pages: {} as Record<string, WikiPage>,

  async getPageId(pageid: string): Promise<WikiPage | null> {
      return wikiPages.pages[pageid] || null
  },

  async create(values: WikiPageMutation): Promise<WikiPage> {
      const id = values.pageid || Math.random().toString(36).substring(2, 9)
      const newPage = { id, ...values }
      wikiPages.pages[id] = newPage
      return newPage
  },
}

export async function getData(query?: string | null) {
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (!query) {
    console.error('Query is null or undefined')
    return
  }

  try {
    const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`)
    if (!response.ok) {
      throw new Error('Error fetching Wikipedia search results')
    }

    const data = await response.json()
    const pages = data.query.search.map(async (page: { title: string; id?: string; snippet?: string }) => {
        await wikiPages.create({
            ...page,
            title: page.title.toLowerCase(),
        })
    })

    await Promise.all(pages)

    return data.query.search

  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export async function getWikiPage(pageid: string) {
  return wikiPages.getPageId(pageid)
}