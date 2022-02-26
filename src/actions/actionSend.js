const postData = async (data) => {
  const URL = "http://localhost:8080/api/v1/post-infor";
  console.log(JSON.stringify(data));
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
