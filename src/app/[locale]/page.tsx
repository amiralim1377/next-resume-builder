import { useTranslation as getTranslation } from "@/lib/i18n/server";
import { Language } from "@/lib/i18n/settings";

interface IHomePageProps {
  params: Promise<{ locale: Language }>;
}

async function Home({ params }: IHomePageProps) {
  const { locale } = await params;

  const { t } = await getTranslation(locale, "home");
  return <div>{t("ansar")}</div>;
}

export default Home;
