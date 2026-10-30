interface Turn {
  speaker: 'iloomi' | 'walt';
  text: string;
  /** A small note under the line, e.g. that Iloomi remembered it. */
  note?: string;
}

const turns: Turn[] = [
  {
    speaker: 'iloomi',
    text: 'You mentioned Karen came early, right in the middle of that blizzard. What do you remember about that night?',
    note: 'Remembered from an earlier story',
  },
  { speaker: 'walt', text: 'January of ninety-five! Twenty below, and our pickup wouldn’t start.' },
  { speaker: 'iloomi', text: 'Twenty below, and no truck. So how’d you get to the hospital?' },
  {
    speaker: 'walt',
    text: 'Our neighbor Lyle showed up in the county snowplow! Margaret rode up front, and I rode on the sander.',
  },
];

interface BackAndForthProps {
  /** Audio of the conversation. The button only shows once there's a recording. */
  audioSrc?: string;
}

export function BackAndForth({ audioSrc }: BackAndForthProps) {
  return (
    <section id="hear" className="px-6 pt-18 pb-24">
      <div className="mx-auto flex max-w-[1180px] flex-wrap gap-14">
        <div className="min-w-0 flex-[0_1_360px]">
          <p className="mb-3.5 text-[13px] font-bold uppercase tracking-[0.14em] text-marine-teal">
            A real back-and-forth
          </p>
          <h2 className="mb-4 font-serif text-4xl leading-[1.1] text-ink md:text-[46px]">
            It picks up where you left off.
          </h2>
          <p className="mb-7 text-lg leading-relaxed text-muted">
            Just talk, like you would with a friend. Last week Walt mentioned his daughter
            came early, in a blizzard. Today Iloomi asks about it.
          </p>
          {audioSrc && (
            <audio controls src={audioSrc} className="mb-3.5 w-full max-w-[360px]">
              <a href={audioSrc}>Hear the conversation</a>
            </audio>
          )}
          <p className="text-[13px] text-taupe">Dramatization. Walt is fictional.</p>
        </div>

        <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-5.5 rounded-md bg-white p-7 shadow-[0_30px_80px_rgba(60,40,20,0.12)] md:px-12 md:py-11">
          {turns.map((turn) =>
            turn.speaker === 'iloomi' ? (
              <div key={turn.text}>
                <p className="mb-1.5 text-xs font-bold tracking-[0.14em] text-purple">ILOOMI</p>
                <p className="font-serif text-[22px] leading-[1.3] text-ink md:text-[26px]">{turn.text}</p>
                {turn.note && (
                  <p className="mt-2.5 inline-block rounded-full bg-off-white px-3 py-1.5 text-[13px] text-muted">
                    {turn.note}
                  </p>
                )}
              </div>
            ) : (
              <div key={turn.text} className="max-w-[460px] self-end rounded-[18px] bg-off-white px-5 py-4.5">
                <p className="mb-1.5 text-xs font-bold tracking-[0.14em] text-dark-green">WALT</p>
                <p className="font-book text-lg leading-normal text-ink md:text-[19px]">{turn.text}</p>
              </div>
            ),
          )}

          {/* What Iloomi picked up from the conversation */}
          <div className="flex flex-wrap justify-end gap-2 self-end">
            <span className="rounded-full bg-mint px-3.5 py-2 text-[13px] text-dark-green">
              Lyle, your neighbor · added to your Circle
            </span>
            <span className="rounded-full border border-dashed border-[#b9b0a3] px-3.5 py-2 text-[13px] text-muted">
              The county snowplow · add to your Circle?
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
