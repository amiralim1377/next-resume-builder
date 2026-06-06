type JalaliDataType = {
  month_fa: string;
  month_shamsi: string;
};

type GregorianDataType = {
  month_en: string;
};

export type MonthsDataType = {
  jalali: JalaliDataType[];
  gregorian: GregorianDataType[];
};

const monthsData: MonthsDataType = {
  jalali: [
    {
      month_fa: "آوریل",
      month_shamsi: "فروردین",
    },
    {
      month_fa: "مه",
      month_shamsi: "اردیبهشت",
    },
    {
      month_fa: "ژوئن",
      month_shamsi: "خرداد",
    },
    {
      month_fa: "جولای",
      month_shamsi: "تیر",
    },
    {
      month_fa: "آگوست",
      month_shamsi: "مرداد",
    },
    {
      month_fa: "سپتامبر",
      month_shamsi: "شهریور",
    },
    {
      month_shamsi: "مهر",
      month_fa: "اکتبر",
    },
    {
      month_fa: "نوامبر",
      month_shamsi: "آبان",
    },
    {
      month_fa: "دسامبر",
      month_shamsi: "آذر",
    },
    {
      month_fa: "ژانویه",
      month_shamsi: "دی",
    },
    {
      month_fa: "فوریه",
      month_shamsi: "بهمن",
    },
    {
      month_fa: "مارس",
      month_shamsi: "اسفند",
    },
  ],
  gregorian: [
    {
      month_en: "January",
    },
    {
      month_en: "February",
    },
    {
      month_en: "March",
    },
    {
      month_en: "April",
    },
    {
      month_en: "May",
    },
    {
      month_en: "June",
    },
    {
      month_en: "July",
    },
    {
      month_en: "August",
    },
    {
      month_en: "September",
    },
    {
      month_en: "October",
    },
    {
      month_en: "November",
    },
    {
      month_en: "December",
    },
  ],
};

export { monthsData };
