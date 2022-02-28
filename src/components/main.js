import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postDataForm } from "../actions/actionSend";
import { getProvince, getDistrict } from "../actions/actionGetProvince";
import "./main.css";
import Offline from "./Offline";
import { getSchool } from "../actions/actionGetSchool";
import { getDepartment, getProgram } from "../actions/actionGetDepartment";
import { Helmet } from "react-helmet";

const Main = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    name: "",
    phone: "",
    email: "",
    province: "",
    school: "",
    day: null,
    amount: "",
    department: {
      val: "",
      checked: null,
    },
    array: [],
    time: "",
    district: "",
  });
  const handleName = (e) => {
    e.persist();
    setValue((value) => ({
      ...value,
      name: e.target.value,
    }));
  };
  const handlePhone = (e) => {
    e.persist();
    setValue((value) => ({
      ...value,
      phone: e.target.value,
    }));
  };
  const handleEmail = (e) => {
    e.persist();
    setValue((value) => ({
      ...value,
      email: e.target.value,
    }));
  };
  const handleProvince = (e) => {
    e.persist();
    setValue((value) => ({
      ...value,
      province: e.target.value,
    }));
  };
  const handleDistrict = (e) => {
    e.persist();
    setValue((value) => ({
      ...value,
      district: e.target.value,
    }));
  };
  const handleSchool = (e) => {
    e.persist();
    setValue((value) => ({
      ...value,
      school: e.target.value,
    }));
  };
  const handleDay = (e, time) => {
    setValue({
      ...value,
      day: e,
      time,
    });
  };

  const handleAmount = (e) => {
    e.persist();
    setValue((value) => ({
      ...value,
      amount: e.target.value,
    }));
  };

  const [submitted, setSubmitted] = useState(false);
  const dataProvince = useSelector(
    (state) => state.provinceReducer.dataProvince.data
  );
  const dataDistrict = useSelector(
    (state) => state.districtReducer.dataDistrict.data
  );
  const dataSchool = useSelector(
    (state) => state.schoolReducer.dataSchool.data
  );
  useEffect(() => {
    getProvince(dispatch);
    getSchool(dispatch);
    getDistrict(dispatch);
    getDepartment(dispatch);
    getProgram(dispatch);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    window.scroll(0, 0);
    const data = {
      name: value.name,
      email: value.email,
      phone: value.phone,
      provinceCode: value.province,
      schoolCode: value.school,
      date: Date(value.day),
      numberOfParticipant: Number(value.amount),
      // programCodes: value.array,
      time: value.time,
      type: initSelect.value,
      districtCode: value.district,
      departmentCodes: value.department.val,
    };
    console.log(data.date);
    postDataForm(data, dispatch);
  };
  const [initSelect, setInitSelect] = useState(() => {
    return {
      value: "tour_offline",
    };
  });
  const [on, setOn] = useState({
    status: false,
  });
  const change = (e) => {
    setInitSelect({
      value: e.target.value,
    });
    setOn((on) => ({
      status: !on.status,
    }));
    return on;
  };

  const handleDepartment = (e) => {
    e.persist();
    if (!e.target.checked) {
      let tmp = value.array;
      let index = tmp.indexOf(e.target.value);
      if (index !== -1) {
        tmp.splice(index, 1);
      }
      setValue({
        ...value,
        department: {
          val: e.target.val,
          checked: e.target.checked,
        },
        array: tmp,
      });
    } else {
      setValue({
        ...value,
        department: {
          val: e.target.value,
          checked: e.target.checked,
        },
        array: [...value.array, e.target.value],
      });
    }
  };
  const messageSuccess = () => {
    if (
      submitted &&
      (!value.name ||
        !value.email ||
        !value.phone ||
        !value.province ||
        !value.school ||
        !value.array.length ||
        !value.day)
    ) {
      return (
        <div className="false-message">
          Bạn thiếu một trường thông tin chưa điền
        </div>
      );
    } else if (!submitted) {
      return null;
    } else return <div className="success-message">Bạn đã gửi thành công</div>;
  };

  var inputText = value.province;
  const processText = (inputText) => {
    var output = [];
    var json = inputText.split(" ");
    json.forEach(function (item) {
      output.push(item.replace(/\'/g, "").split(/(\d+)/).filter(Boolean));
    });
    if (output !== []) {
      var newProvince = Number(output[3]);
    }
    return newProvince;
  };
  var inputText1 = value.district;
  const processText1 = (inputText1) => {
    var output = [];
    var json = inputText1.split(" ");
    json.forEach(function (item) {
      output.push(item.replace(/\'/g, "").split(/(\d+)/).filter(Boolean));
    });
    if (output !== []) {
      var newDistrict = Number(output.pop());
    }
    return newDistrict;
  };

  const filterDistrict = dataDistrict?.filter(
    (dis) => dis.provinceCode == processText(inputText)
  );
  const filterSchool = dataSchool?.filter(
    (sch) =>
      sch.districtCode == processText1(inputText1) &&
      sch.provinceCode == processText(inputText)
  );
  // console.log(processText1(inputText1));
  return (
    <div className="main">
      <Helmet>
        <title>PHENIKAA CAMPUS VISIT</title>
      </Helmet>
      <div className="body">
        <div className="img_head">
          <span className="img_head_left">
            <img
              src="./img/logo1.png"
              alt="logo1"
              width="100%"
              height="auto"
            ></img>
          </span>
          <span className="img_head_right">
            <img
              src="./img/logo2.png"
              alt="logo2"
              width="100%"
              height="auto"
            ></img>
          </span>
        </div>
        {messageSuccess()}
        <div className="title">
          <p className="title_text">ĐĂNG KÝ TRẢI NGHIỆM</p>
          <p className="title_text">PHENIKAA CAMPUS VISIT 2022</p>
        </div>
        <p>
          Trường Đại học Phenikaa gửi lời chào trân trọng tới Quý vị phụ huynh
          và các em học sinh!
        </p>
        <p>
          Với mục tiêu giới thiệu, cung cấp thông tin tới Quý vị phụ huynh và
          các em học sinh về Trường Đại học Phenikaa, các ngành nghề đang được
          đào tạo tại Trường, giúp các em có quyết định lựa chọn ngành nghề đúng
          đắn, Trường Đại học Phenikaa tổ chức chương trình trải nghiệm
          "Phenikaa Campus Visit 2022".
        </p>
        <p>
          Chương trình được hỗ trợ <b>HOÀN TOÀN MIỄN PHÍ.</b>
        </p>
        <p>Lịch đăng ký thời gian tham quan (dự kiến):</p>
        <div className="form_register">
          <div className="left_block">
            <div className="top_child_left">Offline:</div>
            <div className="bottom_child_left">
              <ul>
                <li>
                  <p>09:00 buổi sáng/ 15:00 buổi chiều</p>
                </li>
                <li>
                  <p>
                    Phòng Tuyển sinh & truyền thông,<br></br> 103 nhà A2, Trường
                    Đại học Phenikaa.
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="right_block">
            <div className="top_child_left">Online:</div>
            <div className="bottom_child_left">
              <ul>
                <li>
                  <p>09:00 _ 10:00 sáng Chủ Nhật hàng tuần.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          Hãy liên hệ với chúng tôi khi cần hỗ trợ thêm thông tin<br></br>
          <b>Phòng Tuyển sinh và Truyền thông</b>
        </p>
        <p>0946.906.552 (Ms Hằng)</p>
        <p>truyenthong@phenikaa_uni.edu.vn</p>
        <p className="title_text_child">THÔNG TIN ĐĂNG KÝ</p>
        <form onSubmit={handleSubmit}>
          <div className="form_res_inf">
            {/* <div className="form_res_name">
              <div className="form_res_name_input">
                <label>Họ và tên:</label>
                <input
                  type="text"
                  placeholder="Nguyễn Văn A"
                  name="name"
                  value={value.name}
                  onChange={handleName}
                  required
                ></input>
                {submitted && !value.name && (
                  <p id="note_message">Please enter a name</p>
                )}
              </div>
              <p>(Nếu nhóm 2 người trở lên chỉ để tên một đại diện)</p>
            </div> */}
            <div className="res_inf">
              <span>
                <label>Họ và tên:</label>
                <input
                  type="text"
                  placeholder="Nguyễn Văn A"
                  name="name"
                  value={value.name}
                  onChange={handleName}
                  required
                ></input>
                {submitted && !value.name && (
                  <p id="note_message">Please enter a name</p>
                )}
              </span>
              <span>
                <label>Số điện thoại liên hệ:</label>
                <input
                  type="text"
                  placeholder="phone number"
                  name="phone"
                  value={value.phone}
                  onChange={handlePhone}
                  required
                ></input>
                {submitted && !value.phone && (
                  <p id="note_message">Please enter a phone number</p>
                )}
              </span>
            </div>
            <div className="res_inf">
              <span>
                <label className="res_inf_email">Email:</label>
                <input
                  type="email"
                  placeholder="abc@gmail.com"
                  name="email"
                  value={value.email}
                  onChange={handleEmail}
                  required
                ></input>
                {submitted && !value.email && (
                  <p id="note_message">Please enter a email</p>
                )}
              </span>
              <span>
                <label>Tỉnh:</label>
                <>
                  {
                    <datalist id="province">
                      {dataProvince?.map((e) => (
                        <option value={e.name + " - " + e.code}>
                          {e.name}
                        </option>
                      ))}
                    </datalist>
                  }
                </>
                <input
                  className="res_inf_input"
                  type="text"
                  list="province"
                  placeholder="province"
                  name="province"
                  value={value.province}
                  onChange={(val) => handleProvince(val)}
                  required
                ></input>

                {submitted && !value.province && (
                  <p id="note_message">Please enter a province</p>
                )}
              </span>
            </div>
            <div className="res_inf">
              <span>
                <label className="res_inf_district">Quận/Huyện:</label>
                <>
                  {
                    <datalist id="district">
                      {filterDistrict?.map((e) => (
                        <option value={e.name + " - " + e.code}>
                          {e.name}
                        </option>
                      ))}
                    </datalist>
                  }
                </>
                <input
                  className="res_inf_input"
                  type="text"
                  list="district"
                  placeholder="district"
                  name="district"
                  value={value.district}
                  onChange={(val) => handleDistrict(val)}
                  required
                ></input>

                {submitted && !value.district && (
                  <p id="note_message">Please enter a province</p>
                )}
              </span>
              <span>
                <label>Trường:</label>
                <>
                  {
                    <datalist id="school">
                      {filterSchool?.map((e) => (
                        <option value={e.name}></option>
                      ))}
                    </datalist>
                  }
                </>
                <input
                  type="text"
                  list="school"
                  placeholder="high school"
                  name="school"
                  value={value.school}
                  onChange={handleSchool}
                  required
                ></input>
                {submitted && !value.school && (
                  <p id="note_message">Please enter a high school</p>
                )}
              </span>
            </div>
          </div>
          <div className="type-experience">
            <p className="title_text_child">HÌNH THỨC TRẢI NGHIỆM</p>
            <select onChange={change} value={initSelect.value}>
              <option value="tour_ofline">
                In person Campus Tour-1h(Campus Tour Offline + Tour guide)
              </option>
              <option value="tour_online">
                Virtual Campus Tour 30'(Tour Online + Tour guide)
              </option>
            </select>
          </div>
          {
            <Offline
              handleDay={handleDay}
              handleAmount={handleAmount}
              amount={value.amount}
              day={value.day}
              submitted={submitted}
              handleDepartment={handleDepartment}
              department={value.department}
              change={change}
              array={value.array}
              status={on.status}
              time={value.time}
            />
          }
          <input type="submit" name="" value="Gửi" className="send" />
        </form>
      </div>
      <span className="img_head_left">
        <img
          src="./img/imgBottom.png"
          alt="logo1"
          width="100%"
          height="auto"
        ></img>
      </span>
    </div>
  );
};
export default Main;
