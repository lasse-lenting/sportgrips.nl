import Image from 'next/image';
import { avatars, images, impacts, logos, missions } from '@/content/site';
import { Button, Container, Icon, Section, SectionHeader } from './ui';
import { Reveal } from './motion';
import { PurposeTabs, FAQ } from './interactions';
import { ProjectCard } from './cards';
import { Ribbon } from './ribbon';
import { GripForm } from './grip-form';
import { homeProjects as projects } from '@/content/homepage';
export function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-inner">
        <Image
          src="/assets/maaistro/hero-grass.jpg"
          alt=""
          width={2048}
          height={1152}
          sizes="100vw"
          preload
          className="hero-image hero-grass"
        />
        <div className="hero-content">
          <h1 className="hero-heading brand-heading">
            <span className="hero-line line-one">Jouw sport.</span>
            <span className="hero-pill">Jouw grip.</span>
            <span className="hero-line line-three">Kies met SPORTGRIPS.</span>
          </h1>
          <div className="hero-proof">
            <Button href="#volunteer-apply">Vind jouw grip</Button>
            <div className="donors">
              <div className="avatars">
                {avatars.map((src) => (
                  <Image
                    key={src}
                    src={src}
                    alt=""
                    width={42}
                    height={28}
                    sizes="28px"
                    loading="lazy"
                  />
                ))}
              </div>
              <span>Voor jouw sport &amp; spel</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export function Recognition() {
  return (
    <section className="recognition">
      <Container>
        <p>Gripadvies voor jouw sport:</p>
        <div className="logo-marquee">
          <div className="logo-track">
            {[...logos, ...logos].map((logo, i) => (
              <span className="airline-wordmark" key={i} aria-hidden={i >= logos.length}>
                {logo.name}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
export function Purpose() {
  return (
    <section id="our-purpose" className="purpose">
      <SectionHeader
        center
        eyebrow="De SPORTGRIPS-keuzehulp"
        title="Goed kiezen begint bij jouw grip."
        description="Een club, racket of stick: begin bij je sport en ontdek welke eigenschappen voor jou tellen."
      />
      <PurposeTabs />
    </section>
  );
}
export function OngoingProjects() {
  return (
    <Section id="in-progress" className="ongoing">
      <Container>
        <SectionHeader
          eyebrow="Begin bij jouw sport"
          title="Voor welke sport zoek jij grips?"
          description="Begin met golf, tennis of padel. Via Grips per sport vind je ook badminton, squash en hockey."
        />
        <div className="project-grid">
          {projects.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1} distance={80}>
              <ProjectCard
                project={p}
                badgeLabel="Bekijk"
                ctaLabel="Lees de keuzeuitleg"
                ctaHref={`/${p.slug}/`}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
export function Mission() {
  return (
    <Section id="goals" className="missions">
      <Container>
        <SectionHeader
          center
          eyebrow="Zo werkt het"
          title="Van jouw sport naar een gripkeuze"
          description="Begin bij je sport en ontdek stap voor stap hoe je dikte, oppervlak en opbouw vergelijkt."
        />
        <div className="mission-list">
          {missions.map((m, i) => (
            <div className={`mission-row ${i % 2 ? 'reverse' : ''}`} key={m.title}>
              <Reveal className="mission-art mission-art-clay">
                <Image
                  src={m.image}
                  alt=""
                  width={1536}
                  height={1024}
                  sizes="(max-width: 680px) 85vw, 45vw"
                />
              </Reveal>
              <Reveal className={`mission-info tone-${m.color} without-proof`} delay={0.1}>
                <span className="mission-note">{m.note}</span>
                <div className="mission-text">
                  <h3>{m.title}</h3>
                  <p>{m.description}</p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
export function Impacts() {
  return (
    <Section id="impacts" className="impacts">
      <Container>
        <SectionHeader
          eyebrow="Duidelijk over ons advies"
          title="Helder advies. Geen verkooppraatjes."
          description="Je wilt begrijpen wat bij je past. We leggen eigenschappen uit en verwijzen naar bronnen, zonder zelf tests of resultaten te claimen."
        />
      </Container>
      <div className="impact-scene">
        <div className="impact-marquee">
          <div className="impact-track">
            {[...impacts, ...impacts, ...impacts].map((a, i) => (
              <article className="impact-card" key={i} aria-hidden={i >= 3}>
                <img src={a.image} alt="" loading="lazy" />
                <span className={`sticker tone-${a.color}`}>{a.text}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
      <div className="impact-ribbon-slot">
        <Ribbon
          text="Jouw sport • Jouw grip • Helder gekozen"
          kind="slalom"
          className="impact-ribbon"
          reverse
        />
      </div>
    </Section>
  );
}
export function Questions() {
  return (
    <Section id="faq" className="questions">
      <Container>
        <SectionHeader
          center
          eyebrow="Veelgestelde vragen"
          title="Nog een vraag over grips?"
          description="De belangrijkste antwoorden voordat je een andere grip kiest."
        />
        <FAQ />
      </Container>
    </Section>
  );
}
export function VolunteerSection() {
  return (
    <Section id="volunteer-apply" className="volunteer-section">
      <img className="sky-background" src={images.sky} alt="" loading="lazy" />
      <Container>
        <div className="volunteer-intro">
          <SectionHeader
            eyebrow="De SPORTGRIPS-keuzehulp"
            title="Een goede grip begint bij jou."
            description="Vertel over je sport en voorkeuren. Je krijgt een leesroute met eigenschappen om te vergelijken."
            light
          />
          <ul className="volunteer-benefits">
            {[
              'Begin bij jouw sport en griplaag',
              'Heldere uitleg over dikte en gevoel',
              'Geen account nodig om te beginnen',
            ].map((t) => (
              <li key={t}>
                <Icon name="check" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="volunteer-form-card">
          <GripForm />
        </div>
      </Container>
      <Ribbon
        text="Jouw sport. Jouw grip. Jouw keuze."
        kind="double"
        className="volunteer-ribbon"
      />
    </Section>
  );
}
