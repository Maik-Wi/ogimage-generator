export type OgThemeName = 'blog' | 'default';

export interface OgImageParams {
  title: string;
  logo: string;
  width: number;
  height: number;
  theme: OgThemeName;
  image?: string;
  author?: string;
  time?: string;
}

const DEFAULTS = {
  width: 1200,
  height: 630
};

const parseNumber = (value: string | null, fallback: number) => {
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }

  return parsed;
};

export const buildOgParams = (searchParams: URLSearchParams, logoUrl: string): OgImageParams => {
  const themeParam = searchParams.get('theme');
  const theme = themeParam === 'blog' ? 'blog' : 'default';

  return {
    title: searchParams.get('title') ?? '',
    image: searchParams.get('image') ?? undefined,
    author: searchParams.get('author') ?? undefined,
    time: searchParams.get('time') ?? undefined,
    width: parseNumber(searchParams.get('width'), DEFAULTS.width),
    height: parseNumber(searchParams.get('height'), DEFAULTS.height),
    logo: logoUrl,
    theme
  };
};
