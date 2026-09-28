import Image from "next/image";
import Link from "next/link";
import type { BongodexCaseCopy, Locale } from "./bongodex.case";
import { Reveal } from "./bongodex-case-study-client";
import {
  SITE_BODY_COPY,
  SITE_SECTION_GUTTERS,
} from "@/components/layout/siteLayout";
import styles from "./bongodex-case-study.module.css";

const ASSET_ROOT = "/brand/projects/bongodex/case-study";

const assets = {
  cover: `${ASSET_ROOT}/01-bongodex-cover.png`,
  collection: `${ASSET_ROOT}/02-collection.png`,
  overview: `${ASSET_ROOT}/03-overview.png`,
  battle: `${ASSET_ROOT}/04-battle.png`,
  activity: `${ASSET_ROOT}/05-activity.png`,
  states: `${ASSET_ROOT}/06-states.png`,
  system: `${ASSET_ROOT}/07-system.png`,
  research: `${ASSET_ROOT}/08-research.png`,
  prototype: `${ASSET_ROOT}/09-prototype.png`,
  brand: `${ASSET_ROOT}/10-brand-system.png`,
} as const;

type AssetKey = keyof typeof assets;

type Props = {
  locale: Locale;
  copy: BongodexCaseCopy;
};

function SectionShell({
  id,
  children,
  className = "",
  compact = false,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  compact?: boolean;
}) {
  return (
    <section id={id} className={`relative scroll-mt-24 ${className}`}>
      <div className={`mx-auto ${SITE_SECTION_GUTTERS} ${compact ? "py-14 md:py-20" : "py-20 md:py-28 xl:py-32"}`}>
        {children}
      </div>
    </section>
  );
}

function StageHeader({
  title,
  intro,
  className = "",
}: {
  title: string;
  intro?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="heading-h2 !text-left tracking-tight uppercase">{title}</h2>
      {intro ? <p className={`mt-5 max-w-[900px] ${SITE_BODY_COPY}`}>{intro}</p> : null}
    </div>
  );
}

function MediaAsset({
  asset,
  label,
  className = "",
  priority = false,
}: {
  asset: AssetKey;
  label: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure className={`${styles.assetStage} ${className}`}>
      <Image
        src={assets[asset]}
        alt={label}
        width={1600}
        height={1000}
        priority={priority}
        className="relative z-[1] h-auto w-full"
        sizes="(min-width: 1280px) 70vw, 100vw"
      />
      <figcaption className={styles.assetLabel}>{label}</figcaption>
    </figure>
  );
}

