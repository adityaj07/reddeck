import AppFooter from "./_components/footer";
import { Navbar } from "./_components/navbar";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar className="pb-10" />
      {children}
      <AppFooter />
    </div>
  );
}
