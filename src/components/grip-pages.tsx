import Link from 'next/link';
import Image from 'next/image';
import { photoAlt } from '@/content/media';
import { Button, Container, Icon, SectionHeader } from './ui';
import { Ribbon } from './ribbon';
import { ProjectCard } from './cards';
import { GripForm } from './grip-form';
import { GripProducts } from './grip-products';
import {
  pageByPath,
  labelForPath,
  pageBreadcrumbs,
  type GripPage,
  type GripTable,
  type GripCollection,
} from '@/content/grips';
export function GripListing({ title, description, pages, groups }: Omit<GripCollection, 'path'>) {
  return (
    <>
      <section className="listing-hero">
        <Container>
          <SectionHeader as="h1" eyebrow="Sportgrips" title={title} description={description} />
        </Container>
        <Ribbon text="Jouw sport • Jouw grip • Helder kiezen" className="listing-ribbon" />
      </section>
      <section className="listing-body blog-listing">
        <Container>
          {(groups ?? [{ id: undefined, title: undefined, pages }]).map((group) => (
            <div key={group.id ?? 'all'} id={group.id} className="mb-15 scroll-mt-32">
              {group.title && <h2 className="mb-8">{group.title}</h2>}
              <div className="project-grid">
                {group.pages.map((p) => (
                  <ProjectCard
                    key={p.path}
                    project={{
                      slug: p.path,
                      title: p.title,
                      image: p.image,
                      location: p.description,
                      raised:
                        p.kind === 'hub' ? 'Sport' : p.kind === 'brand' ? 'Merk' : 'Gripkeuze',
                    }}
                    ctaHref={p.path}
                  />
                ))}
              </div>
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}
const headingId = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
export function GripDetail({ page }: { page: GripPage }) {
  const crumbs = pageBreadcrumbs(page);
  return (
    <div className="event-article-page">
      <header className="article-hero">
        <div className="article-hero-inner">
          <div className="article-hero-copy">
            <nav className="breadcrumb" aria-label="Kruimelpad">
              {crumbs.map((crumb, index) => (
                <span key={crumb.path} className="inline-flex items-center gap-2">
                  {index > 0 && <Icon name="arrow" />}
                  {index === crumbs.length - 1 ? (
                    <span aria-current="page">{crumb.name}</span>
                  ) : (
                    <Link href={crumb.path}>{crumb.name}</Link>
                  )}
                </span>
              ))}
            </nav>
            <div className="article-tags" aria-label="Onderwerpen">
              {page.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <h1>{page.title}</h1>
            <div className="article-read-time">
              <span aria-hidden="true">◷</span>{' '}
              {page.kind === 'hub'
                ? 'Vergelijk per sport'
                : page.kind === 'brand'
                  ? 'Merkvergelijking'
                  : 'Keuzeuitleg'}
            </div>
            <dl className="article-metadata">
              <div>
                <dt>Door</dt>
                <dd>Sportgrips</dd>
              </div>
              <div>
                <dt>Werkwijze</dt>
                <dd>Uitleg met bronverwijzingen</dd>
              </div>
            </dl>
          </div>
          <div className="article-hero-image">
            <Image
              src={page.image}
              alt={photoAlt(page.image)}
              width={1536}
              height={1024}
              sizes="(max-width: 679px) calc(100vw - 40px), (max-width: 999px) calc(100vw - 80px), 550px"
              loading="eager"
            />
          </div>
        </div>
      </header>
      <div className="article-layout">
        <aside className="article-sidebar">
          <div className="article-sidebar-sticky">
            <details className="article-toc" open>
              <summary>Inhoudsopgave</summary>
              <ol>
                {page.sections.map((s) => (
                  <li key={s.heading}>
                    <a href={`#${headingId(s.heading)}`}>{s.heading}</a>
                  </li>
                ))}
                {page.table && (
                  <li>
                    <a href="#vergelijking">Vergelijkingstabel</a>
                  </li>
                )}
                <li>
                  <a href="#bronnen">Bronnen</a>
                </li>
                <li>
                  <a href="#verder-lezen">Verder lezen</a>
                </li>
              </ol>
            </details>
            <div className="article-check-card">
              <span className="eyebrow">Sportgrips-keuzehulp</span>
              <h3>Begin bij jouw sport. Ontdek wat telt.</h3>
              <Button href="/keuzehulp/">Start de keuzehulp</Button>
              <ul aria-label="Wat de keuzehulp biedt">
                <li>
                  <Icon name="check" />
                  Vijf vragen over je gripkeuze
                </li>
                <li>
                  <Icon name="check" />
                  Een persoonlijke leesroute
                </li>
                <li>
                  <Icon name="check" />
                  Zonder account
                </li>
              </ul>
            </div>
          </div>
        </aside>
        <article className="article-content">
          <div className="article-summary">
            <span>Samenvatting</span>
            <p>{page.summary}</p>
          </div>
          <div className="rich-content">
            {page.sections.map((s, index) => (
              <section key={s.heading}>
                <h2 id={headingId(s.heading)}>{s.heading}</h2>
                {s.paragraphs.map((t) => (
                  <p key={t}>{t}</p>
                ))}
                {index === 0 && page.table && <ComparisonTable table={page.table} />}
                {s.links && (
                  <div className="grip-directory">
                    {s.links.map((link) => (
                      <Link key={link.href} href={link.href} className="grip-directory-card">
                        <h3>
                          {link.title} <span aria-hidden="true">→</span>
                        </h3>
                        {link.description && <p>{link.description}</p>}
                      </Link>
                    ))}
                  </div>
                )}
                {index === page.sections.length - 1 && page.products && (
                  <GripProducts ids={page.products} />
                )}
              </section>
            ))}
            <h2 id="bronnen">Bronnen en onderbouwing</h2>
            <p>
              Deze uitleg gebruikt de onderstaande bronnen. Er is geen eigen vergelijkende
              praktijktest uitgevoerd.
            </p>
            <ul>
              {page.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} rel="noopener noreferrer" target="_blank">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
            <h2 id="verder-lezen">Verder lezen</h2>
            <ul>
              {page.related.map((path) => (
                <li key={path}>
                  <Link href={path}>{pageByPath(path)?.title ?? labelForPath(path)}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="article-inline-cta">
            <div>
              <span className="eyebrow">Jouw sport als vertrekpunt</span>
              <h3>Ontdek welke eigenschappen voor jou tellen.</h3>
            </div>
            <Button href="/keuzehulp/">Start de keuzehulp</Button>
          </div>
        </article>
      </div>
    </div>
  );
}

function ComparisonTable({ table }: { table: GripTable }) {
  return (
    <div
      id="vergelijking"
      className="grip-comparison"
      role="region"
      aria-label="Vergelijkingstabel"
      tabIndex={0}
    >
      <table>
        <caption className="sr-only">Vergelijk de eigenschappen en keuzeafwegingen</caption>
        <thead>
          <tr>
            {table.headings.map((heading) => (
              <th scope="col" key={heading}>
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, index) =>
                index === 0 ? (
                  <th scope="row" key={index}>
                    {cell}
                  </th>
                ) : (
                  <td key={index}>{cell}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export function GripHelperPage() {
  return (
    <>
      <section className="listing-hero">
        <Container>
          <SectionHeader
            as="h1"
            eyebrow="Sportgrips-keuzehulp"
            title="Welke grip past bij mij?"
            description="Vijf vragen over je sport en voorkeuren. Ontvang een leesroute die je helpt vergelijken."
          />
        </Container>
      </section>
      <section className="listing-body">
        <Container className="max-w-[850px]">
          <GripForm />
        </Container>
      </section>
    </>
  );
}
