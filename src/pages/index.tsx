import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';

import type { OgImageParams } from '@lib/og-params';
import { buildOgImageUrl } from '@lib/og-url';
import { DefaultTheme } from '@themes/DefaultTheme';

function Home() {
  const [title, setTitle] = useState('Proamerikanisch\neingestellt waren');
  const [image, setImage] = useState('');
  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(630);
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  const generatedImageUrl = useMemo(() => {
    if (!baseUrl) {
      return '';
    }

    return buildOgImageUrl(baseUrl, {
      title,
      image,
      width,
      height,
      theme: 'default'
    });
  }, [baseUrl, height, image, title, width]);

  const params: Pick<OgImageParams, 'title' | 'logo' | 'width' | 'height'> = {
    title,
    logo: '/hat-logo.png',
    width,
    height
  };

  return (
    <>
      <Head>
        <meta property="og:image" content={generatedImageUrl} />
        <meta property="og:title" content={title} />
      </Head>

      <div
        style={{
          display: 'flex',
          maxWidth: 1200,
          justifyContent: 'center',
          alignItems: 'center',
          margin: '3rem auto',
          gap: '3rem'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 300
          }}
        >
          <textarea
            placeholder="title"
            rows={3}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <input
            placeholder="Image url"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <input
            placeholder="Width"
            type="number"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
          />
          <input
            placeholder="Height"
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
          />
          <a href={generatedImageUrl} download="Image generated">
            Download Image
          </a>
        </div>

        <DefaultTheme params={params} />
      </div>
    </>
  );
}

export default Home;
