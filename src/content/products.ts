import data from './products.json';

export type GripProduct = {
  id: string;
  name: string;
  type: string;
  surface: string;
  thickness: string;
  consideration: string;
  bol: { url: string; image: string; variant: string };
  source: { name: string; url: string };
};

export const gripProducts: GripProduct[] = data;
export const productsByIds = (ids: string[] = []) =>
  ids.map((id) => {
    const product = gripProducts.find((p) => p.id === id);
    if (!product) throw new Error(`Unknown grip product: ${id}`);
    return product;
  });

const bolSiteId = '1557029';

export function bolAffiliateUrl(product: GripProduct) {
  const trackingUrl = new URL('https://partner.bol.com/click/click');
  trackingUrl.search = new URLSearchParams({
    t: 'url',
    s: bolSiteId,
    url: product.bol.url,
    f: 'txl',
    name: product.id,
  }).toString();
  return trackingUrl.href;
}
