import type { OgImageParams } from '@lib/og-params';

interface DefaultThemeProps {
  params: Pick<OgImageParams, 'title' | 'logo' | 'width' | 'height'>;
}

function DefaultTheme({ params }: DefaultThemeProps) {
  const title = params.title;
  const logo = params.logo;

  return (
    <div
      style={{
        fontFamily: '"SN Pro", "Inter", "Helvetica Neue", Arial, sans-serif',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 56,
        padding: 88,
        color: '#121212',
        width: params.width,
        height: params.height,
        boxSizing: 'border-box',
        position: 'relative',
        backgroundColor: '#ffffff'
      }}
    >
      {logo && (
        <img
          src={logo}
          alt="Hat logo"
          style={{
            width: 168,
            height: 168,
            objectFit: 'contain',
            flexShrink: 0
          }}
        />
      )}

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 40,
          maxWidth: 820
        }}
      >
        <div
          style={{
            width: 6,
            height: 300,
            backgroundColor: '#121212',
            borderRadius: 8
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.1,
              whiteSpace: 'pre-line'
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 44,
              fontWeight: 500
            }}
          >
            maik.io
          </div>
        </div>
      </div>
    </div>
  );
}

export { DefaultTheme };
