import { CustomControlledSelect } from "@/components/ui/CustomControlledSelect";
import { TFunction } from "i18next";
import { useGetBasicInfoStepData } from "../../hooks/useGetBasicInfoStepData";
import { useLang } from "@/provider/lngProvider";
import { useWatch } from "react-hook-form";
import { CustomControlledInput } from "@/components/ui/CustomControlledInput";

type LocationDetailsProps = {
  t: TFunction<string, undefined>;
};

const LocationDetails = ({ t }: LocationDetailsProps) => {
  const { lng } = useLang();

  const countryWatch = useWatch({
    name: "basicInfo.location.country",
    exact: true,
  });

  const provinceId = useWatch({
    name: "basicInfo.location.province",
    exact: true,
  });

  const isIranSelected = countryWatch === "Iran";

  const { countryOptions, provinceOptions, cityOptions } =
    useGetBasicInfoStepData({
      t,
      lng,
      provinceId,
    });

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
      <div className="lg:col-span-2">
        <CustomControlledSelect
          options={countryOptions}
          label={t("country")}
          name="basicInfo.location.country"
        />
      </div>

      <div className="lg:col-span-2">
        {isIranSelected ? (
          <CustomControlledSelect
            options={provinceOptions}
            label={t("province")}
            name="basicInfo.location.province"
            disabled={!countryWatch}
          />
        ) : (
          <CustomControlledInput
            name="basicInfo.location.province"
            label={t("province")}
            disabled={!countryWatch}
          />
        )}
      </div>

      <div className="lg:col-span-2">
        {isIranSelected ? (
          <CustomControlledSelect
            name="basicInfo.location.city"
            label={t("city")}
            options={cityOptions}
            disabled={!provinceId}
          />
        ) : (
          <CustomControlledInput
            name="basicInfo.location.city"
            label={t("city")}
            disabled={!countryWatch}
          />
        )}
      </div>

      <div className="lg:col-span-6">
        <CustomControlledInput name="basicInfo.address" label={t("address")} />
      </div>
    </div>
  );
};

export { LocationDetails };
