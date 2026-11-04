import Link from 'next/link';

interface Plan {
  name: string;
  /** Free is grey, Pro is purple. */
  pro: boolean;
  price: string;
  per?: string;
  note: string;
  badge?: string;
  features: string[];
  cta: string;
  /** The plan we steer people to: outlined card, filled button. */
  featured?: boolean;
}

const plans: Plan[] = [
  {
    name: 'Free',
    pro: false,
    price: '$0',
    note: 'No card needed',
    features: [
      'Your first two stories',
      '10 minutes of talking with Iloomi',
      'Type as much as you like',
      'Your Circle of people and places',
      'Invite family to read and add',
    ],
    cta: 'Start your first story',
  },
  {
    name: 'Pro monthly',
    pro: true,
    price: '$9.99',
    per: '/ month',
    note: 'Cancel anytime',
    features: [
      'Every story you want to tell',
      'Talk with Iloomi as much as you like',
      'Chapters, to shape them into a book',
      'Everything in Free',
    ],
    cta: 'Get the app',
  },
  {
    name: 'Pro yearly',
    pro: true,
    price: '$79.99',
    per: '/ year',
    note: 'About $6.67 a month. First 7 days free.',
    badge: 'Save 33%',
    features: ['Everything in Pro monthly', 'Try it free for a week'],
    cta: 'Start your free week',
    featured: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="px-6 pt-8 pb-26">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-12 text-center">
          <p className="mb-3.5 text-[13px] font-bold uppercase tracking-[0.14em] text-marine-teal">
            Pricing
          </p>
          <h2 className="mx-auto max-w-[820px] font-serif text-4xl leading-[1.05] text-ink md:text-[60px]">
            Start free.
            <br />
            <em className="font-normal text-dark-green">Keep every story with Pro.</em>
          </h2>
          <p className="mx-auto mt-5.5 max-w-[580px] text-lg leading-relaxed text-muted md:text-[19px]">
            Tell your first two stories free. Pro is for when you want to keep going.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col gap-5.5 rounded-md bg-white p-9 ${
                plan.featured
                  ? 'shadow-[0_30px_80px_rgba(13,77,64,0.18)] outline-2 outline-dark-green'
                  : 'shadow-[0_24px_60px_rgba(60,40,20,0.08)]'
              }`}
            >
              <div>
                {/* Fixed height, so the badge doesn't push one price lower than the others */}
                <div className="mb-2.5 flex h-7.5 items-center justify-between gap-3">
                  <h3
                    className={`text-xs font-bold uppercase tracking-[0.16em] ${
                      plan.pro ? 'text-purple' : 'text-taupe'
                    }`}
                  >
                    {plan.name}
                  </h3>
                  {plan.badge && (
                    <span className="rounded-full bg-mint px-3 py-1.5 text-[13px] text-dark-green">
                      {plan.badge}
                    </span>
                  )}
                </div>
                <p className="font-sans text-5xl leading-none font-semibold tracking-tight text-ink">
                  {plan.price}
                  {plan.per && (
                    <span className="text-base font-normal tracking-normal text-muted"> {plan.per}</span>
                  )}
                </p>
                <p className="mt-2.5 text-[15px] text-muted">{plan.note}</p>
              </div>

              <ul className="flex flex-col gap-3 font-book text-lg leading-snug text-ink">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span aria-hidden="true" className="text-marine-teal">
                      •
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/#begin"
                className={`mt-auto inline-flex min-h-[52px] items-center justify-center rounded-full text-[17px] font-semibold transition-colors ${
                  plan.featured
                    ? 'bg-dark-green text-white hover:bg-dark-green/90'
                    : 'border-[1.5px] border-dark-green text-dark-green hover:bg-dark-green/5'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
