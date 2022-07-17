import { getSchoolMethod } from "./api";


export const getSchoolRequest = () => {
  return {
    type: "GET_SCHOOL_REQUEST",
  };
};

export const getSchoolSuccess = (data) => {
  return {
    type: "GET_SCHOOL_SUCCESS",
    payload: data,
  };
};

export const getSchoolError = () => {
  return {
    type: "GET_SCHOOL_ERROR",
  };
};

export const getSchool = async (dispatch) => {
  dispatch(getSchoolRequest());
  const result = await getSchoolMethod();

  if (!!result) {
    dispatch(getSchoolSuccess(result));
  } else dispatch(getSchoolError());
};
