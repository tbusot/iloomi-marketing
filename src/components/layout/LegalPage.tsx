import type { ReactNode } from 'react';

interface LegalPageProps {
  title: string;
  lastModified: string;
  children: ReactNode;
}

export function LegalPage({ title, lastModified, children }: LegalPageProps) {
  return (
    <div className="min-h-screen bg-off-white pt-24">
      <article className="mx-auto max-w-3xl px-6 py-16">
        <header className="mb-12">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-dark-green mb-4">
            {title}
          </h1>
          <p className="text-dark-green/60">Last Modified: {lastModified}</p>
        </header>

        <div className="font-book text-lg leading-relaxed text-dark-green/80 [&_h2]:font-serif [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-dark-green [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:font-sans [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-dark-green [&_h3]:mt-8 [&_h3]:mb-2 [&_p]:mb-4">
          {children}
        </div>
      </article>
    </div>
  );
}
