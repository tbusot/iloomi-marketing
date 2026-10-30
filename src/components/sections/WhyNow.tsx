const details = [
  { text: 'Three wobbly steps across the blue rug', className: '' },
  { text: 'The yellow striped onesie', className: 'opacity-[0.66]' },
  { text: 'Grandpa on his knees, clapping', className: 'opacity-[0.38] blur-[0.6px]' },
  { text: 'A Sunday, right before dinner', className: 'opacity-[0.18] blur-[1.4px]' },
];

export function WhyNow() {
  return (
    <section id="why-now" className="px-6 pt-20 pb-16 md:pt-26 md:pb-20">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-start gap-14">
        <div className="min-w-0 flex-[1_1_520px]">
          <p className="mb-3.5 text-[13px] font-bold uppercase tracking-[0.14em] text-marine-teal">
            Why now
          </p>
          <h2 className="mb-4.5 font-serif text-4xl leading-[1.08] text-ink md:text-[52px]">
            You’ll remember that it happened.
            <br />
            <em className="font-normal text-dark-green">You’ll forget what made it yours.</em>
          </h2>
          <p className="max-w-[560px] text-lg leading-relaxed text-muted md:text-[19px]">
            The feeling stays. The details go first. And some of the people who could fill
            them in won’t always be here to ask.
          </p>
        </div>

        {/* The details of one moment, fading the way memories do */}
        <div className="min-w-0 flex-[0_1_420px] rounded-md bg-white px-10 py-9 shadow-[0_24px_60px_rgba(60,40,20,0.1)]">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-taupe">
            Her first steps
          </p>
          <ul className="flex flex-col gap-2.5 font-book text-[21px] leading-normal text-ink">
            {details.map((detail) => (
              <li key={detail.text} className={detail.className}>
                {detail.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
