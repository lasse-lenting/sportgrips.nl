import type { GripFaqs } from '@/content/grips';
import { absoluteUrl } from '@/lib/seo';
import { JsonLd } from './json-ld';

export function CategoryFaqSection({ faqs, path }: { faqs: GripFaqs; path: string }) {
  if (faqs.items.length === 0) return null;

  return (
    <section className="article-faq" aria-labelledby="veelgestelde-vragen">
      <h2 id="veelgestelde-vragen">{faqs.heading}</h2>
      <div className="article-faq-list">
        {faqs.items.map(({ question, answer }) => (
          <details key={question} className="article-faq-item">
            <summary>
              <span>{question}</span>
              <span className="article-faq-icon" aria-hidden="true" />
            </summary>
            <div className="article-faq-answer">
              <p>{answer}</p>
            </div>
          </details>
        ))}
      </div>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          '@id': absoluteUrl(`${path}#veelgestelde-vragen`),
          inLanguage: 'nl-NL',
          mainEntity: faqs.items.map(({ question, answer }) => ({
            '@type': 'Question',
            name: question,
            acceptedAnswer: { '@type': 'Answer', text: answer },
          })),
        }}
      />
    </section>
  );
}
