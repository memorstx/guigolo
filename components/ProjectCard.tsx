type Project = {
  title: string;
  tagline: string;
  context: string;
  stack: string;
  role: string;
  status: string;
  access: string;
  linkLabel?: string;
  linkHref?: string;
};

function statusClass(status: string) {
  const s = status.toUpperCase();

  if (s.includes("LIVE")) return "text-lime-300 border-lime-300/30 bg-lime-300/10";
  if (s.includes("CASE")) return "text-cyan-300 border-cyan-300/30 bg-cyan-300/10";
  if (s.includes("CONCEPT")) return "text-fuchsia-300 border-fuchsia-300/30 bg-fuchsia-300/10";
  if (s.includes("EXPERIMENT")) return "text-purple-300 border-purple-300/30 bg-purple-300/10";
  if (s.includes("ARCHIVED") || s.includes("DISCONTINUED"))
    return "text-white/60 border-white/15 bg-white/5";

  return "text-white/70 border-white/10 bg-white/5";
}

function Module({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "status";
}) {
  const toneClasses =
    tone === "status"
      ? statusClass(value)
      : "text-white/80 border-white/10 bg-white/5";

  return (
    <div className={`rounded-md border px-3 py-2 ${toneClasses}`}>
      <p className="text-[10px] tracking-widest uppercase text-white/40">
        MODULE · {label}
      </p>
      <p className="mt-1 text-sm">{value}</p>
    </div>
  );
}


export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="max-w-xl">
          <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
          <p className="mt-3 text-white/70">{project.tagline}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full md:max-w-md">
          <Module label="CONTEXT" value={project.context} />
          <Module label="STATUS" value={project.status} tone="status" />
          <Module label="STACK" value={project.stack} />
          <Module label="ROLE" value={project.role} />
          <Module label="ACCESS" value={project.access} />

          {project.linkLabel && project.linkHref ? (
            <a
              href={project.linkHref}
              className="rounded-md border border-white/10 bg-white/5 px-3 py-2 hover:border-white/30 transition"
              target="_blank"
              rel="noreferrer"
            >
              <p className="text-[10px] tracking-widest uppercase text-white/40">
                MODULE · LINK
              </p>
              <p className="mt-1 text-sm text-lime-300">{project.linkLabel} ↗</p>
            </a>
          ) : (
            <Module label="LINK" value="—" />
          )}
        </div>
      </div>
    </div>
  );
}
