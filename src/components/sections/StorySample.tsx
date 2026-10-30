const paragraphs = [
  'Karen decided to arrive on the coldest night of January 1995, in the middle of a blizzard, three weeks early. Our pickup wouldn’t start.',
  'I was out in my boots, panicking, when our neighbor Lyle came rumbling up the road in the county snowplow. He’d seen our porch light on at two in the morning.',
  'So Margaret rode to the hospital in the cab of a snowplow, and I rode in the back on the sander. Karen was born at 6:14 a.m., and when the nurse put her in my arms, she wrapped her whole hand around my finger.',
  'Lyle came by the next day with a pink balloon tied to the plow blade. We gave Karen the middle name Lyla, after him.',
];

const notes = [
  { title: 'Walt said it out loud.', body: 'He talked it through with Iloomi. No typing.' },
  { title: 'Iloomi remembered the blizzard.', body: 'He’d mentioned it the week before. Iloomi picked the thread back up.' },
  { title: 'It asked about Lyle.', body: '“So how’d you get to the hospital?” is how the snowplow came out.' },
  { title: 'Lyle and Margaret joined his Circle.', body: 'Now every story they’re in is one tap away.' },
  { title: 'Karen added a line.', body: 'He invited her. She read it on the web, and added what she remembers.' },
];

interface StorySampleProps {
  /** Narration of the story. The player only shows once there's a recording. */
  audioSrc?: string;
}

export function StorySample({ audioSrc }: StorySampleProps) {
  return (
    <section id="story" className="px-6 pb-26">
      <div className="mx-auto flex max-w-[1180px] flex-wrap gap-14">
        <article className="min-w-0 flex-[1_1_560px] rounded-md bg-white px-7 py-12 shadow-[0_30px_80px_rgba(60,40,20,0.12)] md:px-16 md:pt-16 md:pb-18">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-taupe">
            Raising Karen &amp; Danny · Chapter 1
          </p>
          <h2 className="mb-1.5 font-serif text-4xl leading-[1.1] text-ink md:text-[44px]">
            The Night Karen Arrived
          </h2>
          <p className="mb-9 text-sm text-taupe">by Walt, as told to Iloomi</p>
          <div className="flex flex-col gap-5.5 font-book text-lg leading-[1.75] text-[#2a2520] md:text-xl">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-9 text-[13px] text-taupe">Dramatization. Walt is fictional.</p>
        </article>

        <aside aria-label="How this story was made" className="flex min-w-0 flex-[0_1_340px] flex-col gap-4.5 md:pt-10">
          <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-marine-teal">
            How this page got written
          </p>
          <ol className="flex flex-col gap-4.5">
            {notes.map((note, index) => (
              <li key={note.title} className="flex items-start gap-3.5">
                <span
                  aria-hidden="true"
                  className="flex h-7.5 w-7.5 flex-none items-center justify-center rounded-full bg-dark-green text-[13px] font-bold text-off-white"
                >
                  {index + 1}
                </span>
                <div>
                  <p className="mb-1 font-semibold text-ink">{note.title}</p>
                  <p className="text-[15px] leading-normal text-muted">{note.body}</p>
                </div>
              </li>
            ))}
          </ol>
          {audioSrc && (
            <div className="mt-2">
              <p className="mb-2 text-sm font-semibold text-ink">Listen to Walt’s story</p>
              <audio controls src={audioSrc} className="w-full">
                <a href={audioSrc}>Listen to Walt’s story</a>
              </audio>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
