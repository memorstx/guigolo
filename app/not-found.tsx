import NotFoundClient from "@/components/NotFoundClient";

export const metadata = {
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundClient />;
}
