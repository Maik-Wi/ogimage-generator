interface DefaultThemeProps {
  params: {
    title?: string;
    logo?: string;
    width?: number;
    height?: number;
  };
}

function DefaultTheme({ params }: DefaultThemeProps) {
  const title = params.title || '';
  const logo = params.logo || '';

  return (
    <div
      style={{
        fontFamily: '"SN Pro", "Inter", "Helvetica Neue", Arial, sans-serif',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 48,
        padding: 96,
        color: '#121212',
        width: params.width || 1200,
        height: params.height || 630,
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
            width: 180,
            height: 180,
            objectFit: 'contain'
          }}
        />
      )}

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 36,
          maxWidth: '70%'
        }}
      >
        <div
          style={{
            width: 6,
            height: 320,
            backgroundColor: '#121212',
            borderRadius: 8
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.15,
              whiteSpace: 'pre-line'
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 48,
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
