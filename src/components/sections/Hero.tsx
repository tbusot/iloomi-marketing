import Image from 'next/image';
import Link from 'next/link';
import { HeroVideo } from './HeroVideo';

export function Hero() {
  return (
    <>
      <section className="relative overflow-hidden bg-umber pb-[120px] text-off-white md:pb-[300px]">
        <Image
          src="/images/photo-album.webp"
          alt=""
          fill
          className="object-cover opacity-[0.32]"
          priority
        />

        <div className="relative mx-auto max-w-[1180px] px-6 pt-32 pb-16 text-center md:pt-40 md:pb-28">
          <h1 className="fade-up text-balance font-serif text-[40px] font-bold leading-[1.04] md:text-6xl lg:text-[68px]">
            Some moments only happen once.
            <br />
            <em className="font-normal text-sand">Keep the details before they fade.</em>
          </h1>

          <p className="fade-up mx-auto mt-6 max-w-[600px] text-[17px] leading-relaxed text-[#ece5da] [animation-delay:120ms] md:text-[19px]">
            Iloomi helps you get it all down tonight, just by talking, and turns it into a
            story your family keeps forever.
          </p>
        </div>
      </section>

      <HeroVideo />

      <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-3 px-5 pt-7 text-center sm:flex-row sm:justify-center sm:gap-6 sm:pt-8">
        <Link
          href="/#begin"
          className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-dark-green px-6.5 text-[17px] font-semibold text-white transition-colors hover:bg-dark-green/90 sm:w-auto"
        >
          Start your first story
        </Link>
        <span className="text-[15px] text-muted">
          Your first two stories are free. iPhone, Android and the web.
        </span>
      </div>
    </>
  );
}
