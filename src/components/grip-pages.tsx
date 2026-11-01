import Link from 'next/link';
import Image from 'next/image';
import { Button, Container, Icon, SectionHeader } from './ui';
import { Ribbon } from './ribbon';
import { ProjectCard } from './cards';
import { GripForm } from './grip-form';
import { pageByPath, labelForPath, type GripPage } from '@/content/grips';
export function GripListing({
  title,
  description,
  pages,
}: {
  title: string;
  description: string;
  pages: GripPage[];
}) {
  return (
    <>
      <section className="listing-hero">
        <Container>
          <SectionHeader as="h1" eyebrow="SPORTGRIPS" title={title} description={description} />
        </Container>
        <Ribbon text="Jouw sport • Jouw grip • Helder kiezen" className="listing-ribbon" />
      </section>
      <section className="listing-body blog-listing">
        <Container>
          <div className="project-grid">
            {pages.map((p) => (
              <ProjectCard
                key={p.path}
                project={{
                  slug: p.path,
                  title: p.title,
                  image: p.image,
                  location: p.description,
                  raised: p.kind === 'hub' ? 'Sport' : 'Uitleg',
                }}
                ctaHref={p.path}
              />
            ))}
          </div>
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
  return (
    <div className="event-article-page">
      <header className="article-hero">
        <div className="article-hero-inner">
          <div className="article-hero-copy">
            <nav className="breadcrumb" aria-label="Kruimelpad">
              <Link href="/">Home</Link>
              <Icon name="arrow" />
              {page.parent && (
                <>
                  <Link href={page.parent}>{labelForPath(page.parent)}</Link>
                  <Icon name="arrow" />
                </>
              )}
              <span>{page.title}</span>
            </nav>
            <div className="article-tags" aria-label="Onderwerpen">
              {page.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <h1>{page.title}</h1>
            <div className="article-read-time">
              <span aria-hidden="true">◷</span> Keuzeuitleg
            </div>
            <dl className="article-metadata">
              <div>
                <dt>Door</dt>
                <dd>SPORTGRIPS</dd>
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
              alt=""
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
                    <a href="#vergelijking">Vergelijking</a>
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
              <span className="eyebrow">SPORTGRIPS-keuzehulp</span>
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
            {page.sections.map((s) => (
              <section key={s.heading}>
                <h2 id={headingId(s.heading)}>{s.heading}</h2>
                {s.paragraphs.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </section>
            ))}
            {page.table && (
              <section>
                <h2 id="vergelijking">Vergelijking</h2>
                <div className="overflow-x-auto">
                  <table>
                    <thead>
                      <tr>
                        {page.table.headings.map((h) => (
                          <th scope="col" key={h}>
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {page.table.rows.map((row) => (
                        <tr key={row[0]}>
                          {row.map((cell, i) =>
                            i === 0 ? (
                              <th scope="row" key={i}>
                                {cell}
                              </th>
                            ) : (
                              <td key={i}>{cell}</td>
                            ),
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
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
export function GripHelperPage() {
  return (
    <>
      <section className="listing-hero">
        <Container>
          <SectionHeader
            as="h1"
            eyebrow="SPORTGRIPS-keuzehulp"
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
