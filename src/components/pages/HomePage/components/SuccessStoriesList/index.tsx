import { TFunction } from "i18next";
import {
  SuccessStoriesCard,
  SuccessStoriesCardProps,
} from "../SuccessStoriesCard";
import amiralimoradiniaImage from "@public/images/IMG_20251101_203439_943.jpg";

type SuccessStoriesListProps = {
  t: TFunction<string, undefined>;
};

function SuccessStoriesList({ t }: SuccessStoriesListProps) {
  const SuccessStoriesListDataArray: SuccessStoriesCardProps[] = [
    {
      initialRating: 5,
      stories: t("firstSuccessStories"),
      userName: t("amirAliMoradiNia"),
      label: t("froneEndDeveloper"),
      avatarShape: "circle",
      avatarSrc: amiralimoradiniaImage,
      avatarStatus: "online",
    },
    {
      initialRating: 5,
      stories: t("secondSuccessStories"),
      userName: t("sabaMoradiNia"),
      label: t("AdministrativeStaff"),
      avatarShape: "circle",
    },
    {
      initialRating: 5,
      stories: t("thirdSuccessStories"),
      userName: t("meysamAhmadVand"),
      label: t("financeManager"),
      avatarShape: "circle",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-10 py-5 lg:grid-cols-3">
      {SuccessStoriesListDataArray.map((storiesItem, i) => {
        return (
          <SuccessStoriesCard
            {...storiesItem}
            avatarAlt={storiesItem.userName}
            key={i}
          />
        );
      })}
    </div>
  );
}

export { SuccessStoriesList };
