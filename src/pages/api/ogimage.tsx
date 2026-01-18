import { ImageResponse } from '@vercel/og';
import { NextApiRequest, NextApiResponse } from 'next';
import { BlogTheme, DefaultTheme } from '@themes/index';
import { ReactElement } from 'react';

export const config = {
  runtime: 'experimental-edge'
};

export default async function ogimage(req: NextApiRequest, res: NextApiResponse) {
  const PARAMS = req.query as Record<string, string | string[]>;

  const host = req.headers.host ?? 'localhost:3000';
  const protocolHeader = req.headers['x-forwarded-proto'];
  const protocol = Array.isArray(protocolHeader)
    ? protocolHeader[0]
    : protocolHeader || 'http';
  const logoUrl = new URL('/hat-logo.png', `${protocol}://${host}`).toString();

  let selectedTheme: ReactElement;

  PARAMS.logo = logoUrl;

  // Switch OG Image style by themes created
  switch (PARAMS.theme) {
    case 'blog':
      selectedTheme = <BlogTheme params={PARAMS} />;
      break;
    default:
      selectedTheme = <DefaultTheme params={PARAMS} />;
      break;
  }

  try {
    const fontData = await fetch(new URL('../../../SNPro-Regular.otf', import.meta.url)).then(
      (res) => res.arrayBuffer()
    );

    const image = new ImageResponse(selectedTheme, {
      width: Number(PARAMS.width ?? 1200),
      height: Number(PARAMS.height ?? 630),
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

    return image;
  } catch (e) {
    return new Response('Failed to generate image', { status: 500 });
  }
}
