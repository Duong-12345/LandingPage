import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postDataForm } from "../actions/actionSend";
import { getProvince, getDistrict } from "../actions/actionGetProvince";
import "./main.css";
import Offline from "./Offline";
import { getSchool } from "../actions/actionGetSchool";
import { getDepartment, getProgram } from "../actions/actionGetDepartment";
import { Helmet } from "react-helmet";
import moment from "moment";

const Main = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    name: "",
    phone: "",
    email: "",
    province: "",
    provinceCode: "",
    school: "",
    day: null,
    amount: "",
    department: {
      val: "",
      checked: null,
    },
    program: {
      val: "",
      checked: null,
    },
    arrayProgram: [],
    arrayDepartment: [],
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
      district:'',
      school:''
    }));
  };
  const handleDistrict = (e) => {
    e.persist();
    setValue((value) => ({
      ...value,
      district: e.target.value,
      school:''
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
      arrayProgram: [],
    }));
  };

  const [submitted, setSubmitted] = useState(false);
  // const dataProvince = useSelector(
  //   (state) => state.provinceReducer.dataProvince
  // );
  const dataProvince = useSelector(
    (state) => state.provinceReducer.dataProvince.data
  );
  // const dataDistrict = useSelector(
  //   (state) => state.districtReducer.dataDistrict
  // );
  const dataDistrict = useSelector(
    (state) => state.districtReducer.dataDistrict.data
  );
  // const dataSchool = useSelector(
  //   (state) => state.schoolReducer.dataSchool
  // );
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
  const arrayDepartmentFix = [...new Set(value.arrayDepartment)];
  const date = moment(value.day).format("YYYY-MM-DDThh:mm:ssZ");
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    window.scroll(0, 0);
    const data = {
      name: value.name,
      email: value.email,
      phone: value.phone,
      provinceCode: processText(inputText),
      schoolCode: processText3(inputText3),
      date: date,
      numberOfParticipant: Number(value.amount),
      time: value.time,
      type: initSelect.value,
      districtCode: processText1(inputText1),
      programCodes: value.arrayProgram,
      departmentCodes: arrayDepartmentFix,
    };
    postDataForm(data, dispatch);
  };
  const [initSelect, setInitSelect] = useState(() => {
    return {
      value: "tour_offline",
      // value: "",
    };
  });
  const [on, setOn] = useState({
    status: false,
  });
  const change = (e) => {
    if(e.target.value==='tour_online'){
      setValue({
        ...value,
        amount:'',
        arrayProgram:[]
      })
    }
    
    setInitSelect({
      value: e.target.value,
    });
    setOn((on) => ({
      status: !on.status,
    }));
    return on;
  };
  const handleProgram = (e) => {
    console.log(e.target.checked);

    e.persist();
    if (!e.target.checked) {
      console.log("0");
      let tmp = value.arrayProgram;
      let index = tmp.indexOf(e.target.value);
      if (index !== -1) {
        tmp.splice(index, 1);
      }
      setValue({
        ...value,
        program: {
          val: e.target.val,
          checked: e.target.checked,
        },
        arrayProgram: tmp,
      });
    } else {
      setValue({
        ...value,
        program: {
          val: e.target.value,
          checked: e.target.checked,
        },
        arrayProgram: [...value.arrayProgram, e.target.value],
      });
    }
  };
  const handleDepartment = (e) => {
    e.persist();
    if (!e.target.checked) {
      let tmp = value.arrayDepartment;
      let index = tmp.indexOf(e.target.name);
      if (index !== -1) {
        tmp.splice(index, 1);
      }
      setValue({
        ...value,
        department: {
          val: e.target.val,
          checked: e.target.checked,
        },
        arrayDepartment: tmp,
      });
    } else {
      setValue({
        ...value,
        department: {
          val: e.target.name,
          checked: e.target.checked,
        },
        arrayDepartment: [...value.arrayDepartment, e.target.name],
      });
    }
  };
  const messageSuccess = (a) => {
    if (
      submitted &&
      (!value.name ||
        !value.email ||
        !value.phone ||
        !value.province ||
        !value.school ||
        !value.arrayProgram.length ||
        !value.day
        )
      // !initSelect.value
    ) {
      return (
        <div className="false-message">
          Bạn thiếu một trường thông tin chưa điền
        </div>
      );
    } else if (!submitted) {
      return null;
    } else {
      return (
        <>
          {modal === false ? (
            <div className="modal">
              <div onClick={toggleModal} className="overlay"></div>
              <div className="modal-content">
                <h2>Đăng ký thành công!</h2>
                <p>
                  Hẹn gặp lại các bạn tại Trường Đại học Phenikaa vào thời gian
                  đã đăng ký!
                </p>
                <button className="close-modal" onClick={toggleModal}>
                  &times;
                </button>
              </div>
            </div>
          ) : null}
          <div className="success-message">Bạn đã đăng ký thành công</div>
        </>
      );
    }
    // <div className="success-message">Bạn đã gửi thành công</div>
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
  var inputText3 = value.school;
  const processText3 = (inputText3) => {
    var output = [];
    var json = inputText3.split(" ");
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

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div className="background">
      {/* { modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Phenikaa xin chào</h2>
            <p>
              Bạn đã gửi thông tin thành công. Nhà trường rất mong chờ bạn sẽ đến tham quan trường vào 
              thời gian bạn đã đăng kí
            </p>
            <button  className="close-modal" onClick={toggleModal}>
              &times;
            </button>
          </div>
        </div>
      )} */}
      <span className="img_bottom">
        <img
          // src="./img/smt.png"
          id="imgBottom1"
          src="./img/imgBottom1.png"
          alt="logo1"
          width="100%"
          height="auto"
          style={{ position: "absolute", left: 0, bottom: 0, zIndex: -1 }}
        ></img>
        <img
          id="smt"
          src="./img/smt.png"
          // src="./img/imgBottom1.png"
          alt="logo1"
          width="100%"
          height="auto"
          style={{ position: "absolute", left: 0, bottom: 0, zIndex: -1 }}
        ></img>
      </span>
      <span className="img_bottom">
        <img
          src="./img/imgTop.png"
          alt="logo1"
          width="100%"
          height="auto"
          style={{ position: "absolute", left: 0, top: 0, zIndex: -1 }}
        ></img>
      </span>
      <div className="main">
        <Helmet>
          <title>PHENIKAA CAMPUS VISIT</title>
        </Helmet>
        <div className="body">
          <div className="img_head">
            <span className="img_head_left">
              {/* <img
                src="./img/logo1.png"
                alt="logo1"
                width="100%"
                height="auto"
              ></img> */}
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
            các em học sinh về Trường Đại học Phenikaa, <br></br>các ngành nghề
            đang được đào tạo tại Trường, giúp các em có quyết định lựa chọn
            ngành nghề đúng đắn,<br></br> Trường Đại học Phenikaa tổ chức chương
            trình trải nghiệm "Phenikaa Campus Visit 2022".
          </p>
          <p>
            Chương trình được hỗ trợ{" "}
            <b style={{ color: "#f05e22" }}>HOÀN TOÀN MIỄN PHÍ.</b>
          </p>
          <p>Lịch đăng ký thời gian tham quan (dự kiến):</p>
          <div className="form_register">
            <div className="left_block">
              <div className="top_child_left">Offline:</div>
              <div className="bottom_child_left">
                <span className="bound_img_p">
                  <img
                    // src="./img/clock.png"
                    src="./img/clock.svg"
                    alt="logo1"
                    className="phone_icon"
                  ></img>
                  <p>
                    09:00 buổi sáng/ 15:00 buổi chiều <br></br>Thứ Ba và Thứ Năm
                    hàng tuần
                  </p>
                </span>
                <span className="bound_img_p">
                  <img
                    // src="./img/address.png"
                    src="./img/address.svg"
                    alt="logo1"
                    className="phone_icon"
                  ></img>
                  <p>
                    Phòng Tuyển sinh & truyền thông,<br></br> 103 nhà A2, Trường
                    Đại học Phenikaa.
                  </p>
                </span>
              </div>
            </div>
            <div className="right_block">
              <div className="top_child_left">Online:</div>
              <div className="bottom_child_left">
                <span className="bound_img_p">
                  <img
                    // src="./img/clock.png"
                    src="./img/clock.svg"
                    alt="logo1"
                    className="phone_icon"
                  ></img>
                  <p>09:00 - 10:00 sáng Chủ Nhật hàng tuần.</p>
                </span>
                <span className="bound_img_p">
                  <img
                    // src="./img/address.png"
                    src="./img/address.svg"
                    alt="logo1"
                    className="phone_icon"
                  ></img>
                  <p>Online trên nền tảng Zoom</p>
                </span>
              </div>
            </div>
          </div>
          <p>
            Hãy liên hệ với chúng tôi khi cần hỗ trợ thêm thông tin<br></br>
            <b>Phòng Tuyển sinh và Truyền thông</b>
          </p>
          <span className="bound_img_p">
            <img src="./img/phone.svg" alt="logo1" className="phone_icon"></img>
            <p>0946.906.552 (Ms Hằng)</p>
          </span>
          <span className="bound_img_p">
            <img src="./img/email.svg" alt="logo1" className="phone_icon"></img>
            <p>truyenthong@phenikaa-uni.edu.vn</p>
          </span>

          <p className="title_text_child">THÔNG TIN ĐĂNG KÝ</p>
          <form onSubmit={handleSubmit} autoComplete='off'>
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
                    placeholder="Nếu nhóm 2 người trở lên chỉ để tên một người đại diện"
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
                    placeholder="Nhập số điện thoại liên hệ"
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
                    placeholder="ví dụ: abc@gmail.com"
                    name="email"
                    value={value.email}
                    onChange={handleEmail}
                    required
                  ></input>
                  {submitted && !value.email && (
                    <p id="note_message">Please enter a email</p>
                  )}
                </span>
                <span name={value.provinceCode}>
                  <label>Tỉnh:</label>
                  <>
                    {
                      <datalist id="province">
                        {dataProvince?.map((e) => (
                          <option
                            value={e.name + " - " + e.code}
                            name={e.code}
                          ></option>
                        ))}
                      </datalist>
                    }
                  </>
                  <input
                    className="res_inf_input"
                    type="text"
                    list="province"
                    placeholder="Chọn tên Tỉnh"
                    // name={}
                    value={value.province}
                    onChange={(val) => handleProvince(val)}
                    required
                  ></input>
                  {/* <Select
                  value={{
                    value: value.province,
                    label: value.province,
                  }}
                  options={dataProvince?.map(e=>({
                    label: e,
                    value: e
                  }))}
                  /> */}

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
                          <option value={e.name + " - " + e.code}></option>
                        ))}
                      </datalist>
                    }
                  </>
                  <input
                    className="res_inf_input"
                    type="text"
                    list="district"
                    placeholder="Chọn tên Quận/Huyện"
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
                          <option value={e.name + " - " + e.code}></option>
                        ))}
                      </datalist>
                    }
                  </>
                  <input
                    type="text"
                    list="school"
                    placeholder="Chọn tên Trường"
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
                {/* <option disabled >Bạn chọn hình thức trải nghiệm nào ?</option> */}
                <option value="tour_ofline">
                  In person Campus Tour-1h(Campus Tour Offline + Tour guide)
                </option>
                <option value="tour_online">
                  Virtual Campus Tour-30p(Tour Online + Tour guide)
                </option>
              </select>
            </div>
            <p id="note_message1" style={{ textAlign: "left" }}>
              Bạn có thể chọn hình thức trải nghiệm online bằng cách chọn ở ô
              phía trên
            </p>
            {/* {submitted && !initSelect.value && (
                    <p id="note_message">Please choose the form you want to experience
                    </p>
                  )} */}
            {
              // !initSelect.value ? <div className="select_message">Bạn hãy chọn hình thức trải nghiệm</div> :
              <Offline
                handleDay={handleDay}
                handleAmount={handleAmount}
                amount={value.amount}
                day={value.day}
                submitted={submitted}
                handleProgram={handleProgram}
                handleDepartment={handleDepartment}
                program={value.program}
                department={value.department}
                change={change}
                arrayProgram={value.arrayProgram}
                arrayDepartment={value.arrayDepartment}
                status={on.status}
                time={value.time}
              />
            }
            <input type="submit" name="" value="Gửi" className="send" />
          </form>
        </div>
      </div>
    </div>
  );
};
export default Main;
