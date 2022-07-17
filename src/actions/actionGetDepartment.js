import { getDepartmentMethod, getProgramMethod } from "./api";

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
