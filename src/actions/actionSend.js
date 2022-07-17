import { postData } from "./api";

export const postDataRequest = () => {
  console.log(1);
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
export const postDataError = (error) => {
  return {
    type: "POST_DATA_ERROR",
    error: error,
  };
};

export const postDataForm = async (data, dispatch) => {
  try {
    dispatch(postDataRequest());
    let resultPost = await postData(data);
    dispatch(postDataSuccess(resultPost));
    // console.log(resultPost[0]);
    // if (!!resultPost) {
    //   dispatch(postDataSuccess(resultPost));
    //   return false
    // } else {
    //   dispatch(postDataError(resultPost));
    //   return true
    // }
  } catch (err) {
    console.error(err);
    dispatch(postDataError());
  }
};
