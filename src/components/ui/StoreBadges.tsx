import Image from 'next/image';

export const APP_STORE_URL = 'https://apps.apple.com/us/app/iloomi/id6467228839';
export const WEB_APP_URL = 'https://app.iloomi.com';
export const WEB_APP_LOGIN_URL = `${WEB_APP_URL}/login`;

interface StoreBadgesProps {
  /** Badge height in px. */
  height?: number;
  className?: string;
}

export function StoreBadges({ height = 52, className = '' }: StoreBadgesProps) {
  const width = Math.round((height * 140) / 42);
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="inline-block w-fit">
        <Image
          src="/images/app-store-button.svg"
          alt="Download on the App Store"
          width={width}
          height={height}
          style={{ height, width: 'auto' }}
        />
      </a>
      <WebAppBadge height={height} />
      <AppStoreQr size={Math.round(height * 1.6)} />
    </div>
  );
}

/** On a computer, the App Store link as a QR code to scan with an iPhone. */
function AppStoreQr({ size }: { size: number }) {
  return (
    <div className="ml-2 hidden items-center gap-3 lg:flex">
      <Image
        src="/images/app-store-qr.svg"
        alt="QR code for Iloomi on the App Store"
        width={size}
        height={size}
        unoptimized
        className="rounded-lg bg-white p-1.5"
      />
      <span className="max-w-[7rem] text-sm leading-snug opacity-75">Scan with your iPhone camera</span>
    </div>
  );
}

/** Drawn to match the store badges: same height, corner radius and fill. */
function WebAppBadge({ height }: { height: number }) {
  const scale = height / 70;
  return (
    <a
      href={WEB_APP_URL}
      className="inline-flex w-fit items-center text-white hover:opacity-90 transition-opacity"
      style={{
        height,
        gap: 12 * scale,
        paddingLeft: 18 * scale,
        paddingRight: 24 * scale,
        borderRadius: 10 * scale,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      }}
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: 34 * scale, height: 34 * scale }}
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      <span className="flex flex-col leading-none">
        <span style={{ fontSize: 12 * scale }}>Use it on the</span>
        <span className="font-medium" style={{ fontSize: 27 * scale, marginTop: 3 * scale }}>
          Web
        </span>
      </span>
    </a>
  );
}
