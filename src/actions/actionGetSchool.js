const getSchoolMethod = async () => {
  const URL = "https://615ab6234a360f0017a81212.mockapi.io/api/demo/School";
  const response = await fetch(URL, { method: "GET" });
  const data = await response.json();
  return data;
};

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