function Hero({ locale, copy }: Props) {
  return (
    <header className="relative overflow-hidden pt-20 md:pt-24">
      <div className={styles.heroVisual}>
        <Image
          src={assets.cover}
          alt=""
          fill
          priority
          className="object-cover object-center opacity-58"
          sizes="100vw"
        />
        <div className={styles.heroNoise} />

        <div className="absolute inset-0 z-10 flex items-end">
          <div className={`w-full ${SITE_SECTION_GUTTERS} pb-12 md:pb-16 xl:pb-20`}>
            <Link
              href={`/${locale}/#projects`}
              className="inline-flex items-center gap-3 text-[11px] tracking-[0.2em] text-neutral-white/50 uppercase transition hover:text-neutral-white"
            >
              <span aria-hidden>←</span>
              {copy.back}
            </Link>

            <Reveal className="mt-14 md:mt-20">
              <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_.9fr]">
                <div>
                  <div className="font-display text-[clamp(3.5rem,10vw,9rem)] font-semibold leading-[.82] tracking-[-.07em] text-neutral-white normal-case">
                    {copy.title}
                  </div>
                  <p className="mt-7 max-w-[920px] text-[clamp(1.45rem,3.1vw,3.4rem)] font-semibold leading-[1.08] tracking-[-.035em] text-neutral-white">
                    {copy.headline}
                  </p>
                </div>
                <div className="lg:justify-self-end lg:max-w-[540px]">
                  <p className={SITE_BODY_COPY}>{copy.intro}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="relative bg-neutral-black-900">
        <div className={`${SITE_SECTION_GUTTERS} py-10 md:py-12`}>
          <div className="grid gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10">
            {copy.facts.map((fact, index) => (
              <Reveal key={fact.label} delay={index * 60}>
                <p className="text-[10px] tracking-[0.2em] text-accent-purple/65 uppercase">
                  {fact.label}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-neutral-white/75 md:text-[14px]">
                  {fact.value}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

function ContextSection({ copy }: { copy: BongodexCaseCopy }) {
  return (
    <SectionShell id="context" className="overflow-hidden">
      <div className="pointer-events-none absolute right-[-5%] top-[8%] hidden lg:block">
        <div className={`${styles.stageWord} ${styles.stageWordCyan}`}>context</div>
      </div>

      <Reveal><StageHeader title={copy.context.title} /></Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-[.76fr_1.24fr] lg:items-center xl:gap-20">
        <Reveal>
          <div className="space-y-6">
            {copy.context.body.map((paragraph) => (
              <p key={paragraph} className={SITE_BODY_COPY}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-10 border-l-2 border-accent-lime/55 pl-5 text-[clamp(1.05rem,1.8vw,1.45rem)] font-semibold leading-snug text-neutral-white/82">
            {copy.context.audience}
          </p>
        </Reveal>
        <Reveal delay={90}>
          <MediaAsset asset="collection" label={copy.assetLabels.collection} />
        </Reveal>
      </div>
    </SectionShell>
  );
}

function ProblemSection({ copy }: { copy: BongodexCaseCopy }) {
  return (
    <section id="problem" className="relative overflow-hidden bg-neutral-black-800/28 py-20 md:py-28 xl:py-32">
      <div className={SITE_SECTION_GUTTERS}>
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-end">
            <StageHeader title={copy.problem.title} />
            <p className="max-w-[860px] text-[clamp(1.25rem,2.6vw,2.5rem)] font-semibold leading-[1.16] tracking-[-.025em] text-neutral-white/88">
              {copy.problem.statement}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.12fr_.88fr] lg:items-center">
          <Reveal>
            <p className={SITE_BODY_COPY}>{copy.problem.body}</p>
            <div className="mt-10 grid gap-y-5 sm:grid-cols-2 sm:gap-x-8">
              {copy.problem.questions.map((question, index) => (
                <div key={question} className="relative pt-4 text-[13px] leading-6 text-neutral-white/65 before:absolute before:left-0 before:top-0 before:h-px before:w-12 before:bg-accent-purple/60">
                  <span className="mr-3 text-[10px] tracking-[.18em] text-accent-lime/65">0{index + 1}</span>
                  {question}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={90}>
            <MediaAsset asset="research" label={copy.assetLabels.research} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ResearchSection({ copy }: { copy: BongodexCaseCopy }) {
  return (
    <SectionShell id="research" className="overflow-hidden">
      <div className="pointer-events-none absolute left-[-2%] top-[10%] hidden lg:block">
        <div className={`${styles.stageWord} ${styles.stageWordPurple}`}>signals</div>
      </div>

      <Reveal><StageHeader title={copy.research.title} intro={copy.research.intro} /></Reveal>

      <div className="mt-14 grid gap-12 lg:grid-cols-[.95fr_1.05fr] lg:items-start xl:gap-20">
        <Reveal>
          <MediaAsset asset="research" label={copy.assetLabels.research} />
        </Reveal>
        <Reveal delay={90}>
          <div className={`${styles.researchRail} space-y-9`}>
            {copy.research.sources.map((item) => (
              <div key={item.title} className={styles.researchItem}>
                <h3 className="heading-h4 uppercase">{item.title}</h3>
                <p className="mt-3 text-[13px] leading-6 text-neutral-white/52">{item.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}

function HypothesisSection({ copy }: { copy: BongodexCaseCopy }) {
  return (
    <SectionShell id="hypothesis" className="bg-neutral-black-800/22">
      <Reveal>
        <StageHeader title={copy.hypothesis.title} />
        <p className="mt-8 max-w-[1120px] text-[clamp(1.4rem,3vw,3rem)] font-semibold leading-[1.12] tracking-[-.035em] text-neutral-white/90">
          {copy.hypothesis.statement}
        </p>
      </Reveal>

      <div className="mt-16 grid gap-10 md:grid-cols-3">
        {copy.hypothesis.rules.map((item, index) => (
          <Reveal key={item.title} delay={index * 70}>
            <div className={styles.hypothesisLine}>
              <div className="text-[10px] tracking-[.22em] text-accent-lime/55">0{index + 1}</div>
              <h3 className="mt-4 heading-h4 uppercase">{item.title}</h3>
              <p className="mt-4 text-[13px] leading-6 text-neutral-white/50">{item.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

function PrototypeSection({ copy }: { copy: BongodexCaseCopy }) {
  return (
    <SectionShell id="prototype" className="overflow-hidden">
      <div className="pointer-events-none absolute right-[-4%] top-[3%] hidden lg:block">
        <div className={`${styles.stageWord} ${styles.stageWordLime}`}>prototype</div>
      </div>

      <Reveal><StageHeader title={copy.prototype.title} /></Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-[.74fr_1.26fr] lg:items-start xl:gap-20">
        <Reveal>
          <div className="space-y-6">
            {copy.prototype.body.map((paragraph) => (
              <p key={paragraph} className={SITE_BODY_COPY}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-10 text-[clamp(1.1rem,2vw,1.7rem)] font-semibold leading-snug text-accent-purple/90">
            {copy.prototype.turningPoint}
          </p>
        </Reveal>
        <Reveal delay={90}>
          <MediaAsset asset="prototype" label={copy.assetLabels.prototype} />
        </Reveal>
      </div>

      <Reveal className="mt-14">
        <div className={styles.prototypeTrack}>
          {copy.prototype.loop.map((step, index) => (
            <div key={step} className={styles.prototypeStep}>
              <div className="text-[10px] tracking-[.2em] text-neutral-white/25">0{index + 1}</div>
              <div className="mt-4 font-display text-[clamp(1rem,1.8vw,1.45rem)] text-neutral-white/72">{step}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </SectionShell>
  );
}

function BrandSection({ copy }: { copy: BongodexCaseCopy }) {
  return (
    <SectionShell id="visual-system" className="bg-neutral-black-800/24">
      <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center xl:gap-20">
        <Reveal>
          <StageHeader title={copy.brand.title} intro={copy.brand.body} />
          <div className="mt-10 space-y-7">
            {copy.brand.principles.map((item, index) => (
              <div key={item.title} className="grid gap-3 sm:grid-cols-[150px_1fr]">
                <div className={`${styles.systemWord} ${index === 0 ? styles.systemWordActive : ""}`}>{item.title}</div>
                <p className="text-[13px] leading-6 text-neutral-white/48">{item.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={90}>
          <MediaAsset asset="brand" label={copy.assetLabels.brand} />
        </Reveal>
      </div>
    </SectionShell>
  );
}

function ArchitectureSection({ copy }: { copy: BongodexCaseCopy }) {
  return (
    <SectionShell id="information-architecture">
      <Reveal><StageHeader title={copy.architecture.title} intro={copy.architecture.body} /></Reveal>

      <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
        {copy.architecture.categories.map((item, index) => (
          <Reveal key={item.title} delay={index * 60}>
            <div className="border-t border-neutral-white/10 pt-6">
              <div className="text-[10px] tracking-[.2em] text-accent-purple/55">0{index + 1}</div>
              <h3 className="mt-4 font-display text-[clamp(1.6rem,2.7vw,3rem)] tracking-[-.045em] text-neutral-white/88">{item.title}</h3>
              <p className="mt-5 text-[13px] leading-6 text-neutral-white/48">{item.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <MediaAsset asset="system" label={copy.assetLabels.system} />
          <p className="border-l border-accent-lime/55 pl-6 text-[clamp(1.05rem,1.7vw,1.45rem)] font-semibold leading-snug text-neutral-white/70">
            {copy.architecture.rule}
          </p>
        </div>
      </Reveal>
    </SectionShell>
  );
}

function CollectionSection({ copy }: { copy: BongodexCaseCopy }) {
  return (
    <SectionShell id="collection" className="overflow-hidden bg-neutral-black-800/18">
      <div className="grid gap-12 xl:grid-cols-[1.22fr_.78fr] xl:items-center xl:gap-20">
        <Reveal>
          <MediaAsset asset="collection" label={copy.assetLabels.collection} />
        </Reveal>
        <Reveal delay={90}>
          <StageHeader title={copy.collection.title} intro={copy.collection.body} />
          <div className="mt-9 space-y-4">
            {copy.collection.details.map((item) => (
              <div key={item} className="flex gap-4 text-[13px] leading-6 text-neutral-white/52">
                <span className="mt-[.55rem] h-1.5 w-1.5 shrink-0 bg-accent-lime/70" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}

function OverviewSection({ copy }: { copy: BongodexCaseCopy }) {
  return (
    <SectionShell id="overview">
      <div className="grid gap-12 xl:grid-cols-[.74fr_1.26fr] xl:items-start xl:gap-20">
        <Reveal className="xl:pt-8">
          <StageHeader title={copy.overview.title} intro={copy.overview.body} />
          <div className="mt-10 space-y-8">
            {copy.overview.modes.map((item, index) => (
              <div key={item.title} className="grid gap-2 sm:grid-cols-[135px_1fr]">
                <h3 className={`heading-h4 uppercase ${index === 1 ? "text-accent-purple" : ""}`}>{item.title}</h3>
                <p className="text-[13px] leading-6 text-neutral-white/48">{item.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={90}>
          <MediaAsset asset="overview" label={copy.assetLabels.overview} />
        </Reveal>
      </div>
    </SectionShell>
  );
}

function EngagementSection({ copy }: { copy: BongodexCaseCopy }) {
  return (
    <SectionShell id="product-expansion" className="bg-neutral-black-800/22">
      <Reveal>
        <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
          <StageHeader title={copy.engagement.title} />
          <p className={SITE_BODY_COPY}>{copy.engagement.intro}</p>
        </div>
      </Reveal>

      <div className="mt-16 grid gap-10 xl:grid-cols-12 xl:items-start">
        <Reveal className="xl:col-span-7">
          <MediaAsset asset="battle" label={copy.assetLabels.battle} />
          <h3 className="mt-7 heading-h3">{copy.engagement.battleTitle}</h3>
          <p className="mt-4 max-w-[760px] text-[13px] leading-7 text-neutral-white/54">{copy.engagement.battleBody}</p>
        </Reveal>

        <Reveal className="xl:col-span-5 xl:pt-24" delay={90}>
          <MediaAsset asset="activity" label={copy.assetLabels.activity} />
          <h3 className="mt-7 heading-h3">{copy.engagement.activityTitle}</h3>
          <p className="mt-4 text-[13px] leading-7 text-neutral-white/54">{copy.engagement.activityBody}</p>
        </Reveal>
      </div>
    </SectionShell>
  );
}

function TrustSection({ copy }: { copy: BongodexCaseCopy }) {
  return (
    <SectionShell id="trust">
      <div className="grid gap-12 xl:grid-cols-[.9fr_1.1fr] xl:items-start xl:gap-20">
        <Reveal>
          <StageHeader title={copy.trust.title} intro={copy.trust.body} />
          <div className="mt-10">
            <MediaAsset asset="states" label={copy.assetLabels.states} />
          </div>
        </Reveal>

        <Reveal delay={90}>
          <div className="border-y border-neutral-white/10">
            {copy.trust.states.map((item) => (
              <div key={item.title} className="grid grid-cols-[110px_1fr] gap-6 border-b border-neutral-white/10 py-6 last:border-b-0 sm:grid-cols-[145px_1fr]">
                <div className={`font-display text-[13px] ${item.title === "Listo" || item.title === "Ready" ? "text-accent-lime" : "text-neutral-white/70"}`}>{item.title}</div>
                <div className="text-[12px] leading-6 text-neutral-white/45">{item.body}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}

function ValidationSection({ copy }: { copy: BongodexCaseCopy }) {
  return (
    <SectionShell id="validation" className="overflow-hidden bg-neutral-black-800/22">
      <div className="pointer-events-none absolute right-[-4%] top-[6%] hidden lg:block">
        <div className={`${styles.stageWord} ${styles.stageWordPurple}`}>live</div>
      </div>

      <Reveal><StageHeader title={copy.validation.title} intro={copy.validation.body} /></Reveal>

      <div className="mt-14 grid gap-y-12 md:grid-cols-3 md:gap-x-10">
        {copy.validation.metrics.map((metric, index) => (
          <Reveal key={metric.label} delay={index * 70}>
            <div>
              <div className={`${styles.metricValue} ${index === 2 ? "text-accent-lime" : "text-accent-purple"}`}>{metric.value}</div>
              <div className="mt-4 text-[11px] tracking-[.16em] text-neutral-white/55 uppercase">{metric.label}</div>
              {metric.note ? <div className="mt-2 text-[11px] text-neutral-white/28">{metric.note}</div> : null}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-14">
        <p className="max-w-[900px] border-l border-accent-cyan-10 pl-6 text-[clamp(1.05rem,1.8vw,1.55rem)] font-semibold leading-snug text-neutral-white/72">
          {copy.validation.learning}
        </p>
      </Reveal>
    </SectionShell>
  );
}

function EvolutionSection({ copy }: { copy: BongodexCaseCopy }) {
  return (
    <SectionShell id="evolution">
      <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
        <Reveal><StageHeader title={copy.evolution.title} /></Reveal>
        <Reveal delay={90}>
          <div className="space-y-6">
            {copy.evolution.body.map((paragraph) => (
              <p key={paragraph} className={SITE_BODY_COPY}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}

function CaseFooter({ locale, copy }: Props) {
  return (
    <section className={`${SITE_SECTION_GUTTERS} pb-28 pt-16 md:pb-36`}>
      <div className="mx-auto max-w-[1440px] border-t border-neutral-white/10 pt-12">
        <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
          <div className="text-[11px] tracking-[.24em] text-accent-purple/70">{copy.footer.label}</div>
          <div>
            <h2 className="font-display text-[clamp(2rem,4vw,4.5rem)] font-semibold leading-[1.02] tracking-[-.045em] normal-case">{copy.footer.title}</h2>
            <p className={`mt-6 max-w-[900px] ${SITE_BODY_COPY}`}>{copy.footer.body}</p>
            <Link href={`/${locale}#projects`} className="group mt-8 inline-flex items-center gap-3 text-[11px] tracking-[.2em] text-accent-purple transition hover:text-neutral-white">
              {copy.footer.button}<span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function BongodexCaseStudy({ locale, copy }: Props) {
  return (
    <main className={`${styles.root} text-neutral-white`}>
      <div className={styles.gridField} />
      <div className={`${styles.ambient} ${styles.ambientPurple} -left-48 top-[15%]`} />
      <div className={`${styles.ambient} ${styles.ambientCyan} -right-64 top-[48%]`} />

      <Hero locale={locale} copy={copy} />
      <ContextSection copy={copy} />
      <ProblemSection copy={copy} />
      <ResearchSection copy={copy} />
      <HypothesisSection copy={copy} />
      <PrototypeSection copy={copy} />
      <BrandSection copy={copy} />
      <ArchitectureSection copy={copy} />
      <CollectionSection copy={copy} />
      <OverviewSection copy={copy} />
      <EngagementSection copy={copy} />
      <TrustSection copy={copy} />
      <ValidationSection copy={copy} />
      <EvolutionSection copy={copy} />
      <CaseFooter locale={locale} copy={copy} />
    </main>
  );
}
