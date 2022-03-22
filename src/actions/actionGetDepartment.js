const getDepartmentMethod = async () => {
  // const URL = "https://api-landing-pheni.herokuapp.com/api/department";
  const URL = "http://10.20.2.201:5000/department";
  const response = await fetch(URL, { method: "GET" });
  const data = await response.json();
  return data;
};

const getProgramMethod = async () => {
  // const URL = "https://api-landing-pheni.herokuapp.com/api/program";
  const URL = "http://10.20.2.201:5000/program";
  const response = await fetch(URL, { method: "GET" });
  const data = await response.json();
  return data;
};

export const getDepartmentRequest = () => {
  return {
    type: "GET_DEPARTMENT_REQUEST",
  };
};

export const getDepartmentSuccess = (data) => {
  return {
    type: "GET_DEPARTMENT_SUCCESS",
    payload: data,
  };
};

export const getDepartmentError = () => {
  return {
    type: "GET_DEPARTMENT_ERROR",
  };
};

export const getProgramRequest = () => {
  return {
    type: "GET_PROGRAM_REQUEST",
  };
};

export const getProgramSuccess = (data) => {
  return {
    type: "GET_PROGRAM_SUCCESS",
    payload: data,
  };
};

export const getProgramError = () => {
  return {
    type: "GET_PROGRAM_ERROR",
  };
};

export const getDepartment = async (dispatch) => {
  dispatch(getDepartmentRequest());
  const result = await getDepartmentMethod();

  if (!!result) {
    dispatch(getDepartmentSuccess(result));
  } else dispatch(getDepartmentError());
};

export const getProgram = async (dispatch) => {
  dispatch(getProgramRequest());
  const result = await getProgramMethod();

  if (!!result) {
    dispatch(getProgramSuccess(result));
  } else dispatch(getProgramError());
};
