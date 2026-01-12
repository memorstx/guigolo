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

function Module({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/5 px-3 py-2">
      <p className="text-[10px] tracking-widest uppercase text-white/40">
        MODULE · {label}
      </p>
      <p className="mt-1 text-sm text-white/80">{value}</p>
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
          <Module label="STATUS" value={project.status} />
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
