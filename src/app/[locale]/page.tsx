import { HomePage } from "@/components/pages/HomePage";
import { ConditionalRenderer } from "@/components/shared/ConditionalRenderer";
import { Language } from "@/lib/i18n/settings";

interface IHomePageProps {
  params: Promise<{ locale: Language }>;
}

async function Home({ params }: IHomePageProps) {
  return <ConditionalRenderer mobile={<HomePage />} desktop={<HomePage />} />;
}

export default Home;
