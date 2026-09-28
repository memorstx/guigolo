import Image from "next/image";
import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import type { Locale, MironlineCaseCopy } from "./mironline.case";
import {
  BeforeAfterCompare,
  InteractionStage,
  Reveal,
} from "./mironline-case-study-client";
import {
  SITE_PRIMARY_BUTTON,
  SITE_SECTION_GUTTERS,
} from "@/components/layout/siteLayout";
import styles from "./mironline-case-study.module.css";

const ASSET_ROOT = "/brand/projects/mironline/case-study";

const assets = {
  dashboard: `${ASSET_ROOT}/01-student-dashboard.png`,
  player: `${ASSET_ROOT}/02-learning-player.png`,
  before: `${ASSET_ROOT}/03-reading-before.png`,
  after: `${ASSET_ROOT}/04-reading-after.png`,
  responsive: `${ASSET_ROOT}/05-responsive-devices.png`,
  system: `${ASSET_ROOT}/06-design-system.png`,
  teacher: `${ASSET_ROOT}/09-teacher-dashboard.png`,
  analytics: `${ASSET_ROOT}/10-analytics-reporting.png`,
  beyond: `${ASSET_ROOT}/11-beyond-screen.png`,
  research: `${ASSET_ROOT}/12-research-evidence.png`,
  process: `${ASSET_ROOT}/13-process-map.png`,
  gallery: `${ASSET_ROOT}/14-interaction-gallery.png`,
} as const;

type AssetKey = keyof typeof assets;

type Props = {
  locale: Locale;
  copy: MironlineCaseCopy;
};

