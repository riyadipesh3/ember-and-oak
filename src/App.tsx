import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'

/* Shared primitives. Scroll reveal uses IntersectionObserver, never a scroll
   listener, and collapses to fully visible under prefers-reduced-motion. */
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* Section headings stack vertically, never a split-header. The kicker is the
   page's entire micro-label budget: 2 labels across 6 sections. */
function SectionHead({
  kicker,
  title,
  body,
}: {
  kicker?: string
  title: string
  body?: string
}) {
  return (
    <div className="max-w-2xl">
      {kicker ? <p className="micro mb-5">{kicker}</p> : null}
      <h2 className="display display-lg">{title}</h2>
      {body ? <p className="lede mt-6">{body}</p> : null}
    </div>
  )
}

const usd = (n: string) => `$${n}`

const MENU: { group: string; note?: string; dishes: { name: string; desc: string; price: string }[] }[] = [
  {
    group: 'To begin',
    dishes: [
      {
        name: 'Wood-fired flatbreads',
        desc: 'Cultured butter, flaky salt, the ashes brushed over the top.',
        price: '12',
      },
      {
        name: 'Coal-roasted carrots',
        desc: 'Whipped ricotta, marjoram, a spoon of the roasting fat.',
        price: '14',
      },
      {
        name: 'Ember leeks',
        desc: 'Hazelnut romesco, sheep milk yogurt, lemon zest.',
        price: '16',
      },
      {
        name: 'Smoked pork riblet',
        desc: 'Cider glaze, mustard greens, crackling left soft.',
        price: '19',
      },
    ],
  },
  {
    group: 'Over the fire',
    dishes: [
      {
        name: 'Ember-roasted chicken',
        desc: 'Bread salad, pan drippings, a great deal of black pepper.',
        price: '26',
      },
      {
        name: 'Dry-aged duck breast',
        desc: 'Quince, bitter leaves, scored skin, pink in the middle.',
        price: '38',
      },
      {
        name: 'Whole plaice',
        desc: 'Brown butter, capers, brown shrimp, lemon.',
        price: '34',
      },
      {
        name: 'Bavette steak',
        desc: 'Charred onion, bone marrow butter, watercress.',
        price: '42',
      },
    ],
  },
  {
    group: 'Sides',
    dishes: [
      {
        name: 'Charred hispi cabbage',
        desc: 'Bacon, cider vinegar, a spoon of cream.',
        price: '15',
      },
      {
        name: 'Potatoes',
        desc: 'Cultured cream, burnt onion oil, plenty of salt.',
        price: '12',
      },
      {
        name: 'Winter leaf salad',
        desc: 'Mustard dressing, a few toasted hazelnuts.',
        price: '13',
      },
      {
        name: 'Grilled bread',
        desc: 'Anchovy, olive oil, cut thick.',
        price: '14',
      },
    ],
  },
  {
    group: 'Dessert',
    dishes: [
      {
        name: 'Basque cheesecake',
        desc: 'PX sherry, sea salt, burnt sugar at the edges.',
        price: '15',
      },
      {
        name: 'Grilled peaches',
        desc: 'Oat cream, honey from our own hives.',
        price: '13',
      },
      {
        name: 'Olive oil cake',
        desc: 'Apricot, cultured cream, no frosting.',
        price: '14',
      },
    ],
  },
]

