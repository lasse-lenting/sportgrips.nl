import data from './products.json';

export type GripProduct = {
  id: string;
  name: string;
  type: string;
  surface: string;
  thickness: string;
  consideration: string;
  query?: string;
  source: { name: string; url: string };
};

export const gripProducts = data as GripProduct[];
export const productsByIds = (ids: string[] = []) =>
  ids.map((id) => {
    const product = gripProducts.find((p) => p.id === id);
    if (!product) throw new Error(`Unknown grip product: ${id}`);
    return product;
  });

// Search destinations make no claim about listings, prices or availability.
// Replace with verified product/partner URLs once the bol.com partner links are supplied.
export const bolSearchUrl = (query: string) =>
  `https://www.bol.com/nl/nl/s/?searchtext=${encodeURIComponent(query)}`;
