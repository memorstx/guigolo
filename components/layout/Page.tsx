type PageProps = {
  children: React.ReactNode;
  className?: string;
};

export function Page({ children, className = "" }: PageProps) {
  return (
    <div className={["mx-auto max-w-4xl px-6 py-20", className].join(" ")}>
      {children}
    </div>
  );
}

type StackProps = {
  children: React.ReactNode;
  className?: string;
};

export function Stack({ children, className = "" }: StackProps) {
  return (
    <div className={["space-y-16", className].join(" ")}>
      {children}
    </div>
  );
}

type SectionProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export function PageSection({ title, children, className = "" }: SectionProps) {
  return (
    <section className={["space-y-6", className].join(" ")}>
      {title ? <h2 className="text-2xl font-semibold">{title}</h2> : null}
      {children}
    </section>
  );
}