const GALLERY = [
  {
    seed: 'ember-oak-timber-counter-cup',
    w: 1200,
    h: 1200,
    ratio: 'aspect-square',
    alt: 'Reclaimed oak boards forming the counter surface, lit from one side',
  },
  {
    seed: 'ember-oak-brick-warm',
    w: 1000,
    h: 1250,
    ratio: 'aspect-4/5',
    alt: 'Warm light on the brick behind the bar late in the evening',
  },
  {
    seed: 'ember-oak-timber-steam-dark',
    w: 1200,
    h: 1500,
    ratio: 'aspect-4/5',
    alt: 'Steam rising off the pass in the low light before service',
  },
  {
    seed: 'ember-oak-window-shadow',
    w: 1000,
    h: 1333,
    ratio: 'aspect-3/4',
    alt: 'The weathered double door of the old workshop, opening onto the street',
  },
  {
    seed: 'ember-oak-hearth-flame-glow',
    w: 1200,
    h: 900,
    ratio: 'aspect-4/3',
    alt: 'Pears, bread and a board laid out on a dark table',
  },
  {
    seed: 'ember-oak-counter-dark',
    w: 1100,
    h: 1100,
    ratio: 'aspect-square',
    alt: 'The street outside after dark, strung with lights above the tables',
  },
]

const HOURS = [
  {
    q: 'Mondays',
    a: 'Closed. The fire rests and the ash pit gets dug out on Tuesday morning.',
  },
  {
    q: 'Tuesday to Thursday',
    a: 'Dinner from 5:30 pm to 9:30 pm. The hearth is lit at 3 pm, so the room smells like oak from three oclock.',
  },
  {
    q: 'Friday and Saturday',
    a: 'Two seatings, 5:30 pm and 8:15 pm. The full menu runs at both, and the counter fills first.',
  },
  {
    q: 'Sunday',
    a: 'One seating at 5:00 pm. We do not do Sunday lunch.',
  },
]

const SEATINGS = ['5:30 pm', '6:15 pm', '7:00 pm', '7:45 pm', '8:30 pm']
const PARTIES = ['2', '3', '4', '5', '6', '7', '8']

const NAV = ['Menu', 'Hearth', 'Gallery', 'Reservations', 'Find us']
const ANCHORS: Record<string, string> = {
  Menu: 'menu',
  Hearth: 'hearth',
  Gallery: 'gallery',
  Reservations: 'reservations',
  'Find us': 'find-us',
}

type Booking = { date: string; time: string; party: string; name: string; email: string }
type Field = keyof Booking
type Errors = Partial<Record<Field, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isoDay(offset = 0) {
  const d = new Date()
  d.setDate(d.getDate() + offset)
  return d.toISOString().slice(0, 10)
}

