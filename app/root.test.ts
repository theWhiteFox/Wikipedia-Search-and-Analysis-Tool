import { loader } from './root'
import { describe, expect, jest, beforeEach, it, test } from "@jest/globals"
import type { LoaderFunctionArgs } from "@remix-run/node"
import { getData, WikiPage } from "./data"

jest.mock('./data', () => ({
  getData: jest.fn(),
}));

test('loader responds within 100ms', async () => {
  const start = performance.now();
  const mockData: WikiPage = { id: '' };

  (getData as jest.MockedFunction<typeof getData>).mockResolvedValue(mockData)
  const request = new Request('https://example.com/?q=test');
  await loader({ request } as LoaderFunctionArgs);
  const end = performance.now();
  expect(end - start).toBeLessThan(100);
});

describe('loader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return pages and query when query parameter is provided', async () => {
    const mockData: WikiPage = { id: '' };

    (getData as jest.MockedFunction<typeof getData>).mockResolvedValue(mockData)

    const request = new Request('https://example.com/?q=test');
    const args: LoaderFunctionArgs = { request } as LoaderFunctionArgs;

    const response = await loader(args)

    const result = await response.json();

    expect(result).toEqual({
      pages: mockData,
      q: 'test',
    });

    expect(getData).toHaveBeenCalledWith('test');
  });
});