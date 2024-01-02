export interface ZaionsPricingSubscriptionsType {
  id?: string;
  label: string;
  price: string;
  priceDuration?: string;
  sale_price?: string;
  annualCharge?: string;
  limit_text: string;
  features_title: string;
  features_included: Array<{
    feature_id?: string;
    icon: string;
    text: string;
    new?: boolean | undefined;
  }>;
  link?: string;
  extra_data?: unknown;
}

export interface ZaionsPricingI {
  id?: string;
  displayName: string;
  monthlyPrice: number;
  annualPrice: number;
  monthlyDiscountedPrice: number;
  annualDiscountedPrice: number;
  featureListTitle: string;
  features?: Array<{ text: string }>;
  currency: string;
  description: string;
  isMostPopular: boolean;
  isActive: boolean;
}

export type ZaionsPricingFeaturePlanType = string | boolean | null | undefined;

export interface ZaionsPricingFeatureDetailType {
  id?: string;
  section_heading: string;
  new?: boolean;
  features: Array<{
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
  }>;
}
