import { ImageResponse } from '@vercel/og';
import { NextApiRequest, NextApiResponse } from 'next';
import { BlogTheme, DefaultTheme } from '@themes/index';
import { ReactElement } from 'react';

export const config = {
  runtime: 'nodejs'
};

export default async function ogimage(req: NextApiRequest, res: NextApiResponse) {
  const PARAMS = req.query as Record<string, string | string[]>;
  let selectedTheme: ReactElement;

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
    const image = new ImageResponse(selectedTheme, {
      width: Number(PARAMS.width ?? 1200),
      height: Number(PARAMS.height ?? 630)
    });

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    res.setHeader('Content-Type', 'image/png');
    res.status(200).send(buffer);
  } catch {
    res.status(500).send('Server error');
  }
}
