import { AboutSite } from "./components/aboutSite";
import { ConnectWithUs } from "./components/connectWithUs";
import { QuickLinks } from "./components/quickLinks";

function Footer() {
  return (
    <div className="bg-brandFooter mx-auto grid max-w-300 grid-cols-1 justify-items-center-safe py-16 md:grid-cols-3">
      <AboutSite />
      <QuickLinks />
      <ConnectWithUs />
    </div>
  );
}

export { Footer };
