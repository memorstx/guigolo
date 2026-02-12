type PageFrameProps = {
  children: React.ReactNode;
  className?: string;
  /**
   * "prose" para contenido principalmente textual (blog posts, docs, etc) con un ancho de lectura óptimo.
   * "wide" para contenido más visual o que se beneficie de un ancho mayor.
   */
  variant?: "prose" | "wide";
};

export default function PageFrame({
  children,
  className = "",
  variant = "prose",
}: PageFrameProps) {
  const width =
    variant === "prose" ? "max-w-[820px]" : "max-w-6xl";

  return (
    <div className={["px-6 md:px-10", className].join(" ")}>
      <div className={["mx-auto w-full", width].join(" ")}>
        {children}
      </div>
    </div>
  );
}
