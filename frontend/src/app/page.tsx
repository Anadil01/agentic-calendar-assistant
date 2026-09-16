import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Check,
  Clock3,
  Command,
  Menu,
  MessageSquareText,
  Play,
  Sparkles,
  WandSparkles,
  X,
} from "lucide-react";

const features = [
  {
    icon: MessageSquareText,
    title: "Talk naturally",
    description:
      "Ask for meetings, schedules, availability, or changes using plain language.",
  },
  {
    icon: Calendar,
    title: "Work with your calendar",
    description:
      "Connect Google Calendar and let your assistant work with your real schedule.",
  },
  {
    icon: Clock3,
    title: "Find time automatically",
    description:
      "Ask for a free slot and the assistant checks your calendar for availability.",
  },
  {
    icon: WandSparkles,
    title: "Take action",
    description:
      "Create and reschedule meetings while keeping important destructive actions behind approval.",
  },
];

const steps = [
  {
    number: "01",
    title: "Connect your calendar",
    description:
      "Securely connect your Google Calendar and give the assistant access to your schedule.",
  },
  {
    number: "02",
    title: "Tell it what you need",
    description:
      'Say things like "Find a free 30-minute slot tomorrow morning."',
  },
  {
    number: "03",
    title: "Let the agent handle it",
    description:
      "The assistant checks your calendar, plans the action, and executes supported tasks.",
  },
];

const examples = [
  "What's on my calendar today?",
  "Find a free 30-minute slot tomorrow morning.",
  "Create a meeting with the team at 10 AM.",
  "Reschedule my afternoon meeting to 4 PM.",
];

