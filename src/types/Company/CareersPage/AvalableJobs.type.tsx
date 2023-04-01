export type ZaionsJobsType = {
  id?: string;
  JobTitle: string;
  JobPlace: string;
  ApplyLink: string;
  categories?: {
    categoryId: string;
    categoryName: string;
  };
};
