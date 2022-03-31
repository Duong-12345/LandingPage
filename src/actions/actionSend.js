import { postData } from "./api";


export const postDataRequest = () => {
  return {
    type: "POST_DATA_REQUEST",
  };
};
export const postDataSuccess = (data) => {
  return {
    type: "POST_DATA_SUCCESS",
    payload: data,
  };
};
export const postDataError = () => {
  return {
    type: "POST_DATA_ERROR",
  };
};

export const postDataForm = async (data, dispatch) => {
  dispatch(postDataRequest());
  const resultPost = await postData(data);
  if (!!resultPost) {
    dispatch(postDataSuccess(resultPost));
  } else {
    dispatch(postDataError());
  }
};
