import type { OgImageParams } from '@lib/og-params';

export const buildOgImageUrl = (
  baseUrl: string,
  params: Pick<
    OgImageParams,
    'title' | 'width' | 'height' | 'image' | 'theme' | 'author' | 'time'
  >
) => {
  const url = new URL('/api/ogimage', baseUrl);

  if (params.title) {
    url.searchParams.set('title', params.title);
  }

  if (params.image) {
    url.searchParams.set('image', params.image);
  }

  if (params.author) {
    url.searchParams.set('author', params.author);
  }

  if (params.time) {
    url.searchParams.set('time', params.time);
  }

  if (params.theme) {
    url.searchParams.set('theme', params.theme);
  }

  url.searchParams.set('width', String(params.width));
  url.searchParams.set('height', String(params.height));

  return url.toString();
};
