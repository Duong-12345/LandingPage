const postData = async (data) => {
  const URL = "http://10.20.2.201:5000/registration";
  // const URL = "https://api-landing-pheni.herokuapp.com/api";
  // const URL = "https://615ab6234a360f0017a81212.mockapi.io/api/demo/Form";
  // console.log(JSON.stringify(data));
  return fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => Promise.all([response, response.json()]));
};

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
