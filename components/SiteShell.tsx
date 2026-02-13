import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDict } from "@/lib/i18n/getDict";

type Props = {
  children: React.ReactNode;
  showFooter?: boolean;
};

export default function SiteShell({
  children,
  locale,
  showFooter = true,
}: Props & {
  children: React.ReactNode;
  locale: "es" | "en";
}) {
const dict = getDict(locale);

  return (
    <main className="bg-neutral-black-900 min-h-screen">
      <Navbar dict={dict} />
      {children}
      {showFooter ? <Footer /> : null}
    </main>
  );
}
