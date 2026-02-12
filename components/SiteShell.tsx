import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Props = {
  children: React.ReactNode;
  showFooter?: boolean;
};

export default function SiteShell({ children, showFooter = true }: Props) {
  return (
    <main className="bg-neutral-black-900 min-h-screen">
      <Navbar />
      {children}
      {showFooter ? <Footer /> : null}
    </main>
  );
}
