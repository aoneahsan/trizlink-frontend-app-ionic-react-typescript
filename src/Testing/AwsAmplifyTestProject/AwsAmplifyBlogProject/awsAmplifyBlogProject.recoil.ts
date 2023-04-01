import { atom } from 'recoil';
import { AwsAmplifyBlogPostsData } from './awsAmplifyBlogProject.data';
import {
  AwsAmplifyBlogPostType,
  AwsAmplifyBlogProjectAuthData,
} from './awsAmplifyBlogProject.type';

export const AwsAmplifyBlogPostRState = atom<AwsAmplifyBlogPostType[]>({
  key: 'AwsAmplifyBlogPostRState_key',
  default: AwsAmplifyBlogPostsData,
});

export const AwsAmplifyBlogProjectAuthRState =
  atom<AwsAmplifyBlogProjectAuthData | null>({
    key: 'AwsAmplifyBlogProjectAuthRState_key',
    default: null,
  });
