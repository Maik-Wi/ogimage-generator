import { ImageResponse } from '@vercel/og';
import { ReactElement } from 'react';

import { buildOgParams } from '@lib/og-params';
import { BlogTheme, DefaultTheme } from '@themes/index';

export const config = {
  runtime: 'experimental-edge'
};

const selectTheme = (params: ReturnType<typeof buildOgParams>): ReactElement => {
  switch (params.theme) {
    case 'blog':
      return <BlogTheme params={params} />;
    default:
      return <DefaultTheme params={params} />;
  }
};

const getLogoUrl = (reqUrl: URL) => new URL('/hat-logo.png', reqUrl).toString();

export default async function ogimage(req: Request) {
  const requestUrl = new URL(req.url);
  const params = buildOgParams(requestUrl.searchParams, getLogoUrl(requestUrl));

  try {
    const fontData = await fetch(
      new URL('../../assets/fonts/SNPro-Regular.otf', import.meta.url)
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(selectTheme(params), {
      width: params.width,
      height: params.height,
      fonts: [
        {
          name: 'SN Pro',
          data: fontData,
          weight: 400,
          style: 'normal'
        },
        {
          name: 'SN Pro',
          data: fontData,
          weight: 700,
          style: 'normal'
        }
      ]
    });
  } catch (error) {
    return new Response('Failed to generate image', { status: 500 });
  }
}
