import AppFooter from "./_components/footer";
import { HeroHeader } from "./_components/hero-header";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <HeroHeader className="pb-10" />
      {children}
      <AppFooter />
    </div>
  );
}
