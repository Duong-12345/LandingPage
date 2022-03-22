const getSchoolMethod = async () => {
  const URL = "http://10.20.2.201:5000/school";
  // const URL = "https://api-landing-pheni.herokuapp.com/api/school";
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
