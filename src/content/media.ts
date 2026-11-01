import assets from './media.json';

export function photo(key: string) {
  const asset = assets.find((item) => item.key === key);
  if (!asset) throw new Error(`Unknown Sportgrips photo: ${key}`);
  return asset.path;
}
const descriptions: Record<string, string> = {
  hero: 'Racketgrips en een golfgrip op een donkere sportbaan',
  'hero-mobile': 'Tennis- en padelracket met lime en witte grip op een donkere sportbaan',
  golf: 'Handen om een golfclub met een zwarte rubberen grip',
  tennis: 'Tennisracket met lime overgrip en een tennisbal op een hardcourt',
  padel: 'Hand om een witte grip van een padelracket',
  badminton: 'Badmintonracket met witte badstof grip en een shuttle op een sportvloer',
  squash: 'Squashracket met zwarte grip en squashbal op een houten baan',
  hockey: 'Hockeystick met gewikkelde grip en een witte bal op een kunstgrasveld',
  rewrap: 'Witte overgrip die om een rackethandvat wordt gewikkeld',
  textures: 'Zwarte rubberen grip, witte badstof grip en lime overgrip naast elkaar',
  'court-evening': 'Rustige racketbaan in de avond met een racket op de bank',
};
export function photoAlt(path: string) {
  const asset = assets.find((item) => item.path === path);
  return asset ? descriptions[asset.key] : '';
}
