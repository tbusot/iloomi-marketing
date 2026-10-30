import { StoreBadges } from '@/components/ui/StoreBadges';

const starters = [
  { title: 'Mom’s, while you can ask', body: 'Tell what you remember, then invite her to add her side.' },
  { title: 'Her first steps', body: 'Tonight, while you still know what she was wearing.' },
  { title: 'The night you met', body: '“Where were you, and what was playing?”' },
  { title: 'Your own', body: '“Where did you grow up, and what did it sound like?”' },
];

export function StartStory() {
  return (
    <section id="begin" className="bg-dark-green px-6 pt-24 pb-28 text-off-white">
      <div className="mx-auto max-w-[1180px]">
        <h2 className="mb-3 font-serif text-4xl leading-[1.05] md:text-[56px]">
          Whose story will you start?
        </h2>
        <p className="mb-10 text-lg text-[#cfe7e1]">Pick one. Iloomi will ask the first question.</p>

        <ul className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
          {starters.map((starter) => (
            <li
              key={starter.title}
              className="rounded-[22px] border border-white/14 bg-white/8 p-6.5"
            >
              <p className="mb-2 font-serif text-[26px] leading-tight">{starter.title}</p>
              <p className="text-[15px] text-[#cfe7e1]">{starter.body}</p>
            </li>
          ))}
        </ul>

        <StoreBadges className="mt-12" />
      </div>
    </section>
  );
}
