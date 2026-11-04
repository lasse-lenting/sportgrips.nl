'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
const sports = [
  ['golf', 'Golf'],
  ['tennis', 'Tennis'],
  ['padel', 'Padel'],
  ['badminton', 'Badminton'],
  ['squash', 'Squash'],
  ['hockey', 'Hockey'],
];
const paths: Record<string, string> = {
  golf: '/golfgrips/',
  tennis: '/tennisgrips/',
  padel: '/padelgrips/',
  badminton: '/badmintongrips/',
  squash: '/squashgrips/',
  hockey: '/hockeygrips/',
};
const questions = [
  { title: 'Voor welke sport zoek je een grip?', label: 'Sport', options: sports },
  {
    title: 'Welke laag wil je veranderen?',
    label: 'Griplaag',
    options: [
      ['base', 'De onderlaag vervangen'],
      ['over', 'Een buitenlaag kiezen'],
      ['unknown', 'Dat wil ik eerst begrijpen'],
    ],
  },
  {
    title: 'Hoe voelen je handen tijdens het spelen?',
    label: 'Vocht',
    options: [
      ['dry', 'Meestal droog'],
      ['wet', 'Vaak vochtig'],
      ['varies', 'Dat wisselt'],
    ],
  },
  {
    title: 'Wat wil je vooral vergelijken?',
    label: 'Gevoel',
    options: [
      ['thickness', 'De dikte van het handvat'],
      ['surface', 'Het contactoppervlak'],
      ['unsure', 'Ik wil de verschillen begrijpen'],
    ],
  },
  {
    title: 'Waar wil je mee beginnen?',
    label: 'Doel',
    options: [
      ['choose', 'Een ander type kiezen'],
      ['replace', 'De grip vernieuwen'],
      ['care', 'Onderhoud en slijtage'],
    ],
  },
];
export function GripForm() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(['', '', '', '', '']);
  const [error, setError] = useState('');
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (started) heading.current?.focus({ preventScroll: true });
  }, [started, step]);
  const complete = step === 5;
  const hub = paths[answers[0]] ?? '/grips/';
  const replacing = answers[4] === 'replace';
  const recommendation =
    answers[4] === 'care'
      ? '/kennis/grips-schoonmaken/'
      : replacing
        ? `${hub}vervangen/`
        : answers[0] === 'golf' && answers[3] === 'thickness'
          ? '/golfgrips/maat/'
          : answers[0] === 'tennis' && answers[3] === 'thickness'
            ? '/tennisgrips/gripmaat/'
            : answers[0] === 'tennis' && answers[1] === 'over'
              ? '/tennisgrips/overgrips/'
              : answers[0] === 'tennis' && answers[1] === 'base'
                ? '/tennisgrips/basisgrips/'
                : hub;
  function next(e: FormEvent) {
    e.preventDefault();
    if (!answers[step]) {
      setError('Kies een antwoord om verder te gaan.');
      return;
    }
    setError('');
    setStep(step + 1);
  }
  if (!started)
    return (
      <div className="application-form form-home wizard-launch">
        <span className="wizard-kicker">Gratis · zonder account</span>
        <h3>Begin bij jouw sport.</h3>
        <p>
          Vijf korte vragen over je sport, griplaag, vocht, gevoel en doel. Daarna vind je de uitleg
          die je helpt vergelijken.
        </p>
        <button className="button" type="button" onClick={() => setStarted(true)}>
          Start de keuzehulp
        </button>
        <p className="demo-note">
          Een leesroute op basis van je antwoorden, zonder productranglijst.
        </p>
      </div>
    );
  return (
    <form
      onSubmit={next}
      noValidate
      className={`application-form form-home cabin-wizard garden-wizard ${complete ? 'wizard-complete' : ''}`}
    >
      <ol className="wizard-progress" aria-label="Voortgang keuzehulp">
        {[...questions.map((q) => q.label), 'Advies'].map((label, i) => (
          <li
            key={label}
            className={i < step ? 'is-complete' : i === step ? 'is-active' : ''}
            aria-current={i === step ? 'step' : undefined}
          >
            <span>{i + 1}</span>
            <small>{label}</small>
          </li>
        ))}
      </ol>
      <div className="wizard-panel" key={step}>
        <h3 ref={heading} tabIndex={-1}>
          {complete ? 'Dit telt voor jouw gripkeuze.' : questions[step].title}
        </h3>
        {!complete && (
          <fieldset className="wizard-fieldset">
            <legend>{questions[step].label}</legend>
            <div className="choice-grid">
              {questions[step].options.map(([value, label]) => (
                <label key={value} className="choice-card text-choice">
                  <input
                    type="radio"
                    name={`grip-question-${step}`}
                    value={value}
                    checked={answers[step] === value}
                    aria-describedby="grip-error"
                    onChange={() => {
                      setAnswers(answers.map((a, i) => (i === step ? value : a)));
                      setError('');
                    }}
                  />
                  <strong>{label}</strong>
                </label>
              ))}
            </div>
          </fieldset>
        )}
        <p
          id="grip-error"
          className={error ? 'field-error' : 'sr-only'}
          role={error ? 'alert' : undefined}
        >
          {error}
        </p>
        {complete && (
          <div className="wizard-result" aria-live="polite">
            <p>
              Je sport: <strong>{sports.find(([id]) => id === answers[0])?.[1]}</strong>. Begin bij
              de volgende afwegingen:
            </p>
            <div className="rich-content">
              <ul>
                <li>
                  <strong>Opbouw:</strong>{' '}
                  {answers[0] === 'golf'
                    ? 'een golfgrip wordt om de shaft gemonteerd. Basisgrip en overgrip zijn vooral termen bij rackets en sticks; volg de montage voor je club.'
                    : answers[1] === 'base'
                      ? 'controleer de onderlaag voordat je alleen een nieuwe buitenlaag toevoegt.'
                      : answers[1] === 'over'
                        ? 'een buitenlaag verandert ook de dikte. Behoud de onderlaag als het product dat voorschrijft.'
                        : 'lees eerst welke laag de basis vormt en welke daarbovenop komt.'}
                </li>
                <li>
                  <strong>Vocht:</strong>{' '}
                  {answers[2] === 'wet'
                    ? 'vergelijk vochtopname afzonderlijk van een kleverig gevoel. Lees ook de uitleg over zweethanden.'
                    : answers[2] === 'dry'
                      ? 'vergelijk het contactoppervlak dat je prettig vindt met droge handen.'
                      : 'beoordeel het gevoel bij zowel droge als vochtige handen.'}
                </li>
                <li>
                  <strong>Gevoel:</strong>{' '}
                  {answers[3] === 'thickness'
                    ? 'pas de complete opbouw; extra lagen maken het handvat dikker.'
                    : answers[3] === 'surface'
                      ? 'controleer textuur en materiaal in de modelinformatie.'
                      : 'begin met de verschillen tussen griptypen en probeer de opbouw met je eigen handen.'}
                </li>
                <li>
                  <strong>Volgende stap:</strong>{' '}
                  {answers[4] === 'care'
                    ? 'bekijk de onderhoudsinstructie en beoordeel slijtage.'
                    : replacing
                      ? 'controleer welke laag wordt vernieuwd en volg de montage-instructie.'
                      : 'vergelijk de eigenschappen vóór je een concreet product kiest.'}
                </li>
              </ul>
            </div>
            <Link href={recommendation} className="button">
              Lees mijn keuzeuitleg
            </Link>
            <p className="mt-4">
              <Link href={hub}>Bekijk de sportcategorie</Link>
              {answers[2] === 'wet' && (
                <>
                  {' '}
                  · <Link href="/kennis/grip-bij-zweethanden/">Uitleg bij zweethanden</Link>
                </>
              )}
            </p>
            <p className="demo-note">
              Dit is een leesadvies. Er zijn geen producten getest of automatisch passend verklaard.
            </p>
          </div>
        )}
      </div>
      <div className="wizard-actions">
        {step > 0 && (
          <button
            className="wizard-back"
            type="button"
            onClick={() => {
              setError('');
              setStep(step - 1);
            }}
          >
            Vorige
          </button>
        )}
        {!complete ? (
          <button className="button" type="submit">
            {step === 4 ? 'Bekijk mijn gripadvies' : 'Volgende'}
          </button>
        ) : (
          <button
            className="wizard-back"
            type="button"
            onClick={() => {
              setAnswers(['', '', '', '', '']);
              setStep(0);
              setError('');
            }}
          >
            Opnieuw beginnen
          </button>
        )}
      </div>
    </form>
  );
}
