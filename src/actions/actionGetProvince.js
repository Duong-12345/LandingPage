const getProvinceMethod = async () => {
  const URL = "https://615ab6234a360f0017a81212.mockapi.io/api/demo/Province";
  const response = await fetch(URL, { method: "GET" });
  const data = await response.json();
  return data;
};

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

export const getProvince = async (dispatch) => {
  dispatch(getProvinceRequest());
  const result = await getProvinceMethod();

  if (!!result) {
    dispatch(getProvinceSuccess(result));
  } else dispatch(getProvinceError());
};
