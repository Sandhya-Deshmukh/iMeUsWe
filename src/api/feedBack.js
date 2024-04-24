import { PostAPI, AsyncDataStoragePostAPI } from './mainAPI';
export const FeedBack = async (request) => {
  return PostAPI(
    request,
    'https://6627f6beb625bf088c0a677c.mockapi.io/api/feedback',
  );
};