export default function App() {
  const [navOpen, setNavOpen] = useState(false)
  const [booking, setBooking] = useState<Booking>({
    date: '',
    time: '',
    party: '',
    name: '',
    email: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'confirmed'>('idle')
  const timer = useRef<number | undefined>(undefined)

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current)
    },
    [],
  )

  const setField = (field: Field, value: string) => {
    setBooking((b) => ({ ...b, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const today = isoDay()
    const next: Errors = {}

    if (!booking.date) next.date = 'Pick a date.'
    else if (booking.date < today) next.date = 'That date has passed. Choose today or later.'
    if (!booking.time) next.time = 'Pick a seating.'
    if (!booking.party) next.party = 'Pick a party size.'
    if (booking.name.trim().length < 2) next.name = 'Add the name for the booking.'
    if (!EMAIL_RE.test(booking.email)) next.email = 'Add an email for the confirmation.'

    setErrors(next)
    if (Object.keys(next).length > 0) {
      setStatus('idle')
      return
    }

    setStatus('sending')
    timer.current = window.setTimeout(() => setStatus('confirmed'), 900)
  }

  const resetBooking = () => {
    setBooking({ date: '', time: '', party: '', name: '', email: '' })
    setErrors({})
    setStatus('idle')
  }

  const confirmedDate = booking.date
    ? new Date(`${booking.date}T00:00:00`).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      })
    : ''

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[var(--color-ink)] focus:px-4 focus:py-2 focus:text-[var(--color-canvas)]"
      >
        Skip to content
      </a>

      {/* ---------------------------------------------------------------- */}
      {/* NAV - single line at desktop, 72px                               */}
      {/* ---------------------------------------------------------------- */}
      <header className="sticky top-0 z-40 border-b border-[var(--color-hairline)] bg-[var(--color-canvas)]/92 backdrop-blur-sm">
        <div className="shell flex h-[72px] items-center justify-between">
          <a
            href="#top"
            className="font-display text-[1.0625rem] font-bold tracking-[-0.03em] text-[var(--color-ink)]"
          >
            Ember and Oak
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((item) => (
              <a
                key={item}
                href={`#${ANCHORS[item]}`}
                className="text-[0.875rem] font-medium text-[var(--color-body)] transition-colors hover:text-[var(--color-ink)]"
              >
                {item}
              </a>
            ))}
          </nav>

          <a href="#reservations" className="btn btn-primary hidden md:inline-flex">
            Book a table
          </a>

          <button
            type="button"
            aria-label={navOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={navOpen}
            aria-controls="mobile-nav"
            onClick={() => setNavOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center border border-[var(--color-hairline)] text-[var(--color-ink)] md:hidden"
          >
            <span className="flex w-4 flex-col gap-[4px]">
              <span
                className={`h-px w-full bg-[var(--color-ink)] transition-transform duration-200 ${
                  navOpen ? 'translate-y-[2.5px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-px w-full bg-[var(--color-ink)] transition-transform duration-200 ${
                  navOpen ? '-translate-y-[2.5px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>

        {navOpen ? (
          <div id="mobile-nav" className="border-t border-[var(--color-hairline)] md:hidden">
            <nav className="shell flex flex-col py-4">
              {NAV.map((item) => (
                <a
                  key={item}
                  href={`#${ANCHORS[item]}`}
                  onClick={() => setNavOpen(false)}
                  className="border-b border-[var(--color-hairline)] py-3.5 text-[1rem] font-medium text-[var(--color-ink)] last:border-b-0"
                >
                  {item}
                </a>
              ))}
              <a
                href="#reservations"
                onClick={() => setNavOpen(false)}
                className="btn btn-primary mt-5 w-full"
              >
                Book a table
              </a>
            </nav>
          </div>
        ) : null}
      </header>

      <main id="main">
        {/* -------------------------------------------------------------- */}
        {/* HERO - full-bleed photograph, type over it. Fits the first       */}
        {/* viewport. Four text elements: eyebrow, headline, subtext, CTAs. */}
        {/* -------------------------------------------------------------- */}
        <section
          id="top"
          className="relative isolate flex min-h-[100dvh] flex-col justify-end overflow-hidden"
        >
          <img
            src="https://picsum.photos/seed/ember-oak-hearth-flame-glow/2000/1200"
            alt="Two yellow doors set into the red brick wall of the old workshop"
            loading="eager"
            width={2000}
            height={1200}
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-b from-[#16130f]/40 via-[#16130f]/72 to-[#16130f]/95"
          />

          <div className="shell w-full pb-14 md:pb-20">
            <p className="micro mb-6 text-[var(--color-body)]">Oak fired since 2016</p>
            <h1 className="display display-xl max-w-4xl">
              <span className="block">Everything here</span>
              <span className="block">touches fire.</span>
            </h1>
            <p className="mt-7 max-w-[46ch] text-[1.0625rem] leading-[1.6] text-[var(--color-ink)]/80">
              One hearth, oak logs, and a short menu that changes when the farm
              delivery is better than we planned for.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#reservations" className="btn btn-primary">
                Book a table
              </a>
              <a
                href="#menu"
                className="btn btn-secondary border-white/25 text-[var(--color-ink)] hover:border-[var(--color-ink)]"
              >
                Read the menu
              </a>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* MENU - two-column list, not a card grid. No row borders, no      */}
        {/* leader dots, prices pinned right in tabular figures.            */}
        {/* -------------------------------------------------------------- */}
        <section id="menu" className="border-t border-[var(--color-hairline)] py-20 md:py-28">
          <div className="shell">
            <Reveal>
              <SectionHead
                kicker="Dinner, Tuesday to Sunday"
                title="The menu changes with the fire"
                body="Fifteen dishes, written on the board each afternoon. Most of them come off the hearth, so allow twenty five minutes."
              />
            </Reveal>

            <div className="mt-14 grid gap-x-16 gap-y-14 lg:grid-cols-2">
              {MENU.map((group, gi) => (
                <Reveal key={group.group} delay={gi * 80}>
                  <div>
                    <div className="flex items-baseline justify-between gap-4 border-b border-[var(--color-hairline)] pb-3">
                      <h3 className="font-display text-[1.0625rem] font-bold tracking-[-0.015em] text-[var(--color-ink)]">
                        {group.group}
                      </h3>
                      {group.note ? (
                        <p className="text-[0.8125rem] text-[var(--color-mute)]">{group.note}</p>
                      ) : null}
                    </div>

                    {group.dishes.map((d) => (
                      <div key={d.name} className="dish">
                        <div>
                          <h4 className="font-display text-[1rem] font-semibold tracking-[-0.01em] text-[var(--color-ink)]">
                            {d.name}
                          </h4>
                          <p className="mt-1 max-w-[44ch] text-[0.9375rem] leading-[1.6] text-[var(--color-body)]">
                            {d.desc}
                          </p>
                        </div>
                        <span className="dish__price">{usd(d.price)}</span>
                      </div>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <p className="mt-12 max-w-[62ch] border-l-2 border-[var(--color-accent)] pl-5 text-[0.9375rem] leading-[1.65] text-[var(--color-body)]">
                Tell us about allergies when you book and the kitchen will work
                around them. A twenty five percent service charge goes to the
                floor, and we do not take a booking fee.
              </p>
            </Reveal>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* HEASTH / STORY - asymmetric split, text column pushed down,      */}
        {/* tall image column offset the other way. Layout family 3.        */}
        {/* -------------------------------------------------------------- */}
        <section id="hearth" className="bg-[var(--color-surface)] py-20 md:py-28">
          <div className="shell">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-7">
                <div className="lg:pt-10">
                  <h2 className="display display-lg max-w-[15ch]">
                    The fire has not gone out since 2016.
                  </h2>
                  <div className="mt-7 space-y-5">
                    <p className="lede">
                      Ines Cavalieri cooks over a 1.4 tonne oak hearth she built
                      with her brother Tomas in a former brick workshop on
                      Hatteras Street. The room seats 38, and 12 of those seats
                      face the fire with nothing between them and it.
                    </p>
                    <p className="lede">
                      We buy whole animals and ask the butcher to break them down
                      our way. Vegetables come from four farms inside forty
                      miles, which is most of why the board gets rewritten.
                    </p>
                  </div>

                  <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
                    {[
                      ['1.4 tonne', 'oak hearth'],
                      ['38', 'seats in the room'],
                      ['12', 'seats at the counter'],
                      ['4', 'farms inside 40 miles'],
                    ].map(([n, label]) => (
                      <div key={label}>
                        <dt className="font-display text-[1.5rem] font-bold tracking-[-0.03em] text-[var(--color-accent)]">
                          {n}
                        </dt>
                        <dd className="mt-1 text-[0.875rem] text-[var(--color-mute)]">{label}</dd>
                      </div>
                    ))}
                  </dl>

                  <figure className="mt-12 max-w-xl border-l-2 border-[var(--color-accent)] pl-5">
                    <blockquote className="font-display text-[1.25rem] font-medium leading-[1.32] tracking-[-0.02em] text-[var(--color-ink)]">
                      &ldquo;The oven decides the menu, not the other way
                      round.&rdquo;
                    </blockquote>
                    <figcaption className="mt-4 text-[0.875rem] text-[var(--color-mute)]">
                      Ines Cavalieri, chef and co-owner
                    </figcaption>
                  </figure>
                </div>
              </Reveal>

              <Reveal className="lg:col-span-5" delay={110}>
                <div className="frame aspect-4/5 w-full">
                  <img
                    src="https://picsum.photos/seed/ember-oak-tables-before-service/1100/1375"
                    alt="Two yellow doors set into the red brick wall of the old workshop"
                    loading="lazy"
                    width={1100}
                    height={1375}
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* GALLERY - offset masonry, CSS columns, every second tile dropped */}
        {/* on desktop. Layout family 4.                                   */}
        {/* -------------------------------------------------------------- */}
        <section id="gallery" className="py-20 md:py-28">
          <div className="shell">
            <Reveal>
              <SectionHead
                title="A room, a pass, and the plates that came off it"
                body="Photographs from a Thursday service, taken by the person who washes up."
              />
            </Reveal>

            <div className="masonry mt-14">
              {GALLERY.map((g, i) => (
                <Reveal key={g.seed} delay={i * 60}>
                  <figure className="frame w-full" style={{ boxShadow: 'var(--shadow)' }}>
                    <div className={g.ratio}>
                      <img
                        src={`https://picsum.photos/seed/${g.seed}/${g.w}/${g.h}`}
                        alt={g.alt}
                        loading="lazy"
                        width={g.w}
                        height={g.h}
                      />
                    </div>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* RESERVATIONS - inline booking strip plus a hours accordion.      */}
        {/* Layout family 5.                                              */}
        {/* -------------------------------------------------------------- */}
        <section
          id="reservations"
          className="border-y border-[var(--color-hairline)] bg-[var(--color-surface)] py-20 md:py-28"
        >
          <div className="shell">
            <Reveal>
              <SectionHead
                title="Take a table"
                body="Tables open thirty days out. We hold six for walk ins and give them back at 6:45 pm on busy nights."
              />
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-12 border border-[var(--color-hairline)] bg-[var(--color-raised)] p-5 md:p-7">
                {status === 'confirmed' ? (
                  <div aria-live="polite">
                    <p className="font-display text-[1.25rem] font-bold tracking-[-0.02em] text-[var(--color-ink)]">
                      Table held
                    </p>
                    <dl className="mt-5 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
                      {[
                        ['Name', booking.name],
                        ['Date', confirmedDate],
                        ['Seating', booking.time],
                        ['Party', `${booking.party} guests`],
                      ].map(([k, v]) => (
                        <div key={k}>
                          <dt className="text-[0.75rem] tracking-[0.1em] text-[var(--color-mute)] uppercase">
                            {k}
                          </dt>
                          <dd className="mt-1.5 text-[0.9375rem] text-[var(--color-ink)]">{v}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="mt-6 max-w-[58ch] text-[0.9375rem] leading-[1.65] text-[var(--color-body)]">
                      A confirmation is on its way to {booking.email}. Nothing is
                      charged until you eat. Cancel by phone and the table goes
                      back into the book.
                    </p>
                    <button type="button" onClick={resetBooking} className="btn btn-secondary mt-7">
                      Book another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submit} noValidate>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:gap-4">
                      {(
                        [
                          {
                            id: 'date',
                            label: 'Date',
                            span: 'lg:col-span-3',
                            hint: 'Thirty days out.',
                            node: (
                              <input
                                id="date"
                                name="date"
                                type="date"
                                min={isoDay()}
                                value={booking.date}
                                aria-invalid={Boolean(errors.date)}
                                aria-describedby={['date-hint', errors.date && 'date-error']
                                  .filter(Boolean)
                                  .join(' ')}
                                onChange={(e) => setField('date', e.target.value)}
                                className="field"
                              />
                            ),
                          },
                          {
                            id: 'time',
                            label: 'Seating',
                            span: 'lg:col-span-2',
                            hint: 'Two on Fridays and Saturdays.',
                            node: (
                              <select
                                id="time"
                                name="time"
                                value={booking.time}
                                aria-invalid={Boolean(errors.time)}
                                aria-describedby={['time-hint', errors.time && 'time-error']
                                  .filter(Boolean)
                                  .join(' ')}
                                onChange={(e) => setField('time', e.target.value)}
                                className="field"
                              >
                                <option value="">Seating</option>
                                {SEATINGS.map((s) => (
                                  <option key={s} value={s}>
                                    {s}
                                  </option>
                                ))}
                              </select>
                            ),
                          },
                          {
                            id: 'party',
                            label: 'Party',
                            span: 'lg:col-span-2',
                            hint: 'Nine or more, call the room.',
                            node: (
                              <select
                                id="party"
                                name="party"
                                value={booking.party}
                                aria-invalid={Boolean(errors.party)}
                                aria-describedby={['party-hint', errors.party && 'party-error']
                                  .filter(Boolean)
                                  .join(' ')}
                                onChange={(e) => setField('party', e.target.value)}
                                className="field"
                              >
                                <option value="">Guests</option>
                                {PARTIES.map((n) => (
                                  <option key={n} value={n}>
                                    {n} guests
                                  </option>
                                ))}
                              </select>
                            ),
                          },
                          {
                            id: 'name',
                            label: 'Name',
                            span: 'lg:col-span-3',
                            hint: 'The name the table goes under.',
                            node: (
                              <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                placeholder="Dana Whitfield"
                                value={booking.name}
                                aria-invalid={Boolean(errors.name)}
                                aria-describedby={['name-hint', errors.name && 'name-error']
                                  .filter(Boolean)
                                  .join(' ')}
                                onChange={(e) => setField('name', e.target.value)}
                                className="field"
                              />
                            ),
                          },
                          {
                            id: 'email',
                            label: 'Email',
                            span: 'lg:col-span-2',
                            hint: 'For the confirmation only.',
                            node: (
                              <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder="dana@example.com"
                                value={booking.email}
                                aria-invalid={Boolean(errors.email)}
                                aria-describedby={['email-hint', errors.email && 'email-error']
                                  .filter(Boolean)
                                  .join(' ')}
                                onChange={(e) => setField('email', e.target.value)}
                                className="field"
                              />
                            ),
                          },
                        ] as const
                      ).map((f) => (
                        <div key={f.id} className={`grid content-start gap-2 sm:col-span-1 ${f.span}`}>
                          <label
                            htmlFor={f.id}
                            className="text-[0.8125rem] font-semibold text-[var(--color-ink)]"
                          >
                            {f.label}
                          </label>
                          {f.node}
                          {errors[f.id as Field] ? (
                            <p id={`${f.id}-error`} className="text-[0.8125rem] text-[var(--color-accent)]">
                              {errors[f.id as Field]}
                            </p>
                          ) : (
                            <p id={`${f.id}-hint`} className="text-[0.8125rem] text-[var(--color-mute)]">
                              {f.hint}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-7 flex flex-wrap items-center gap-4">
                      {status === 'sending' ? (
                        <>
                          <span
                            aria-hidden="true"
                            className="inline-block h-[46px] w-[172px] animate-pulse bg-[var(--color-hairline)]"
                          />
                          <span className="text-[0.875rem] text-[var(--color-mute)]">
                            Holding the table with the floor
                          </span>
                        </>
                      ) : (
                        <>
                          <button type="submit" className="btn btn-primary">
                            Hold this table
                          </button>
                          <p className="text-[0.875rem] text-[var(--color-mute)]">
                            Replies by email within the hour, Tuesday to Sunday.
                          </p>
                        </>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </Reveal>

            <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-7" delay={60}>
                <div id="hours">
                  <h3 className="display display-md">Hours</h3>
                  <div className="mt-4">
                    {HOURS.map((h) => (
                      <details key={h.q} className="acc border-b border-[var(--color-hairline)]">
                        <summary className="acc__summary">
                          <span className="font-display text-[1.0625rem] font-semibold tracking-[-0.015em] text-[var(--color-ink)]">
                            {h.q}
                          </span>
                          <span className="acc__sign" aria-hidden="true" />
                        </summary>
                        <p className="max-w-[56ch] pb-5 text-[0.9375rem] leading-[1.65] text-[var(--color-body)]">
                          {h.a}
                        </p>
                      </details>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal className="lg:col-span-5" delay={130}>
                <div className="lg:pt-2">
                  <h3 className="display display-md">Before you come</h3>
                  <dl className="mt-6 space-y-6">
                    {[
                      ['Groups of nine or more', 'Call the room on 828 555 0147. We take over the whole back room on Wednesdays.'],
                      ['Dogs', 'Well behaved ones are fine in the room. There is water by the door and a hook for the lead.'],
                      ['Access', 'Two steps up from Hatteras Street, then a flat run to every table. Tell us when you book and we will put you nearest the door.'],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-[0.9375rem] font-semibold text-[var(--color-ink)]">{k}</dt>
                        <dd className="mt-2 max-w-[46ch] text-[0.9375rem] leading-[1.65] text-[var(--color-body)]">
                          {v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* FIND US - one full-width closing band. Layout family 6.         */}
        {/* -------------------------------------------------------------- */}
        <section id="find-us" className="relative isolate overflow-hidden">
          <img
            src="https://picsum.photos/seed/ember-oak-embers-at-dusk/2000/900"
            alt="The last of the light on the cloud bank behind the building"
            loading="lazy"
            width={2000}
            height={900}
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[#16130f]/86"
          />

          <div className="shell grid gap-12 py-20 lg:grid-cols-12 lg:gap-16 md:py-28">
            <Reveal className="lg:col-span-7">
              <div className="lg:pt-4">
                <h2 className="display display-lg max-w-[16ch]">
                  Find us at the end of Hatteras Street
                </h2>
                <p className="mt-6 max-w-[46ch] text-[1rem] leading-[1.65] text-[var(--color-body)]">
                  The door is the old workshop one. Push hard on the left, ring
                  once if the room is loud, and someone will get you a chair.
                </p>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-5" delay={110}>
              <div className="border border-[var(--color-hairline)] bg-[var(--color-surface)] p-6 md:p-8">
                <dl className="space-y-6">
                  {[
                    ['Address', '412 Hatteras Street, Asheville, North Carolina 28801'],
                    ['Phone', '828 555 0147'],
                    ['Email', 'eat@emberandoak.com'],
                    ['Getting here', 'Street parking after 6 pm. The lot behind the workshop is staff only, unless you call from the bar and ask nicely.'],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-[0.75rem] tracking-[0.1em] text-[var(--color-mute)] uppercase">
                        {k}
                      </dt>
                      <dd className="mt-1.5 text-[0.9375rem] leading-[1.6] text-[var(--color-ink)]">{v}</dd>
                    </div>
                  ))}
                </dl>
                <a href="#reservations" className="btn btn-primary mt-8">
                  Book a table
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ---------------------------------------------------------------- */}
      {/* FOOTER                                                          */}
      {/* ---------------------------------------------------------------- */}
      <footer className="border-t border-[var(--color-hairline)] py-12">
        <div className="shell">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="font-display text-[1.0625rem] font-bold tracking-[-0.03em] text-[var(--color-ink)]">
                Ember and Oak
              </p>
              <p className="mt-2 max-w-[34ch] text-[0.875rem] leading-[1.6] text-[var(--color-mute)]">
                A wood-fired room on Hatteras Street. Dinner Tuesday to Sunday.
                Closed Mondays.
              </p>
            </div>

            <nav className="flex flex-wrap gap-x-7 gap-y-2">
              {NAV.map((item) => (
                <a
                  key={item}
                  href={`#${ANCHORS[item]}`}
                  className="text-[0.875rem] text-[var(--color-mute)] transition-colors hover:text-[var(--color-ink)]"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          <p className="mt-10 border-t border-[var(--color-hairline)] pt-6 text-[0.8125rem] text-[var(--color-mute)]">
            Prices and the board change with the fire. A fictional template, so
            nothing here takes a booking.
          </p>
        </div>
      </footer>
    </>
  )
}
