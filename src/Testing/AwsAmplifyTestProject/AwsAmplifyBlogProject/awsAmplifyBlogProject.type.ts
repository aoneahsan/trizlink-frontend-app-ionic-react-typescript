export type AwsAmplifyBlogPostType = {
  id?: string;
  title: string;
  body: string;
};

export type AwsAmplifyBlogPostFormErrorType = {
  title?: string;
  body?: string;
};

export type AwsAmplifyBlogProjectAuthData = {
  id?: string;
  username?: string;
  attributes?: {
    email?: string;
    email_verified?: boolean;
    sub?: string;
  };
};
