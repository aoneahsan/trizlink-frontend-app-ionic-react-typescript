export interface ZaionsHpCPDataType {
  id: string | number;
  icon: string;
  title: string;
  text: string;
  featureListTitle: string;
  featureListItem: Array<{
    id: string | number;
    featureIcon: string;
    fetureText: string;
  }>;
  primaryBtnText: string;
  secondaryBtnText: string;
  extraData?: string | boolean | number | [];
}
