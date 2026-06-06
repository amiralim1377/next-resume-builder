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

  const countryWatch = useWatch({ name: "basicInfo.country", exact: true });
  const provinceId = useWatch({ name: "basicInfo.province", exact: true });
  const isIranSelected = countryWatch === "Iran";

  const { countryOptions, provinceOptions, cityOptions } =
    useGetBasicInfoStepData({
      t,
      lng,
      provinceId,
    });

  return (
    <div className="grid grid-cols-6 grid-rows-1 gap-4">
      <CustomControlledSelect
        options={countryOptions}
        label={t("country")}
        name="basicInfo.country"
      />
      {isIranSelected ? (
        <CustomControlledSelect
          options={provinceOptions}
          label={t("province")}
          name="basicInfo.province"
          disabled={countryWatch === undefined}
        />
      ) : (
        <CustomControlledInput
          name="basicInfo.province"
          label={t("province")}
          disabled={
            countryWatch === undefined ||
            countryWatch === "" ||
            !Boolean(countryWatch)
          }
        />
      )}

      {isIranSelected ? (
        <CustomControlledSelect
          name="basicInfo.city"
          label={t("city")}
          options={cityOptions}
          disabled={provinceId === undefined}
        />
      ) : (
        <CustomControlledInput
          name="basicInfo.city"
          label={t("city")}
          disabled={countryWatch === undefined || countryWatch === ""}
        />
      )}
      <div className="col-span-3">
        <CustomControlledInput
          name="basicInfo.address"
          label={t("address")}
          disabled={
            countryWatch === undefined ||
            countryWatch === "" ||
            !Boolean(countryWatch)
          }
        />
      </div>
    </div>
  );
};

export { LocationDetails };
