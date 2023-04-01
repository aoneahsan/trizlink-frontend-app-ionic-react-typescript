export type ZaionsKeyFeatureType = {
  id?: string | number;
  icon: string;
  title: string;
  text: string;
  link: {
    text: string;
    url: string;
  };
  animation: string; // the gif/video/image used displayed when hovered over this item tile.
};