export default function Home() {
  return (
    <main className="min-h-svh overflow-x-hidden bg-background text-foreground">
      {/* =========================================================
          NAVBAR
          ========================================================= */}

      <Navbar />

      {/* =========================================================
          HERO
          ========================================================= */}

      <section className="relative overflow-hidden">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-12rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-cyan-200/35 blur-3xl" />

          <div className="absolute left-[-12rem] top-[18rem] h-[28rem] w-[28rem] rounded-full bg-sky-200/25 blur-3xl" />

          <div className="absolute right-[-10rem] top-[24rem] h-[26rem] w-[26rem] rounded-full bg-teal-200/20 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-28">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/80 px-3.5 py-2 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur sm:text-sm">
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Sparkles className="size-3" />
              </span>

              Your calendar, with an AI agent
            </div>

            {/* Heading */}
            <h1 className="font-heading text-4xl font-semibold tracking-[-0.04em] sm:text-6xl sm:leading-[1.05] lg:text-7xl">
              Your calendar,
              <br />

              <span className="bg-gradient-to-r from-primary via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                without the busywork.
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:mt-7 sm:text-lg sm:leading-8">
              Meet Agent is an AI-powered calendar assistant that
              understands what you want, checks your schedule, and
              helps you get meetings done.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Link
                href="/sign-in"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                Start using Meeting Assistant

                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <a
                href="#how-it-works"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card/70 px-6 text-sm font-semibold backdrop-blur transition-colors hover:bg-muted"
              >
                <Play className="size-4 fill-current" />

                See how it works
              </a>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Connect Google Calendar · Ask naturally · Stay in control
            </p>
          </div>

          {/* =====================================================
              PRODUCT PREVIEW
              ===================================================== */}

          <div className="relative mx-auto mt-16 max-w-5xl sm:mt-20">
            {/* Floating cards */}

            <div className="absolute -left-5 top-16 z-10 hidden -rotate-3 rounded-2xl border border-border/80 bg-card/90 p-4 shadow-xl backdrop-blur md:block lg:-left-16">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Clock3 className="size-4" />
                </div>

                <div>
                  <p className="text-xs font-semibold">
                    Free time found
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Tomorrow · 10:00 AM
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -right-5 top-24 z-10 hidden rotate-3 rounded-2xl border border-border/80 bg-card/90 p-4 shadow-xl backdrop-blur md:block lg:-right-16">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Check className="size-4" />
                </div>

                <div>
                  <p className="text-xs font-semibold">
                    Calendar connected
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Google Calendar
                  </p>
                </div>
              </div>
            </div>

            {/* Browser window */}
            <div className="overflow-hidden rounded-2xl border border-primary/15 bg-card shadow-2xl shadow-primary/10 sm:rounded-3xl">
              {/* Browser top */}
              <div className="flex h-11 items-center border-b border-border/70 bg-muted/40 px-4">
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-red-400/70" />
                  <span className="size-2.5 rounded-full bg-yellow-400/70" />
                  <span className="size-2.5 rounded-full bg-green-400/70" />
                </div>

                <div className="mx-auto hidden h-6 w-64 items-center justify-center rounded-md bg-background/70 text-[10px] text-muted-foreground sm:flex">
                  meeting-assistant.app/dashboard
                </div>
              </div>

              {/* App preview */}
              <div className="grid min-h-[420px] grid-cols-1 bg-gradient-to-br from-cyan-50/80 via-background to-sky-50/70 sm:grid-cols-[190px_1fr]">
                {/* Sidebar */}
                <div className="hidden border-r border-primary/10 bg-cyan-100/45 p-4 sm:block">
                  <div className="flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Sparkles className="size-3.5" />
                    </div>

                    <span className="text-sm font-semibold">
                      Meet Agent
                    </span>
                  </div>

                  <div className="mt-5 rounded-xl border border-primary/10 bg-background/70 px-3 py-2 text-xs">
                    + New Chat
                  </div>

                  <p className="mt-6 px-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Recent chats
                  </p>

                  <div className="mt-2 space-y-1.5">
                    <div className="rounded-lg bg-primary/10 px-2.5 py-2 text-[10px] leading-4">
                      Find a free slot tomorrow
                    </div>

                    <div className="rounded-lg px-2.5 py-2 text-[10px] text-muted-foreground">
                      What's on today?
                    </div>

                    <div className="rounded-lg px-2.5 py-2 text-[10px] text-muted-foreground">
                      Team meeting
                    </div>
                  </div>
                </div>

                {/* Chat */}
                <div className="flex min-w-0 flex-col">
                  <div className="border-b border-primary/10 px-5 py-3 sm:px-7">
                    <p className="text-sm font-semibold">
                      Assistant
                    </p>

                    <p className="text-[10px] text-muted-foreground">
                      Schedule, reschedule, and brief your day
                    </p>
                  </div>

                  <div className="flex flex-1 flex-col justify-center px-4 py-8 sm:px-10">
                    {/* User message */}
                    <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-primary px-4 py-3 text-xs leading-5 text-primary-foreground shadow-sm">
                      Find a free 30-minute slot tomorrow morning.
                    </div>

                    {/* Agent */}
                    <div className="mt-4 max-w-[88%] rounded-2xl rounded-bl-md border border-primary/10 bg-background/90 px-4 py-4 shadow-sm">
                      <div className="flex items-center gap-2 text-xs font-semibold">
                        <span className="flex size-6 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Sparkles className="size-3" />
                        </span>

                        I found an opening.
                      </div>

                      <p className="mt-3 text-xs leading-5 text-muted-foreground">
                        You&apos;re free tomorrow from 10:00–10:30 AM.
                        There are no overlapping events on your
                        calendar.
                      </p>

                      <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-2 text-xs font-medium text-primary">
                        <Clock3 className="size-3.5" />
                        Tomorrow · 10:00–10:30 AM
                      </div>
                    </div>
                  </div>

                  {/* Composer */}
                  <div className="border-t border-primary/10 p-3 sm:p-5">
                    <div className="flex items-center gap-2 rounded-xl border border-primary/15 bg-background/80 px-3 py-2.5 shadow-sm">
                      <span className="flex-1 text-xs text-muted-foreground">
                        Ask about your calendar...
                      </span>

                      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <ArrowRight className="size-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TRUST / VALUE STRIP
          ========================================================= */}

      <section className="border-y border-border/70 bg-card/50">
        <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-border/70 px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-6 lg:px-8">
          <Stat
            value="Natural language"
            label="Describe what you need"
          />

          <Stat
            value="Real calendar"
            label="Works with Google Calendar"
          />

          <Stat
            value="Human approval"
            label="Stay in control of destructive actions"
          />
        </div>
      </section>

      {/* =========================================================
          FEATURES
          ========================================================= */}

      <section
        id="features"
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
      >
        <SectionHeading
          eyebrow="Built for your calendar"
          title="More than a chatbot."
          description="Meet Agent connects conversation, calendar data, and actions into one workflow."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-border/80 bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 sm:p-6"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" />
                </div>

                <h3 className="mt-5 text-base font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
          ========================================================= */}

      <section
        id="how-it-works"
        className="border-y border-border/70 bg-muted/30"
      >
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <SectionHeading
            eyebrow="How it works"
            title="Just tell the agent what you need."
            description="No complicated calendar controls. Describe the outcome and let the assistant handle the workflow."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative rounded-2xl border border-border/80 bg-background p-6 sm:p-7"
              >
                <span className="font-mono text-xs font-semibold text-primary">
                  {step.number}
                </span>

                <h3 className="mt-8 text-lg font-semibold tracking-tight">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          EXAMPLES
          ========================================================= */}

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-primary">
              Natural interaction
            </p>

            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Say it like you would say it to a person.
            </h2>

            <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
              You don&apos;t need to remember command syntax. Ask
              questions, describe a meeting, or tell the agent what
              should change.
            </p>

            <Link
              href="/sign-in"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              Try Meeting Assistant

              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="rounded-3xl border border-primary/10 bg-gradient-to-br from-cyan-50/80 via-background to-sky-50/70 p-4 shadow-xl shadow-primary/5 sm:p-6">
            <div className="rounded-2xl border border-border/80 bg-card p-4 shadow-sm sm:p-5">
              <div className="flex items-center gap-2 border-b border-border/70 pb-4">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Command className="size-4" />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Try asking
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Natural language calendar commands
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2.5">
                {examples.map((example) => (
                  <div
                    key={example}
                    className="flex items-start gap-3 rounded-xl border border-border/70 bg-background px-3.5 py-3 text-sm transition-colors hover:border-primary/20 hover:bg-primary/[0.03]"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <ArrowRight className="size-3" />
                    </span>

                    <span className="leading-5">
                      {example}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTROL / SAFETY
          ========================================================= */}

      <section className="border-y border-border/70 bg-card/50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="rounded-3xl border border-primary/10 bg-gradient-to-br from-cyan-50/70 via-background to-sky-50/60 p-6 sm:p-10">
            <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/15">
                <Check className="size-6" />
              </div>

              <div>
                <p className="text-sm font-semibold text-primary">
                  Stay in control
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Important actions shouldn&apos;t happen by accident.
                </h2>

                <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
                  Meeting Assistant can pause destructive calendar
                  actions for your confirmation before making the
                  final change.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
          ========================================================= */}

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 size-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200/25 blur-3xl" />
        </div>

        <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <Sparkles className="size-6" />
          </div>

          <h2 className="mt-7 font-heading text-3xl font-semibold tracking-tight sm:text-5xl">
            Give your calendar
            <br />
            an agent.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            Connect your calendar and start managing your schedule
            with natural language.
          </p>

          <Link
            href="/sign-in"
            className="group mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            Get started

            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      {/* =========================================================
          FOOTER
          ========================================================= */}

      <footer className="border-t border-border/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-7 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="size-4" />
            </div>

            <span className="text-sm font-semibold">
              Meeting Assistant
            </span>
          </div>

          <p className="text-xs text-muted-foreground">
            AI-powered calendar assistance.
          </p>
        </div>
      </footer>
    </main>
  );
}

/* ===============================================================
   NAVBAR
   =============================================================== */

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Sparkles className="size-4" />
          </span>

          <span className="text-sm font-semibold tracking-tight sm:text-base">
            Meeting Assistant
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          <a
            href="#features"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            How it works
          </a>

          <Link
            href="/sign-in"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Get started
          </Link>
        </nav>

        {/* Mobile menu icon */}
        <button
          type="button"
          aria-label="Open navigation"
          className="flex size-9 items-center justify-center rounded-lg border border-border bg-card md:hidden"
        >
          <Menu className="size-4" />
        </button>
      </div>
    </header>
  );
}

/* ===============================================================
   SECTION HEADING
   =============================================================== */

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold text-primary">
        {eyebrow}
      </p>

      <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>

      <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
        {description}
      </p>
    </div>
  );
}

/* ===============================================================
   STAT
   =============================================================== */

function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="px-5 py-7 text-center sm:px-8">
      <p className="text-sm font-semibold">
        {value}
      </p>

      <p className="mt-1 text-xs text-muted-foreground">
        {label}
      </p>
    </div>
  );
}