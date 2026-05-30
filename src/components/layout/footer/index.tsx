import { AboutSite } from "./components/aboutSite";
import { ConnectWithUs } from "./components/connectWithUs";
import { QuickLinks } from "./components/quickLinks";

function Footer() {
  return (
    <div className="bg-brandFooter mx-auto grid max-w-300 grid-cols-1 space-y-10 p-16 lg:grid-cols-3 lg:justify-items-center">
      <AboutSite />
      <QuickLinks />
      <ConnectWithUs />
    </div>
  );
}

export { Footer };
