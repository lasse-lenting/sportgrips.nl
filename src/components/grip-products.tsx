import { bolSearchUrl, productsByIds } from '@/content/products';

export function GripProducts({ ids }: { ids: string[] }) {
  const products = productsByIds(ids);
  const bolOnly = products.every((product) => product.query);
  return (
    <div className="grip-products">
      <p className="grip-shopping-note">
        {bolOnly
          ? 'Zoek de modellen bij bol.com en controleer uitvoering, verpakking en actuele prijs. De zoekresultaten kunnen per moment verschillen.'
          : 'Controleer uitvoering, verpakking en actuele prijs bij de aanbieder.'}
      </p>
      {products.map((product) => (
        <div className="grip-product" key={product.id}>
          <span className="eyebrow">{product.type}</span>
          <h3>{product.name}</h3>
          <p>{product.consideration}</p>
          <dl>
            <div>
              <dt>Oppervlak</dt>
              <dd>{product.surface}</dd>
            </div>
            <div>
              <dt>Dikte / maat</dt>
              <dd>{product.thickness}</dd>
            </div>
          </dl>
          <div className="grip-product-links">
            <a
              href={product.query ? bolSearchUrl(product.query) : product.source.url}
              target="_blank"
              rel={product.query ? 'sponsored noopener noreferrer' : 'noopener noreferrer'}
              aria-label={
                product.query
                  ? `Zoek ${product.name} bij bol.com (opent in een nieuw tabblad)`
                  : `Bekijk ${product.name} bij het merk (opent in een nieuw tabblad)`
              }
              className="grip-shop-link"
            >
              {product.query ? 'Zoek bij bol.com' : 'Bekijk bij het merk'}{' '}
              <span aria-hidden="true">↗</span>
            </a>
            {product.query && (
              <a href={product.source.url} target="_blank" rel="noopener noreferrer">
                Fabrikantgegevens{' '}
                <span className="sr-only">voor {product.name} (opent in een nieuw tabblad)</span>
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
