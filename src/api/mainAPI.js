import axios from 'axios';
import { IsValidString, IsValidStatusCode } from './Validation';
import STRINGS from '_components/constants/strings';

import isInterNetConnected from './NetworkInfo';

export const axiosInstance = axios.create({
  baseURL: STRINGS.BASE_URL,
  timeout: 5 * 60 * 1000,
});

axiosInstance.interceptors.request.use((currentRequest) => {
  //console.log('current request : ', currentRequest);
  return currentRequest;
});

axiosInstance.interceptors.response.use((currentResponse) => {
  // console.log('current response : ', currentResponse);
  return currentResponse;
});

const GetResponseClass = () => {
  return {
    isAuthorized: false,
    status: false,
    data: STRINGS.UNABLE_TO_PROCESS_REQUEST,
  };
};

const GetFormData = (jsonRequest) => {
  let form = new FormData();
  form.append('Request', `${jsonRequest}`);

  return form;
};

export const PostAPI = async (request, url) => {
  let response = GetResponseClass();

  if (!(await isInterNetConnected())) {
    response.isAuthorized = true;
    response.status = false;
    response.data = 'No internet connection';
    return response;
  }

  let form = GetFormData(request);

  try {
    let auth = 'ffsdfsdfsdsdfsd';

    const { status, data } = await axiosInstance.post(url, form, {
      headers: {
        Authorization: 'Bearer ' + auth,
      },
    });

    //  logPrint(url, status, data)
    return ParseResponse(status, data, response);
  } catch (error) {
    console.log(url, 'error:' + error);
    return ParseErrorResponse(error, response);
  }
};

export const ParseResponse = (status, data, response) => {
  if (!IsValidStatusCode(status)) {
    response.data = STRINGS.UNABLE_TO_PROCESS_REQUEST;
    return response;
  }

  if (status !== 200) {
    response.data = STRINGS.UNABLE_TO_PROCESS_REQUEST + ' : ' + status;
    return response;
  }
  if (status === 401) {
    response.data = STRINGS.UNABLE_TO_PROCESS_REQUEST + ' : ' + status;
    response.isAuthorized = false;
    return response;
  }

  if (!IsValidString(data.body)) {
    response.data = STRINGS.UNABLE_TO_PROCESS_REQUEST;
    return response;
  }

  if (!IsValidString(data.body)) {
    response.data = STRINGS.UNABLE_TO_PROCESS_REQUEST;
    return response;
  }

  response.isAuthorized = true;
  response.status = data.status;
  response.data = data.body;

  return response;
};

const ParseErrorResponse = (error, returnResponse) => {
  if (error.message === 'Network Error') {
    returnResponse.Message = error;

    return returnResponse;
  }
  returnResponse.Message = 'Request failed with : ' + error.response.status;
  if (error.response.status === 401) {
    returnResponse.Message = STRINGS.UNAUTHORIZED_ERROR;
  }
  return returnResponse;
};
