const url = "https://campusvisit.phenikaa-uni.edu.vn/api/";
// const url = "http://10.20.2.238:5000/";


export const postData = async (data) => {
    // const URL = "http://10.20.2.238:5000/registration";
  // const URL = `${url}registration`;
  const URL = "https://api-landing-pheni.herokuapp.com/api1";
  // console.log(JSON.stringify(data));

  return fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => Promise.all([response, response.json()]))
  // .catch(err => console.log(err))
};

export const getProvinceMethod = async () => {
  const URL = `${url}province`;
  // const URL = "https://api-landing-pheni.herokuapp.com/api/province";
  const response = await fetch(URL, { method: "GET" });
  const data = await response.json();
  return data;
};

export const getDistrictMethod = async () => {
  const URL = `${url}district`;
  // const URL = "https://api-landing-pheni.herokuapp.com/api/district";
  const response = await fetch(URL, { method: "GET" });
  const data = await response.json();
  return data;
};

export const getSchoolMethod = async () => {
  const URL = `${url}school`;
  // const URL = "https://api-landing-pheni.herokuapp.com/api/school";
  const response = await fetch(URL, { method: "GET" });
  const data = await response.json();
  return data;
};

export const getDepartmentMethod = async () => {
  // const URL = "https://api-landing-pheni.herokuapp.com/api/department";
  const URL = `${url}department`;
  const response = await fetch(URL, { method: "GET" });
  const data = await response.json();
  return data;
};

export const getProgramMethod = async () => {
  // const URL = "https://api-landing-pheni.herokuapp.com/api/program";
  const URL = `${url}program`;
  const response = await fetch(URL, { method: "GET" });
  const data = await response.json();
  return data;
};
