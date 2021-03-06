import { getDistrictMethod, getProvinceMethod } from "./api";

export const getProvinceRequest = () => {
  return {
    type: "GET_PROVINCE_REQUEST",
  };
};

export const getProvinceSuccess = (data) => {
  return {
    type: "GET_PROVINCE_SUCCESS",
    payload: data,
  };
};

export const getProvinceError = () => {
  return {
    type: "GET_PROVINCE_ERROR",
  };
};

export const getDistrictRequest = () => {
  return {
    type: "GET_DISTRICT_REQUEST",
  };
};

export const getDistrictSuccess = (data) => {
  return {
    type: "GET_DISTRICT_SUCCESS",
    payload: data,
  };
};

export const getDistrictError = () => {
  return {
    type: "GET_DISTRICT_ERROR",
  };
};

export const getProvince = async (dispatch) => {
  dispatch(getProvinceRequest());
  const result = await getProvinceMethod();

  if (!!result) {
    dispatch(getProvinceSuccess(result));
  } else dispatch(getProvinceError());
};

export const getDistrict = async (dispatch) => {
  dispatch(getDistrictRequest());
  const result = await getDistrictMethod();

  if (!!result) {
    dispatch(getDistrictSuccess(result));
  } else dispatch(getDistrictError());
};
