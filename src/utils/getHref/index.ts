import { RoutesName } from "@/core/constants/routesName";
import { Language } from "@/lib/i18n/settings";

export const getHref = ({
  lng,
  destination,
}: {
  lng: Language;
  destination: RoutesName | string;
}) => {
  return `/${lng}${destination}`;
};
