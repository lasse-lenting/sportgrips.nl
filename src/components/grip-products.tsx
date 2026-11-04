import { bolSearchUrl, productsByIds } from '@/content/products';

export function GripProducts({ ids }: { ids: string[] }) {
  return (
    <div className="grip-products">
      <p className="grip-shopping-note">
        Zoek de modellen bij bol.com en controleer uitvoering, verpakking en actuele prijs. De
        zoekresultaten kunnen per moment verschillen.
      </p>
      {productsByIds(ids).map((product) => (
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
              href={bolSearchUrl(product.query)}
              target="_blank"
              rel="sponsored noopener noreferrer"
              aria-label={`Zoek ${product.name} bij bol.com (opent in een nieuw tabblad)`}
              className="grip-shop-link"
            >
              Zoek bij bol.com <span aria-hidden="true">↗</span>
            </a>
            <a href={product.source.url} target="_blank" rel="noopener noreferrer">
              Fabrikantgegevens{' '}
              <span className="sr-only">voor {product.name} (opent in een nieuw tabblad)</span>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
