import Image from 'next/image';
import { bolAffiliateUrl, productsByIds } from '@/content/products';

export function GripProducts({ ids }: { ids: string[] }) {
  return (
    <div className="grip-products">
      <p className="grip-shopping-note">
        Bekijk de actuele prijs en beschikbaarheid bij bol.com. Als je via een affiliatelink iets
        koopt, kan Sportgrips commissie ontvangen.
      </p>
      {productsByIds(ids).map((product) => (
        <div className="grip-product" key={product.id}>
          {/* Bol requires product images to keep their original URL and host. */}
          <Image
            className="grip-product-image"
            src={product.bol.image}
            alt={`${product.name}, ${product.bol.variant}`}
            width={160}
            height={160}
            unoptimized
          />
          <div>
            <span className="eyebrow">{product.type}</span>
            <h3>{product.name}</h3>
            <p>{product.consideration}</p>
            <dl>
              <div>
                <dt>Uitvoering bij bol.com</dt>
                <dd>{product.bol.variant}</dd>
              </div>
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
                href={bolAffiliateUrl(product)}
                target="_blank"
                rel="sponsored noopener"
                aria-label={`Bekijk ${product.name} bij bol.com (affiliatelink, opent in een nieuw tabblad)`}
                className="grip-shop-link"
              >
                Bekijk bij bol.com <span aria-hidden="true">↗</span>
              </a>
              <a href={product.source.url} target="_blank" rel="noopener noreferrer">
                Fabrikantgegevens{' '}
                <span className="sr-only">voor {product.name} (opent in een nieuw tabblad)</span>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