function publicAssetExists(src: string) {
  return fs.existsSync(path.join(process.cwd(), "public", src.replace(/^\//, "")));
}

function sectionId(id: string) {
  return id.replace(/[^a-z0-9-_]/gi, "-");
}

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
    <section id={id ? sectionId(id) : undefined} className={`relative scroll-mt-24 ${className}`}>
      <div
        className={`mx-auto ${SITE_SECTION_GUTTERS} ${
          compact ? "py-12 md:py-16" : "py-16 md:py-20 xl:py-24"
        }`}
      >
        {children}
      </div>
    </section>
  );
}

function StageHeader({
  title,
  intro,
  align = "left",
  className = "",
}: {
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";

  return (
    <div className={`${centered ? "mx-auto text-center" : "text-left"} ${className}`}>
      <h2
        className={`${styles.sectionTitle} uppercase ${centered ? "" : "text-left"}`}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={`${styles.bodyCopy} mt-5 ${
            centered ? "mx-auto max-w-[900px] text-center" : "max-w-[820px]"
          }`}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}

function MediaAsset({
  asset,
  label,
  index,
  className = "",
  imageClassName = "object-contain",
  priority = false,
}: {
  asset: AssetKey;
  label: string;
  index: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}) {
  const src = assets[asset];
  const exists = publicAssetExists(src);

  return (
    <figure className={`${styles.assetStage} ${className}`}>
      {exists ? (
        <Image
          src={src}
          alt={label}
          fill
          priority={priority}
          className={`relative z-[1] ${imageClassName}`}
          sizes="(min-width: 1536px) 68vw, (min-width: 1024px) 72vw, 100vw"
        />
      ) : (
        <div className={styles.assetPlaceholder}>
          <div className={styles.assetPlaceholderInner}>
            <div className={styles.assetIndex}>{index}</div>
            <div className={styles.assetFile}>{src.split("/").pop()}</div>
            <div className="mt-2 text-[11px] tracking-[0.12em] text-neutral-white/25 uppercase">
              1600 × 1000
            </div>
          </div>
        </div>
      )}
      <figcaption className={styles.assetLabel}>{label}</figcaption>
    </figure>
  );
}

function Marquee({ children }: { children: string }) {
  const repeated = `${children} · ${children} · ${children} · ${children} · `;

  return (
    <div className={`${styles.marqueeMask} py-4 text-[11px] tracking-[0.34em] text-neutral-white/10 uppercase`}>
      <div className={styles.marqueeTrack} aria-hidden="true">
        {repeated.repeat(3)}
      </div>
    </div>
  );
}

function Hero({ locale, copy }: Props) {
  const desktopCover = publicAssetExists("/brand/projects/mironline/cover-mironline-desktop.png")
    ? "/brand/projects/mironline/cover-mironline-desktop.png"
    : "/brand/projects/mironline/cover-mironline.png";
  const mobileCover = publicAssetExists("/brand/projects/mironline/cover-mironline-mobile.png")
    ? "/brand/projects/mironline/cover-mironline-mobile.png"
    : desktopCover;

  return (
    <header className="relative overflow-hidden pt-20 md:pt-24">
      <div className={styles.heroVisual}>
        <Image
          src={desktopCover}
          alt=""
          fill
          priority
          className="hidden object-cover object-[50%_42%] opacity-75 sm:block"
          sizes="100vw"
        />
        <Image
          src={mobileCover}
          alt=""
          fill
          priority
          className="object-cover object-[50%_38%] opacity-72 sm:hidden"
          sizes="100vw"
        />
        <div className={styles.heroScrim} />
        <div className={styles.heroNoise} />

        <div className={`absolute inset-0 z-10 flex h-full flex-col ${SITE_SECTION_GUTTERS}`}>
          <div className="pt-6 md:pt-8">
            <Link
              href={`/${locale}/#projects`}
              className="group inline-flex items-center gap-3 text-[12px] tracking-[0.14em] text-neutral-white/65 uppercase transition hover:text-neutral-white"
            >
              <span aria-hidden className="text-[17px] leading-none transition-transform group-hover:-translate-x-1">←</span>
              {copy.back}
            </Link>
          </div>

          <Reveal className="mt-auto pb-10 sm:pb-12 md:pb-14 lg:pb-16">
            <div className="max-w-[980px]">
              <Image
                src="/brand/projects/mironline/logo-mironline.png"
                alt="mironline"
                width={480}
                height={120}
                className="h-auto w-8 object-contain object-left opacity-90 sm:w-9 md:w-10 lg:w-11 xl:w-12"
                priority
              />
              <h1 className={styles.heroTitle}>{copy.headline}</h1>
              <p className={styles.heroIntro}>{copy.intro}</p>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="relative bg-neutral-black-900">
        <div className={`${SITE_SECTION_GUTTERS} py-8 md:py-10`}>
          <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10">
            {copy.facts.map((fact, index) => (
              <Reveal key={fact.label} delay={index * 70}>
                <p className="text-[11px] tracking-[0.18em] text-accent-purple/70 uppercase">
                  {fact.label}
                </p>
                <p className="mt-2 text-[14px] leading-relaxed text-neutral-white/72">
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

function ContextSection({ copy }: { copy: MironlineCaseCopy }) {
  const section = copy.sections.product;

  return (
    <SectionShell id="context" className="overflow-hidden">
      <div className="pointer-events-none absolute right-[-6%] top-[8%] hidden 2xl:block">
        <div className={`${styles.stageWord} ${styles.stageWordCyan}`}>context</div>
      </div>

      <Reveal>
        <StageHeader title={section.title} />
      </Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:items-start xl:gap-20">
        <Reveal className="lg:pt-8">
          <div className="space-y-6">
            {section.body.map((paragraph) => (
              <p key={paragraph} className={styles.bodyCopy}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 grid gap-y-9 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {section.ecosystem.map((item) => (
              <div key={item.label}>
                <p className="text-[11px] tracking-[0.22em] text-neutral-white/35 uppercase">
                  {item.label}
                </p>
                <p className="mt-2 text-[clamp(1.15rem,2vw,1.7rem)] font-semibold leading-tight text-neutral-white/85">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <MediaAsset asset="dashboard" label={copy.assetLabels.dashboard} index="01"  />
        </Reveal>
      </div>
    </SectionShell>
  );
}

function ProblemSection({ copy }: { copy: MironlineCaseCopy }) {
  const section = copy.sections.challenge;
  const words = ["FLASH", "MOBILE", "BROWSER", "LOAD"];

  return (
    <section id="problem" className="relative overflow-hidden bg-neutral-black-800/30 py-20 md:py-28 xl:py-32">
      <div className={`${SITE_SECTION_GUTTERS}`}>
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
            <StageHeader title={section.title} />
            <p className="max-w-3xl text-[clamp(1.15rem,1.75vw,1.65rem)] font-semibold leading-[1.22] text-neutral-white/85">
              {section.statement}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
          <Reveal>
            <MediaAsset asset="research" label={copy.assetLabels.research} index="12"  />
          </Reveal>

          <Reveal delay={100}>
            <p className={styles.bodyCopy}>{section.body}</p>

            <div className="mt-11 grid grid-cols-2 gap-x-7 gap-y-3">
              {words.map((word, index) => (
                <div key={word} className={styles.signalWord}>
                  <span className={styles.signalGhost}>{word}</span>
                  <p className="relative z-10 max-w-[17rem] pb-4 text-[12px] leading-relaxed text-neutral-white/55 md:text-[13px]">
                    {section.tickets[index]}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-16 md:mt-20">
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {section.constraints.map((constraint, index) => (
              <div key={constraint} className="relative min-h-28 pt-5">
                <span className="absolute left-0 top-0 h-[2px] w-8 bg-accent-purple/55" />
                <p className="text-[13px] leading-relaxed text-neutral-white/65 md:text-[14px]">
                  {constraint}
                </p>
                <span className="pointer-events-none absolute -right-1 top-0 text-[3rem] font-bold leading-none text-neutral-white/[0.025]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function RoleSection({ copy }: { copy: MironlineCaseCopy }) {
  const section = copy.sections.role;

  return (
    <SectionShell id="scope" className="overflow-hidden">
      <div className="pointer-events-none absolute left-[-3%] top-[10%] hidden 2xl:block">
        <div className={styles.stageWord}>design↔code</div>
      </div>

      <Reveal>
        <StageHeader title={section.title} />
      </Reveal>

      <div className="mt-14 grid gap-12 lg:grid-cols-[.82fr_1.18fr] xl:gap-20">
        <Reveal>
          <div className="space-y-6">
            {section.body.map((paragraph) => (
              <p key={paragraph} className={styles.bodyCopy}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12">
            <p className="text-[11px] tracking-[0.22em] text-accent-purple/70 uppercase">
              {section.teamTitle}
            </p>
            <div className="mt-5 space-y-2">
              {section.team.map((member) => (
                <div key={member} className="text-[clamp(1.05rem,1.45vw,1.45rem)] font-semibold leading-tight text-neutral-white/25 transition-colors hover:text-neutral-white/80">
                  {member}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <MediaAsset asset="process" label={copy.assetLabels.process} index="13"  />

          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div>
              <p className="text-[11px] tracking-[0.2em] text-neutral-white/35 uppercase">
                {section.workflowTitle}
              </p>
              <div className={`${styles.editorialRail} mt-6 space-y-5`}>
                {section.workflow.map((step) => (
                  <div key={step} className={styles.railStep}>
                    <p className="text-[13px] leading-relaxed text-neutral-white/65">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:pt-16">
              <p className="text-[11px] tracking-[0.2em] text-accent-purple/70 uppercase">
                {section.reverseTitle}
              </p>
              <p className="mt-5 text-[14px] leading-relaxed text-neutral-white/65">
                {section.reverseBody}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}

function ResearchSection({ copy }: { copy: MironlineCaseCopy }) {
  const section = copy.sections.research;

  return (
    <section id="research" className="relative overflow-hidden bg-neutral-black-900 py-20 md:py-28 xl:py-32">
      <div className={`${styles.ambient} ${styles.ambientCyan} -right-52 top-10`} />
      <div className={SITE_SECTION_GUTTERS}>
        <Reveal>
          <StageHeader title={section.title} intro={section.intro} align="center" />
        </Reveal>

        <div className="relative mt-16 md:mt-20">
          <div className="mx-auto max-w-[1100px]">
            <Reveal>
              <MediaAsset asset="research" label={copy.assetLabels.research} index="12"  />
            </Reveal>
          </div>

          <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
            {section.signals.map((signal, index) => (
              <Reveal key={signal.title} delay={index * 70}>
                <div className="relative pt-4">
                  <div className="absolute -top-2 right-0 select-none text-[clamp(3rem,5vw,5rem)] font-bold leading-none text-neutral-white/[0.025]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="heading-h4 text-neutral-white/85">{signal.title}</h3>
                  <p className="mt-4 text-[13px] leading-relaxed text-neutral-white/55">{signal.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DefinitionSection({ copy }: { copy: MironlineCaseCopy }) {
  const section = copy.sections.principles;

  return (
    <SectionShell id="definition">
      <Reveal>
        <StageHeader title={section.title} />
      </Reveal>

      <div className="mt-10 grid gap-x-12 md:grid-cols-3 xl:gap-x-20">
        {section.items.map((item, index) => (
          <Reveal key={item.title} delay={index * 90}>
            <article className={styles.principle}>
              <span className={styles.principleIndex}>{String(index + 1).padStart(2, "0")}</span>
              <h3 className="heading-h3 max-w-[18rem] text-neutral-white/90">{item.title}</h3>
              <p className="mt-5 max-w-[24rem] text-[13px] leading-relaxed text-neutral-white/55 md:text-[14px]">
                {item.body}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

function IdeationSection({ copy }: { copy: MironlineCaseCopy }) {
  const section = copy.sections.player;

  return (
    <section id="ideation" className="relative overflow-hidden bg-neutral-black-800/25">
      <div className={`${SITE_SECTION_GUTTERS} py-20 md:py-28 xl:py-32`}>
        <Reveal>
          <StageHeader title={section.title} />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <Reveal>
            <MediaAsset asset="player" label={copy.assetLabels.player} index="02"  />
          </Reveal>
          <Reveal delay={100}>
            <div className="pb-4 lg:pb-12">
              <div className={`${styles.stageWord} ${styles.stageWordCyan}`}>30+</div>
              <p className="mt-4 max-w-md text-[13px] leading-relaxed text-neutral-white/50 md:text-[14px]">
                {section.intro}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-10 md:mt-14">
          <InteractionStage interactions={section.interactions} />
        </Reveal>

        <Reveal className="mt-12 md:mt-16">
          <MediaAsset asset="gallery" label={copy.assetLabels.gallery} index="14"  />
        </Reveal>
      </div>
      <Marquee>interaction patterns · learning player · feedback states · responsive behavior</Marquee>
    </section>
  );
}

function IterationSection({ copy }: { copy: MironlineCaseCopy }) {
  const section = copy.sections.iteration;
  const beforeExists = publicAssetExists(assets.before);
  const afterExists = publicAssetExists(assets.after);

  return (
    <SectionShell id="iteration" className="overflow-hidden">
      <div className="pointer-events-none absolute right-[-2%] top-[5%] hidden 2xl:block">
        <div className={`${styles.stageWord} ${styles.stageWordPurple}`}>iterate</div>
      </div>

      <Reveal>
        <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
          <StageHeader title={section.title} />
          <p className={styles.bodyCopy}>{section.intro}</p>
        </div>
      </Reveal>

      <Reveal className="mt-14 md:mt-20">
        <BeforeAfterCompare
          beforeSrc={assets.before}
          afterSrc={assets.after}
          beforeExists={beforeExists}
          afterExists={afterExists}
          copy={section}
        />
      </Reveal>

      <div className="mt-16 grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:items-start">
        <Reveal>
          <p className="text-[11px] tracking-[0.22em] text-accent-purple/70 uppercase">
            {section.feedbackTitle}
          </p>
          <div className="mt-6 space-y-7">
            {section.feedback.map((feedback) => (
              <p key={feedback} className="text-[clamp(1rem,1.35vw,1.25rem)] leading-relaxed text-neutral-white/65">
                {feedback}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="relative pl-0 lg:pl-10">
            <div className={styles.quoteMark}>“</div>
            <p className="mt-1 max-w-[860px] text-[clamp(1.35rem,2.25vw,2.25rem)] font-semibold leading-[1.16] tracking-[-.025em] text-neutral-white/90">
              {section.outcomeBody}
            </p>
            <p className="mt-7 text-[11px] tracking-[0.22em] text-neutral-white/35 uppercase">
              {section.outcomeTitle}
            </p>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}

function SystemSection({ copy }: { copy: MironlineCaseCopy }) {
  const section = copy.sections.system;
  const positions = [
    "left-[4%] top-[8%]",
    "right-[6%] top-[15%]",
    "left-[12%] top-[48%]",
    "right-[11%] top-[48%]",
    "left-[25%] bottom-[8%]",
    "right-[25%] bottom-[8%]",
    "left-1/2 top-[2%] -translate-x-1/2",
  ];

  return (
    <section id="system" className="relative overflow-hidden bg-neutral-black-800/30 py-20 md:py-28 xl:py-32">
      <div className={`${styles.ambient} ${styles.ambientCyan} left-1/2 top-1/3 -translate-x-1/2`} />
      <div className={SITE_SECTION_GUTTERS}>
        <Reveal>
          <StageHeader title={section.title} intro={section.intro} align="center" />
        </Reveal>

        <Reveal className="mt-10 md:mt-14">
          <div className={styles.systemCloud}>
            <div className="relative z-10 mx-auto w-full max-w-[1100px]">
              <MediaAsset asset="system" label={copy.assetLabels.system} index="06" />
            </div>

            {section.points.map((point, index) => (
              <div
                key={point}
                className={`hidden min-[1600px]:block ${styles.systemWord} ${positions[index] ?? "left-0 top-0"}`}
              >
                {point}
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mx-auto mt-8 grid max-w-[1100px] gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <p className="text-[11px] tracking-[0.2em] text-neutral-white/35 uppercase">Design → Code</p>
            <p className="mt-3 text-[14px] leading-relaxed text-neutral-white/70">{section.designToCode}</p>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-[11px] tracking-[0.2em] text-accent-purple/65 uppercase">Code → Design</p>
            <p className="mt-3 text-[14px] leading-relaxed text-neutral-white/70">{section.codeToDesign}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ResponsiveSection({ copy }: { copy: MironlineCaseCopy }) {
  const section = copy.sections.responsive;

  return (
    <SectionShell id="responsive">
      <div className="grid gap-10 lg:grid-cols-[minmax(260px,.72fr)_minmax(0,1.28fr)] lg:items-start lg:gap-12 xl:gap-16">
        <Reveal>
          <div className={styles.responsiveSticky}>
            <StageHeader title={section.title} />
            <p className={`${styles.bodyCopy} mt-6`}>{section.intro}</p>

            <div className="mt-10 space-y-7">
              {section.points.map((point, index) => (
                <div key={point} className="grid grid-cols-[auto_1fr] gap-4">
                  <span className="pt-[2px] text-[11px] tracking-[0.18em] text-accent-purple/55">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[13px] leading-relaxed text-neutral-white/60">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <MediaAsset asset="responsive" label={copy.assetLabels.responsive} index="05"  />
        </Reveal>
      </div>
    </SectionShell>
  );
}

function ProfessionalSection({ copy }: { copy: MironlineCaseCopy }) {
  const section = copy.sections.professional;
  const sketchfabUid = "c33bec1fd5244571856cacdc1b5df234";
  const sketchfabEmbed = `https://sketchfab.com/models/${sketchfabUid}/embed?autostart=1&ui_infos=0&ui_stop=0&ui_inspector=0&ui_watermark_link=0&ui_watermark=0&ui_hint=2&ui_help=0&ui_settings=0&ui_vr=0&ui_annotations=1&ui_theme=dark`;

  return (
    <section
      id="professional"
      className="relative overflow-hidden bg-neutral-black-800/25 py-20 md:py-28 xl:py-32"
    >
      <div className={`${styles.ambient} ${styles.ambientCyan} -left-64 top-1/3`} />

      <div className={SITE_SECTION_GUTTERS}>
        <Reveal>
          <div className="grid gap-7 lg:grid-cols-[.7fr_1.3fr] lg:items-end lg:gap-14 xl:gap-20">
            <StageHeader title={section.title} />
            <p className={`${styles.bodyCopy} max-w-[820px]`}>{section.intro}</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[.44fr_1.56fr] lg:items-start xl:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className="mb-6 text-[11px] tracking-[0.22em] text-neutral-white/35 uppercase">
                Áreas de Professional English
              </p>

              <div className="space-y-3.5">
                {section.areas.map((area) => {
                  const isHealth = area.toLocaleLowerCase("es").includes("salud");

                  return (
                    <div
                      key={area}
                      className={`${styles.areaWord} ${isHealth ? styles.areaWordActive : ""}`}
                    >
                      {area}
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mx-auto w-full max-w-[980px]">
              <div className="relative overflow-hidden bg-neutral-black-900 shadow-[0_0_0_1px_rgba(255,255,255,.08),0_28px_80px_rgba(0,0,0,.32)]">
                <div className="relative aspect-[16/10] md:aspect-[16/9]">
                  <iframe
                    title="The muskuloskeletal system · mironline"
                    src={sketchfabEmbed}
                    className="absolute inset-0 h-full w-full border-0"
                    loading="lazy"
                    allow="autoplay; fullscreen; xr-spatial-tracking"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
              </div>

              <div className="mt-8 grid gap-8 md:grid-cols-[.82fr_1.18fr] md:gap-12">
                <div>
                  <p className="text-[11px] tracking-[0.22em] text-accent-purple/80 uppercase">
                    {section.threeDTitle}
                  </p>
                  <p className="mt-4 max-w-[560px] text-[14px] leading-relaxed text-neutral-white/62 md:text-[15px]">
                    {section.threeDBody}
                  </p>
                </div>

                <div className="md:pt-[2px]">
                  <p className="text-[11px] tracking-[0.22em] text-neutral-white/30 uppercase">
                    Flujo de interacción
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3 text-[11px] tracking-[0.08em] text-neutral-white/48 uppercase md:text-[12px]">
                    {section.threeDSteps.map((step, index) => (
                      <span key={step} className="contents">
                        <span>{step}</span>
                        {index < section.threeDSteps.length - 1 ? (
                          <span className="text-accent-purple/55" aria-hidden="true">→</span>
                        ) : null}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-5">
                    <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] text-accent-lime/70 uppercase">
                      <span className="h-1 w-1 rounded-full bg-accent-lime" aria-hidden="true" />
                      3D interactivo
                    </span>
                    <a
                      href={`https://sketchfab.com/3d-models/the-muskuloskeletal-system-${sketchfabUid}`}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 text-[11px] tracking-[0.18em] text-neutral-white/32 uppercase transition-colors hover:text-accent-purple focus-visible:outline-none focus-visible:text-accent-purple"
                    >
                      Ver en Sketchfab
                      <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function TeacherSection({ copy }: { copy: MironlineCaseCopy }) {
  const section = copy.sections.teachers;

  return (
    <SectionShell id="teacher" className="overflow-hidden">
      <div className="pointer-events-none absolute left-[-2%] top-[5%] hidden 2xl:block">
        <div className={styles.stageWord}>teacher</div>
      </div>

      <Reveal>
        <StageHeader title={section.title} intro={section.intro} />
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(230px,.5fr)] lg:items-center xl:gap-14">
        <Reveal>
          <MediaAsset asset="teacher" label={copy.assetLabels.teacher} index="09"  />
        </Reveal>

        <Reveal delay={100}>
          <div className="space-y-5 md:space-y-6 lg:pl-2 xl:pl-4">
            {section.points.map((point, index) => (
              <div key={point}>
                <div className="text-[11px] tracking-[0.18em] text-neutral-white/25">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="mt-1 text-[clamp(1rem,1.35vw,1.45rem)] font-semibold leading-[1.08] text-neutral-white/75">
                  {point}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}

function ValidationSection({ copy }: { copy: MironlineCaseCopy }) {
  const section = copy.sections.measure;
  const orbitPositions = [
    "left-[4%] top-[15%] md:left-[9%] md:top-[12%]",
    "right-[4%] top-[15%] md:right-[9%] md:top-[12%]",
    "left-[4%] bottom-[14%] md:left-[9%] md:bottom-[11%]",
    "right-[4%] bottom-[14%] md:right-[9%] md:bottom-[11%]",
  ];

  return (
    <section id="validation" className="relative overflow-hidden bg-neutral-black-800/25 py-20 md:py-28 xl:py-32">
      <div className={SITE_SECTION_GUTTERS}>
        <Reveal>
          <StageHeader title={section.title} intro={section.intro} align="center" />
        </Reveal>

        <Reveal className="mt-8 md:mt-12">
          <div className={styles.validationOrbit}>
            <div className={styles.orbitCenter}>
              <div className="text-center">
                <div className="text-[11px] tracking-[0.22em] text-accent-purple/65 uppercase">release</div>
                <div className="mt-2 text-[13px] font-semibold text-neutral-white/75 uppercase">production</div>
              </div>
            </div>

            {section.sources.map((source, index) => (
              <div key={source.title} className={`${styles.orbitItem} ${orbitPositions[index]}`}>
                <p className="text-[12px] font-semibold tracking-[0.08em] text-neutral-white/80 uppercase">
                  {source.title}
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-neutral-white/40">{source.body}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mx-auto mt-4 max-w-[1050px]">
          <MediaAsset asset="analytics" label={copy.assetLabels.analytics} index="10"  />
        </Reveal>

        <Reveal className="mt-12">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-4 text-[12px] tracking-[0.08em] text-neutral-white/45 uppercase md:text-[13px]">
            {section.loop.map((step, index) => (
              <span key={`${step}-${index}`} className="contents">
                <span>{step}</span>
                {index < section.loop.length - 1 ? (
                  <span className="text-accent-purple/45">→</span>
                ) : null}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ResultsSection({ copy }: { copy: MironlineCaseCopy }) {
  const section = copy.sections.impact;

  return (
    <section id="results" className={`${styles.metricSweep} relative overflow-hidden py-20 md:py-28 xl:py-36`}>
      <div className={`${styles.ambient} ${styles.ambientPurple} -right-64 top-0`} />
      <div className={`${SITE_SECTION_GUTTERS} relative z-10`}>
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <StageHeader title={section.title} />
            <p className={styles.bodyCopy}>{section.intro}</p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-y-16 md:grid-cols-3 md:gap-x-12">
          {section.stats.map((stat, index) => (
            <Reveal key={`${stat.value}-${stat.label}`} delay={index * 100}>
              <div>
                <div className={`${styles.metricValue} ${index === 0 ? "text-gradient-anim" : "text-neutral-white"}`}>
                  {stat.value}
                </div>
                <div className="mt-5 text-[12px] font-semibold tracking-[0.12em] text-neutral-white/75 uppercase">
                  {stat.label}
                </div>
                {stat.note ? (
                  <p className="mt-3 max-w-sm text-[11px] leading-relaxed text-neutral-white/35">{stat.note}</p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="text-[11px] tracking-[0.22em] text-accent-purple/70 uppercase">
              {section.supportTitle}
            </p>
            <p className="mt-5 text-[clamp(1rem,1.3vw,1.25rem)] leading-relaxed text-neutral-white/65">
              {section.supportBody}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <p className="text-[11px] tracking-[0.22em] text-neutral-white/35 uppercase">
              {section.productTitle}
            </p>
            <p className="mt-5 text-[clamp(1rem,1.3vw,1.25rem)] leading-relaxed text-neutral-white/65">
              {section.productBody}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function EvolutionSection({ locale, copy }: Props) {
  const section = copy.sections.beyond;

  return (
    <section id="evolution" className="relative overflow-hidden bg-neutral-black-800/25 py-20 md:py-28 xl:py-32">
      <div className={`${SITE_SECTION_GUTTERS}`}>
        <Reveal>
          <StageHeader title={section.title} />
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.28fr_.72fr] lg:items-start xl:gap-20">
          <Reveal>
            <MediaAsset asset="beyond" label={copy.assetLabels.beyond} index="11"  />
          </Reveal>

          <Reveal delay={100}>
            <div className="space-y-6 lg:pt-8">
              {section.body.map((paragraph) => (
                <p key={paragraph} className={styles.bodyCopy}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-16">
              <div className={styles.quoteMark}>“</div>
              <blockquote className="max-w-[680px] text-[clamp(1.15rem,1.7vw,1.6rem)] font-semibold leading-[1.3] text-neutral-white/80">
                {section.quote}
              </blockquote>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-20 md:mt-28">
          <div className="relative overflow-hidden bg-[radial-gradient(80%_140%_at_100%_0%,rgba(20,177,255,.10),transparent_60%)] py-10 md:py-14">
            <div className="pointer-events-none absolute right-[-2%] top-1/2 -translate-y-1/2 select-none text-[clamp(5rem,12vw,12rem)] font-bold leading-none tracking-[-.08em] text-neutral-white/[0.025] uppercase">
              mironline
            </div>
            <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-[11px] tracking-[0.22em] text-accent-purple/65 uppercase">
                  {copy.cta.label}
                </p>
                <h2 className="mt-4 heading-h2 !text-left tracking-tight uppercase">{copy.cta.title}</h2>
                <p className={`${styles.bodyCopy} mt-5 max-w-[820px]`}>{copy.cta.body}</p>
              </div>
              <Link href={`/${locale}/#projects`} className={`${SITE_PRIMARY_BUTTON} inline-flex w-fit items-center gap-3 px-7 py-3.5 text-[14px]`}>
                {copy.cta.button}
                <span aria-hidden className="text-[18px] leading-none">↗</span>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function CaseStudyPage({ locale, copy }: Props) {
  return (
    <main className={`${styles.root} text-neutral-white`}>
      <div className={styles.gridField} />
      <Hero locale={locale} copy={copy} />
      <Marquee>mironline · ui ux · frontend · edtech · responsive · interaction design</Marquee>
      <ContextSection copy={copy} />
      <ProblemSection copy={copy} />
      <RoleSection copy={copy} />
      <ResearchSection copy={copy} />
      <DefinitionSection copy={copy} />
      <IdeationSection copy={copy} />
      <IterationSection copy={copy} />
      <SystemSection copy={copy} />
      <ResponsiveSection copy={copy} />
      <ProfessionalSection copy={copy} />
      <TeacherSection copy={copy} />
      <ValidationSection copy={copy} />
      <ResultsSection copy={copy} />
      <EvolutionSection locale={locale} copy={copy} />
    </main>
  );
}
