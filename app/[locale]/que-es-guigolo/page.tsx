import { redirect } from "next/navigation";

export default async function QueEsGuigolo({
  params,
}: {
  params: Promise<{ locale: "es" | "en" }>;
}) {
  const { locale } = await params;

  // Solo existe como alias en español
  if (locale !== "es") redirect(`/${locale}`);

  redirect("/es/what-is-guigolo");
}
