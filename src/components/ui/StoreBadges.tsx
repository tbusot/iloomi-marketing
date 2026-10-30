import Image from 'next/image';

export const APP_STORE_URL = 'https://apps.apple.com/us/app/iloomi/id6467228839';
export const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.iloomi.app.prod';

interface StoreBadgesProps {
  /** Badge height in px. */
  height?: number;
  className?: string;
}

export function StoreBadges({ height = 52, className = '' }: StoreBadgesProps) {
  const width = Math.round((height * 140) / 42);
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="inline-block w-fit">
        <Image
          src="/images/app-store-button.svg"
          alt="Download on the App Store"
          width={width}
          height={height}
          style={{ height, width: 'auto' }}
        />
      </a>
      <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" className="inline-block w-fit">
        <Image
          src="/images/google-play-button.svg"
          alt="Get it on Google Play"
          width={width}
          height={height}
          style={{ height, width: 'auto' }}
        />
      </a>
    </div>
  );
}
