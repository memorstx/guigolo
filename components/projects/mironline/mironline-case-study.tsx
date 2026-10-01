import Image from "next/image";
import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import type { Locale, MironlineCaseCopy } from "./mironline.case";
import {
  BeforeAfterCompare,
  ExpandableImage,
  PedagogyMap,
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
  studentUser: `${ASSET_ROOT}/07-student-user.png`,
  teacherUser: `${ASSET_ROOT}/08-teacher-user.png`,
  teacher: `${ASSET_ROOT}/09-teacher-dashboard.png`,
  analytics: `${ASSET_ROOT}/10-analytics-reporting.png`,
  beyond: `${ASSET_ROOT}/11-beyond-screen.png`,
  research: `${ASSET_ROOT}/12-research-evidence.png`,
  process: `${ASSET_ROOT}/13-process-map.png`,
  gallery: `${ASSET_ROOT}/14-interaction-gallery.png`,
  problem: `${ASSET_ROOT}/15-problem-symptoms.png`,
  analysis: `${ASSET_ROOT}/16-analysis-synthesis.png`,
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
  className = "",
  imageClassName = "object-contain",
  priority = false,
  sizes = "(min-width: 1536px) 68vw, (min-width: 1024px) 72vw, 100vw",
}: {
  asset: AssetKey;
  label: string;
  index?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
}) {
  void priority;
  const src = assets[asset];
  const exists = publicAssetExists(src);

  if (!exists) return null;

  return (
    <figure className={className}>
      <div className={styles.assetStage}>
        <ExpandableImage
          src={src}
          alt={label}
          className={imageClassName}
          sizes={sizes}
        />
      </div>
      <figcaption className={styles.assetLabel}>{label}</figcaption>
    </figure>
  );
}

