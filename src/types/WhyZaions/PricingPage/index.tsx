export type ZaionsPricingSubscriptionsType = {
  id?: string;
  label: string;
  price: string;
  priceDuration?: string;
  sale_price?: string;
  annualCharge?: string;
  limit_text: string;
  features_title: string;
  features_included: {
    feature_id?: string;
    icon: string;
    text: string;
    new?: boolean | undefined;
  }[];
  link?: string;
  extra_data?: unknown;
};

export type ZaionsPricingFeaturePlanType = string | boolean | null | undefined;

export type ZaionsPricingFeatureDetailType = {
  id?: string;
  section_heading: string;
  new?: boolean;
  features: {
    feature_id?: string;
    feature_title?: string;
    plan1?: ZaionsPricingFeaturePlanType; // "true = check", "false = -", "string = text",
    plan2?: ZaionsPricingFeaturePlanType;
    plan3?: ZaionsPricingFeaturePlanType;
    plan4?: ZaionsPricingFeaturePlanType;
    plan5?: ZaionsPricingFeaturePlanType;
    destil?: string;
    type?: 'feature' | 'info';
    info?: {
      text?: string;
      link?: {
        text?: string;
        url?: string;
      };
    };
  }[];
};
