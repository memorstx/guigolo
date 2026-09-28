import { redirect } from "next/navigation";
export default async function OldBongodexProductRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(`/${locale === "en" ? "en" : "es"}/projects/bongodex/platform`);
}
