////////////////////////////////////////////////////////////////////////////////
// get and create data 
////////////////////////////////////////////////////////////////////////////////

// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";
import invariant from "tiny-invariant";

type WikiPageMutation = {
  pageid?: string
  title?: string
  ns?: number
  snippet?: string
  favorite?: boolean
};

export type WikiPage = WikiPageMutation & {
  id: string
};

////////////////////////////////////////////////////////////////////////////////
// fetching from Wikipedia API.
export const getWikiPages = {
  pages: {} as Record<string, WikiPage>,

  async getPageId(pageid: string): Promise<WikiPage | null> {
      return getWikiPages.pages[pageid] || null;
  },

  async get(id: string): Promise<WikiPage | null> {
      if (!id) {
          throw new Error('Query parameter is required');
      }

      try {
          const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${id}`)
          if (!response.ok) {
              throw new Error('Error Not found Wikipedia article')
          }
          const wikiPage = await response.json()
          return {
              id: id.toLowerCase().replace(/ /g, '_'),
              title: wikiPage.title,
              snippet: wikiPage.snippet,
          };

      } catch (error) {
          throw new Error('Internal Server Error');
      }
  },

  async getAll(): Promise<WikiPage[]> {
      return Object.keys(getWikiPages.pages)
          .map((key) => getWikiPages.pages[key])
          .sort(sortBy("title", ["desc", "asc"]));
  },

  async create(values: WikiPageMutation): Promise<WikiPage> {
      const id = values.pageid || Math.random().toString(36).substring(2, 9);
      const newPage = { id, ...values };
      getWikiPages.pages[id] = newPage;
      return newPage;
  },
}

////////////////////////////////////////////////////////////////////////////////
// Handful of helper functions to be called from route loaders and actions
export async function getData(query?: string | null) {
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (!query) {
    console.error('Query is null or undefined');
    return;
  }

  try {
    const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`);
    if (!response.ok) {
      throw new Error('Error fetching Wikipedia search results');
    }
    const data = await response.json()
    
    const pages = data.query.search.map(async (page: { title: string; id?: string; snippet?: string }) => {
        await getWikiPages.create({
            ...page,
            title: page.title.toLowerCase(),
        });
    });

    await Promise.all(pages);

    return data.query.search; // Return the search results

  } catch (error) {
    console.error('Error:', error);
    throw error; // Re-throw the error after logging it
  }
}

export async function getPage(pageid: string) {
  return getWikiPages.getPageId(pageid)
}