function Marquee({ children }: { children: string }) {
  const repeated = `${children} · ${children} · ${children} · ${children} · `;

  return (
    <div className={`${styles.marqueeMask} py-4 text-[12px] tracking-[0.34em] text-neutral-white/10 uppercase`}>
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

  const heroTitle = copy.headline;
  const heroSummary = copy.intro;

  return (
    <header className="relative overflow-hidden">
      <div className={styles.heroVisual}>
        <Image
          src={desktopCover}
          alt=""
          fill
          priority
          className="hidden object-cover object-[62%_44%] opacity-80 sm:block"
          sizes="100vw"
        />
        <Image
          src={mobileCover}
          alt=""
          fill
          priority
          className="object-cover object-[54%_38%] opacity-78 sm:hidden"
          sizes="100vw"
        />
        <div className={styles.heroScrim} />
        <div className={styles.heroNoise} />

        <div className={`absolute inset-0 z-10 flex h-full flex-col ${SITE_SECTION_GUTTERS}`}>
          <div className="pt-5 sm:pt-6 md:pt-7">
            <Link
              href={`/${locale}/#projects`}
              className="group inline-flex items-center gap-3 text-[12px] tracking-[0.13em] text-neutral-white/68 uppercase transition hover:text-neutral-white"
            >
              <span
                aria-hidden
                className="text-[18px] leading-none transition-transform group-hover:-translate-x-1"
              >
                ←
              </span>
              {copy.back}
            </Link>
          </div>

          <Reveal className="mt-auto pb-9 sm:pb-10 md:pb-12 lg:pb-14">
            <div className={styles.heroContent}>
              <div className={styles.heroBrandRow}>
                <Image
                  src="/brand/projects/mironline/logo-mironline.png"
                  alt=""
                  width={120}
                  height={120}
                  className="h-[22px] w-[22px] shrink-0 object-contain opacity-95 sm:h-6 sm:w-6"
                  priority
                />
                <span className={styles.heroBrandName}>mironline</span>
                <span className={styles.heroMeta}>{copy.eyebrow}</span>
              </div>

              <h1 className={styles.heroTitle}>{heroTitle}</h1>
              <p className={styles.heroIntro}>{heroSummary}</p>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="relative bg-neutral-black-900">
        <div className={`${SITE_SECTION_GUTTERS} py-7 md:py-8`}>
          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10">
            {copy.facts.map((fact, index) => (
              <Reveal key={fact.label} delay={index * 70}>
                <p className={styles.microLabel}>{fact.label}</p>
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
  const history = copy.sections.history;
  const milestones = history.milestones.filter((item) => item.phase === "product");

  return (
    <SectionShell id="context" className="overflow-hidden">
      <Reveal>
        <div className={styles.caseIntroBlock}>
          <StageHeader title={section.title} />
          <div className={styles.caseIntroCopy}>
            <p className={styles.bodyCopy}>{section.body[0]}</p>
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-14 md:mt-18">
        <div className={styles.contextHistory}>
          <p className={styles.microLabel}>{history.productLabel}</p>
          <div className={styles.contextHistoryTrack}>
            {milestones.map((item) => (
              <article key={item.year} className={styles.contextHistoryItem}>
                <span className={styles.historyYear}>{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}

function ProductSection({ copy }: { copy: MironlineCaseCopy }) {
  const section = copy.sections.product;

  return (
    <section
      id="product"
      className="relative overflow-hidden bg-neutral-black-900 py-16 md:py-20 xl:py-24"
    >
      <div className={SITE_SECTION_GUTTERS}>
        <div className={styles.productOverview}>
          <Reveal>
            <div className={styles.productCopy}>
              <h2 className={styles.sectionTitle}>Producto</h2>
              <div className={styles.caseSectionIntro}>
                {section.body.slice(1).map((paragraph) => (
                  <p key={paragraph} className={styles.bodyCopy}>{paragraph}</p>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <MediaAsset
              asset="dashboard"
              label={copy.assetLabels.dashboard}
              className={styles.productHeroAsset}
              sizes="(min-width: 1280px) 58vw, 100vw"
            />
          </Reveal>
        </div>

        <Reveal className="mt-10 md:mt-12">
          <div className={styles.productFacts}>
            {section.ecosystem.map((item) => (
              <div key={item.label} className={styles.productFact}>
                <p className={styles.microLabel}>{item.label}</p>
                <p>{item.value}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AudienceSection({ copy }: { copy: MironlineCaseCopy }) {
  const section = copy.sections.audience;
  return (
    <section
      id="audience"
      className="relative overflow-hidden bg-neutral-black-900 py-16 md:py-20 xl:py-24"
    >
      <div className={`${styles.ambient} ${styles.ambientPurple} -left-64 top-20`} />

      <div className={SITE_SECTION_GUTTERS}>
        <Reveal>
          <div className={styles.caseSectionHeader}>
            <StageHeader title={section.title} />
            <p className={`${styles.bodyCopy} ${styles.caseSectionLead}`}>{section.intro}</p>
          </div>
        </Reveal>
        <div className={styles.audienceProfiles}>
          {section.profiles.map((profile, index) => (
            <Reveal key={profile.role} delay={index * 90}>
              <article className={styles.audienceProfile}>
                <div className={styles.audienceMedia}>
                  <MediaAsset
                    asset={profile.asset}
                    label={copy.assetLabels[profile.asset]}
                    sizes="(min-width: 1280px) 46vw, 100vw"
                  />
                </div>

                <div className={styles.audienceProfileBody}>
                  <span className={styles.audienceIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className={styles.microLabel}>{profile.typeLabel}</p>
                  <h3 className={styles.audienceRole}>{profile.role}</h3>
                  <p className={`${styles.bodyCopy} mt-4 max-w-[34rem]`}>
                    {profile.context}
                  </p>

                  <div className={styles.needList}>
                    {profile.needs.map((need) => (
                      <div key={need} className={styles.needItem}>
                        <span aria-hidden className={styles.needDot} />
                        <span>{need}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 md:mt-28">
          <div className="grid gap-10 xl:grid-cols-[.72fr_1.28fr] xl:items-start xl:gap-20">
            <div>
              <p className={styles.microLabel}>{section.architectureTitle}</p>
              <p className={`${styles.sectionLeadSmall} mt-4 max-w-[34rem]`}>
                {section.architectureIntro}
              </p>
            </div>

            <div className={styles.architectureMap}>
              <div className={styles.architectureRoot}>mironline</div>
              <div className={styles.architectureBranches}>
                {section.architecture.map((branch) => (
                  <div key={branch.label} className={styles.architectureBranch}>
                    <h3 className={styles.architectureBranchTitle}>{branch.label}</h3>
                    <div className={styles.architectureItems}>
                      {branch.items.map((item) => (
                        <span key={item} className={styles.architectureItem}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-20 md:mt-24">
          <div className={styles.userFlows}>
            <div>
              <p className={styles.microLabel}>{section.flowTitle}</p>
              <div className={styles.flowTrack}>
                {section.flow.map((step, index) => (
                  <div key={step} className={styles.flowStep}>
                    <span className={styles.flowNumber}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.flowLabel}>{step}</span>
                    {index < section.flow.length - 1 ? (
                      <span className={styles.flowArrow} aria-hidden>
                        →
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className={styles.microLabel}>{section.teacherFlowTitle}</p>
              <div className={styles.flowTrack}>
                {section.teacherFlow.map((step, index) => (
                  <div key={step} className={styles.flowStep}>
                    <span className={styles.flowNumber}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.flowLabel}>{step}</span>
                    {index < section.teacherFlow.length - 1 ? (
                      <span className={styles.flowArrow} aria-hidden>
                        →
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.userRelation}>
            <p className={styles.microLabel}>{section.relationTitle}</p>
            <p>{section.relation}</p>
          </div>

          <p className={styles.audienceNote}>{section.note}</p>
        </Reveal>
      </div>
    </section>
  );
}



function PedagogySection({ locale, copy }: Props) {
  const section = copy.sections.pedagogy;

  return (
    <SectionShell id="pedagogy" className="overflow-hidden bg-neutral-black-800/20">
      <Reveal>
        <div className={styles.caseSectionHeader}>
          <StageHeader title={section.title} />
          <p className={`${styles.bodyCopy} ${styles.caseSectionLead}`}>{section.intro}</p>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-10 xl:grid-cols-[.72fr_1.28fr] xl:items-start xl:gap-16">
        <Reveal>
          <div className="space-y-7">
            {section.body.map((paragraph) => (
              <p key={paragraph} className={styles.bodyCopy}>
                {paragraph}
              </p>
            ))}

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              {section.points.map((point, index) => (
                <div key={point.title} className={styles.pedagogyPoint}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{point.title}</h3>
                    <p>{point.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <PedagogyMap locale={locale} />
        </Reveal>
      </div>
    </SectionShell>
  );
}

function ProblemSection({ copy }: { copy: MironlineCaseCopy }) {
  const section = copy.sections.challenge;
  const hasProblemVisual = publicAssetExists(assets.problem);

  return (
    <section
      id="problem"
      className="relative overflow-hidden bg-neutral-black-800/30 py-16 md:py-20 xl:py-24"
    >
      <div className={SITE_SECTION_GUTTERS}>
        <Reveal>
          <StageHeader title={section.title} intro={section.statement} />
        </Reveal>

        {hasProblemVisual ? (
          <Reveal className="mt-12 md:mt-16">
            <MediaAsset
              asset="problem"
              label={copy.assetLabels.problem}
              className={styles.problemVisual}
              sizes="100vw"
            />
          </Reveal>
        ) : null}

        <Reveal className="mt-10 md:mt-12">
          <div className={styles.problemStory}>
            <div className={styles.problemCopy}>
              {section.context.map((paragraph) => (
                <p key={paragraph} className={styles.bodyCopy}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className={styles.problemConstraintsBlock}>
              <p className={styles.microLabel}>{section.constraintsTitle}</p>
              <div className={styles.problemConstraintsGrid}>
                {section.constraints.map((constraint, index) => (
                  <div key={constraint} className={styles.problemConstraint}>
                    <span className={styles.problemConstraintIndex}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p>{constraint}</p>
                  </div>
                ))}
              </div>
            </div>

            {!hasProblemVisual ? (
              <div className={styles.problemReports}>
                <p className={styles.microLabel}>{section.reportsTitle}</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {section.reports.map((report) => (
                    <article key={report.label} className={styles.problemReport}>
                      <span className={styles.problemReportLabel}>{report.label}</span>
                      <p>{report.body}</p>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}
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
      <Reveal>
        <div className={styles.caseSectionHeader}>
          <StageHeader title={section.title} />
          <div className={styles.caseSectionIntro}>
            {section.body.map((paragraph) => (
              <p key={paragraph} className={styles.bodyCopy}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-12 md:mt-16">
        <div className={styles.roleLayout}>
          <div>
            <p className={styles.microLabel}>{section.workflowTitle}</p>
            <div className={styles.roleWorkflow}>
              {section.workflow.map((step, index) => (
                <div key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.roleAside}>
            <div>
              <p className={styles.microLabel}>{section.teamTitle}</p>
              <div className={styles.roleTeam}>
                {section.team.map((member) => <span key={member}>{member}</span>)}
              </div>
            </div>

            <div>
              <p className={styles.microLabel}>{section.reverseTitle}</p>
              <p>{section.reverseBody}</p>
            </div>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}

function ResearchSection({ copy }: { copy: MironlineCaseCopy }) {
  const section = copy.sections.research;

  return (
    <section
      id="research"
      className="relative overflow-hidden bg-neutral-black-900 py-16 md:py-20 xl:py-24"
    >
      <div className={SITE_SECTION_GUTTERS}>
        <Reveal>
          <div className={styles.caseSectionHeader}>
            <StageHeader title={section.title} />
            <p className={`${styles.bodyCopy} ${styles.caseSectionLead}`}>{section.intro}</p>
          </div>
        </Reveal>

        <Reveal className="mt-12 md:mt-14">
          <div className={styles.researchStats}>
            <div className={styles.researchPrimaryStat}>
              <p className={styles.microLabel}>{section.incidenceLabel}</p>
              <p className={styles.researchIncidenceValue}>{section.incidenceValue}</p>
              <p>{section.incidenceNote}</p>
            </div>

            <div className={styles.researchBoardStat}>
              <p className={styles.microLabel}>{section.boardLabel}</p>
              <p className={styles.researchBoardValue}>{section.boardValue}</p>
              <div className={styles.researchBreakdown}>
                {section.boardBreakdown.map((item) => (
                  <div key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
              <p>{section.boardNote}</p>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-14 md:mt-16">
          <p className={styles.microLabel}>{section.questionsTitle}</p>
          <div className={styles.researchQuestionGrid}>
            {section.questions.map((question, index) => (
              <article key={question} className={styles.researchQuestionCard}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{question}</p>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-14 md:mt-16">
          <p className={styles.microLabel}>{section.sourcesTitle}</p>
          <div className={styles.researchSources}>
            {section.signals.map((signal) => (
              <article key={signal.title}>
                <h3>{signal.title}</h3>
                <p>{signal.body}</p>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-14 md:mt-16">
          <p className={styles.microLabel}>{section.hypothesesTitle}</p>
          <div className={styles.researchHypothesesDetailed}>
            {section.hypotheses.map((item, index) => (
              <article key={item.title}>
                <div className={styles.hypothesisTitle}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                </div>
                <div className={styles.hypothesisBody}>
                  <div>
                    <p className={styles.microLabel}>Señal</p>
                    <p>{item.signal}</p>
                  </div>
                  <div>
                    <p className={styles.microLabel}>Supuesto</p>
                    <p>{item.assumption}</p>
                  </div>
                  <div>
                    <p className={styles.microLabel}>Validar con</p>
                    <p>{item.validation}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AnalysisSection({ copy }: { copy: MironlineCaseCopy }) {
  const section = copy.sections.analysis;
  const hasAnalysisVisual = publicAssetExists(assets.analysis);

  return (
    <section
      id="analysis"
      className="relative overflow-hidden bg-neutral-black-800/25 py-16 md:py-20 xl:py-24"
    >
      <div className={SITE_SECTION_GUTTERS}>
        <Reveal>
          <div className={styles.caseSectionHeader}>
            <StageHeader title={section.title} />
            <p className={`${styles.bodyCopy} ${styles.caseSectionLead}`}>{section.intro}</p>
          </div>
        </Reveal>

        {hasAnalysisVisual ? (
          <Reveal className="mt-12 md:mt-16">
            <MediaAsset
              asset="analysis"
              label={copy.assetLabels.analysis}
              className={styles.analysisVisual}
              sizes="100vw"
            />
          </Reveal>
        ) : null}

        <Reveal className="mt-12 md:mt-14">
          <p className={styles.microLabel}>{section.findingsTitle}</p>
          <div className={styles.analysisFindings}>
            {section.findings.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-14 md:mt-16">
          <div className={styles.heuristicIntro}>
            <p className={styles.microLabel}>{section.heuristicTitle}</p>
            <p>{section.heuristicIntro}</p>
          </div>

          <div className={styles.heuristicGrid}>
            {section.heuristics.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.issue}</p>
                  <p>{item.implication}</p>
                </div>
              </article>
            ))}
          </div>

          <a
            href="https://www.nngroup.com/articles/ten-usability-heuristics/"
            target="_blank"
            rel="noreferrer"
            className={styles.heuristicSource}
          >
            Referencia · Nielsen Norman Group ↗
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function DefinitionSection({ copy }: { copy: MironlineCaseCopy }) {
  const section = copy.sections.principles;

  return (
    <SectionShell id="definition">
      <Reveal>
        <div className={styles.caseSectionHeader}>
          <StageHeader title={section.title} />
          <p className={`${styles.bodyCopy} ${styles.caseSectionLead}`}>{section.intro}</p>
        </div>
      </Reveal>

      <Reveal className="mt-12 md:mt-14">
        <div className={styles.definitionChallenge}>
          <p className={styles.microLabel}>{section.challengeLabel}</p>
          <p>{section.challenge}</p>
        </div>
      </Reveal>

      <Reveal className="mt-14 md:mt-16">
        <p className={styles.microLabel}>{section.principlesLabel}</p>
      </Reveal>

      <div className={styles.definitionPrinciples}>
        {section.items.map((item, index) => (
          <Reveal key={item.title} delay={index * 70}>
            <article>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-14 md:mt-16">
        <p className={styles.microLabel}>{section.criteriaTitle}</p>
        <div className={styles.definitionCriteria}>
          {section.criteria.map((criterion, index) => (
            <div key={criterion}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{criterion}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </SectionShell>
  );
}

function IdeationSection({ copy }: { copy: MironlineCaseCopy }) {
  const section = copy.sections.player;

  return (
    <section id="ideation" className="relative overflow-hidden bg-neutral-black-800/25">
      <div className={`${SITE_SECTION_GUTTERS} py-16 md:py-20 xl:py-24`}>
        <Reveal>
          <StageHeader title={section.title} />
        </Reveal>

        <div className="mt-10 grid gap-10 xl:grid-cols-[1.18fr_.82fr] xl:items-center xl:gap-16">
          <Reveal>
            <MediaAsset asset="player" label={copy.assetLabels.player} />
          </Reveal>
          <Reveal delay={100}>
            <div className="max-w-[560px]">
              <p className={styles.microLabel}>{section.statLabel}</p>
              <p className={`${styles.bodyCopy} mt-4`}>{section.intro}</p>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-[13px] leading-relaxed text-neutral-white/48">
                {section.interactions.slice(0, 6).map((interaction) => (
                  <span key={interaction.title}>{interaction.title}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
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

      <div className="mt-16 grid gap-12 xl:grid-cols-[.7fr_1.3fr] xl:items-start">
        <Reveal>
          <p className="text-[12px] tracking-[0.22em] text-accent-purple/70 uppercase">
            {section.feedbackTitle}
          </p>
          <div className="mt-6 space-y-7">
            {section.feedback.map((feedback) => (
              <p key={feedback} className={styles.sectionLeadSmall}>
                {feedback}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="relative pl-0 lg:pl-10">
            <div className={styles.quoteMark}>“</div>
            <p className={`${styles.pullQuote} mt-1 max-w-[860px]`}>
              {section.outcomeBody}
            </p>
            <p className="mt-7 text-[12px] tracking-[0.22em] text-neutral-white/35 uppercase">
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
    <section id="system" className="relative overflow-hidden bg-neutral-black-800/30 py-16 md:py-20 xl:py-24">
      <div className={`${styles.ambient} ${styles.ambientCyan} left-1/2 top-1/3 -translate-x-1/2`} />
      <div className={SITE_SECTION_GUTTERS}>
        <Reveal>
          <div className={styles.caseSectionHeader}>
            <StageHeader title={section.title} />
            <p className={`${styles.bodyCopy} ${styles.caseSectionLead}`}>{section.intro}</p>
          </div>
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
            <p className="text-[12px] tracking-[0.2em] text-neutral-white/35 uppercase">{section.designToCodeLabel}</p>
            <p className="mt-3 text-[14px] leading-relaxed text-neutral-white/70">{section.designToCode}</p>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-[12px] tracking-[0.2em] text-accent-purple/65 uppercase">{section.codeToDesignLabel}</p>
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
      <div className="grid gap-10 xl:grid-cols-[minmax(280px,.72fr)_minmax(0,1.28fr)] xl:items-start xl:gap-16">
        <Reveal>
          <div className={styles.responsiveSticky}>
            <StageHeader title={section.title} />
            <p className={`${styles.bodyCopy} mt-6`}>{section.intro}</p>

            <div className="mt-10 space-y-7">
              {section.points.map((point, index) => (
                <div key={point} className="grid grid-cols-[auto_1fr] gap-4">
                  <span className="pt-[2px] text-[12px] tracking-[0.18em] text-accent-purple/55">
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
      className="relative overflow-hidden bg-neutral-black-800/25 py-16 md:py-20 xl:py-24"
    >
      <div className={`${styles.ambient} ${styles.ambientCyan} -left-64 top-1/3`} />

      <div className={SITE_SECTION_GUTTERS}>
        <Reveal>
          <div className={styles.caseSectionHeader}>
            <StageHeader title={section.title} />
            <p className={`${styles.bodyCopy} ${styles.caseSectionLead}`}>{section.intro}</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-12 xl:grid-cols-[.44fr_1.56fr] xl:items-start xl:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className="mb-6 text-[12px] tracking-[0.22em] text-neutral-white/35 uppercase">
                {section.areasTitle}
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
                  <p className="text-[12px] tracking-[0.22em] text-accent-purple/80 uppercase">
                    {section.threeDTitle}
                  </p>
                  <p className="mt-4 max-w-[560px] text-[14px] leading-relaxed text-neutral-white/62 md:text-[15px]">
                    {section.threeDBody}
                  </p>
                </div>

                <div className="md:pt-[2px]">
                  <p className="text-[12px] tracking-[0.22em] text-neutral-white/30 uppercase">
                    {section.flowTitle}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3 text-[12px] tracking-[0.08em] text-neutral-white/48 uppercase md:text-[12px]">
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
                    <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.2em] text-accent-lime/70 uppercase">
                      <span className="h-1 w-1 rounded-full bg-accent-lime" aria-hidden="true" />
                      {section.interactiveLabel}
                    </span>
                    <a
                      href={`https://sketchfab.com/3d-models/the-muskuloskeletal-system-${sketchfabUid}`}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 text-[12px] tracking-[0.18em] text-neutral-white/32 uppercase transition-colors hover:text-accent-purple focus-visible:outline-none focus-visible:text-accent-purple"
                    >
                      {section.externalLabel}
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

      <div className="mt-12 grid gap-10 xl:grid-cols-[minmax(0,1.5fr)_minmax(260px,.5fr)] xl:items-center xl:gap-14">
        <Reveal>
          <MediaAsset asset="teacher" label={copy.assetLabels.teacher} index="09"  />
        </Reveal>

        <Reveal delay={100}>
          <div className="space-y-5 md:space-y-6 lg:pl-2 xl:pl-4">
            {section.points.map((point, index) => (
              <div key={point}>
                <div className="text-[12px] tracking-[0.18em] text-neutral-white/25">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className={`${styles.cardTitle} mt-1`}>
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
  const hasAnalyticsVisual = publicAssetExists(assets.analytics);

  return (
    <section id="validation" className="relative overflow-hidden bg-neutral-black-800/25 py-16 md:py-20 xl:py-24">
      <div className={SITE_SECTION_GUTTERS}>
        <Reveal>
          <div className={styles.caseSectionHeader}>
            <StageHeader title={section.title} />
            <p className={`${styles.bodyCopy} ${styles.caseSectionLead}`}>{section.intro}</p>
          </div>
        </Reveal>

        {hasAnalyticsVisual ? (
          <Reveal className="mx-auto mt-10 max-w-[1050px]">
            <MediaAsset asset="analytics" label={copy.assetLabels.analytics} />
          </Reveal>
        ) : null}

        <div className={`${hasAnalyticsVisual ? "mt-12" : "mt-10"} grid gap-6 sm:grid-cols-2 xl:grid-cols-4`}>
          {section.sources.map((source, index) => (
            <Reveal key={source.title} delay={index * 60}>
              <article className="h-full border-t border-neutral-white/10 pt-5">
                <p className={styles.microLabel}>{source.title}</p>
                <p className="mt-3 text-[14px] leading-relaxed text-neutral-white/58">{source.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 text-[12px] tracking-[0.06em] text-neutral-white/42 uppercase">
            {section.loop.map((step, index) => (
              <span key={`${step}-${index}`} className="contents">
                <span>{step}</span>
                {index < section.loop.length - 1 ? <span className="text-accent-purple/45">→</span> : null}
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
    <section id="results" className={`${styles.metricSweep} relative overflow-hidden py-16 md:py-20 xl:py-24`}>
      <div className={`${styles.ambient} ${styles.ambientPurple} -right-64 top-0`} />
      <div className={`${SITE_SECTION_GUTTERS} relative z-10`}>
        <Reveal>
          <div className={styles.caseSectionHeader}>
            <StageHeader title={section.title} />
            <p className={`${styles.bodyCopy} ${styles.caseSectionLead}`}>{section.intro}</p>
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
                  <p className="mt-3 max-w-sm text-[12px] leading-relaxed text-neutral-white/35">{stat.note}</p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="text-[12px] tracking-[0.22em] text-accent-purple/70 uppercase">
              {section.supportTitle}
            </p>
            <p className={`${styles.bodyCopy} mt-5`}>
              {section.supportBody}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <p className="text-[12px] tracking-[0.22em] text-neutral-white/35 uppercase">
              {section.productTitle}
            </p>
            <p className={`${styles.bodyCopy} mt-5`}>
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
  const hasBeyondVisual = publicAssetExists(assets.beyond);

  return (
    <section id="beyond" className="relative overflow-hidden bg-neutral-black-800/25 py-16 md:py-20 xl:py-24">
      <div className={`${SITE_SECTION_GUTTERS}`}>
        <Reveal>
          <StageHeader title={section.title} />
        </Reveal>

        <div className={`mt-12 grid gap-12 ${hasBeyondVisual ? "lg:grid-cols-[1.28fr_.72fr] lg:items-start xl:gap-20" : "lg:grid-cols-[1fr_.8fr] lg:items-start xl:gap-20"}`}>
          {hasBeyondVisual ? (
            <Reveal>
              <MediaAsset asset="beyond" label={copy.assetLabels.beyond} />
            </Reveal>
          ) : (
            <Reveal>
              <div className="max-w-[760px] space-y-6">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className={styles.bodyCopy}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          )}

          <Reveal delay={100}>
            {hasBeyondVisual ? (
              <div className="space-y-6 lg:pt-8">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className={styles.bodyCopy}>{paragraph}</p>
                ))}
              </div>
            ) : null}

            <div className={hasBeyondVisual ? "mt-14" : "mt-0"}>
              <div className={styles.quoteMark}>“</div>
              <blockquote className={`${styles.sectionLead} max-w-[680px]`}>
                {section.quote}
              </blockquote>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-20 md:mt-28">
          <div className="relative overflow-hidden bg-[radial-gradient(80%_140%_at_100%_0%,rgba(20,177,255,.10),transparent_60%)] py-10 md:py-14">
            <div className="pointer-events-none absolute right-[-2%] top-1/2 -translate-y-1/2 select-none text-[clamp(4rem,8vw,7rem)] font-bold leading-none tracking-[-.08em] text-neutral-white/[0.025] uppercase">
              mironline
            </div>
            <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-[12px] tracking-[0.22em] text-accent-purple/65 uppercase">
                  {copy.cta.label}
                </p>
                <h2 className={`${styles.sectionTitle} mt-4 text-left uppercase`}>{copy.cta.title}</h2>
                <p className={`${styles.bodyCopy} mt-5 max-w-[820px]`}>{copy.cta.body}</p>
              </div>
              <Link href={`/${locale}/#projects`} className={`${SITE_PRIMARY_BUTTON} inline-flex w-fit items-center gap-3 px-7 py-3.5 text-[14px]`}>
                {copy.cta.button}
                <span aria-hidden className="text-[20px] leading-none">↗</span>
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
      <ProductSection copy={copy} />
      <AudienceSection copy={copy} />
      <ProblemSection copy={copy} />
      <PedagogySection locale={locale} copy={copy} />
      <ResearchSection copy={copy} />
      <AnalysisSection copy={copy} />
      <DefinitionSection copy={copy} />
      <RoleSection copy={copy} />
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
