import "./Offline.css";
import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { departmentLeft, departmentRight } from "./department";
import { useSelector } from "react-redux";

export default function Offline(props) {
  const [selectedDate, setSelectedDate] = useState(props.day);

  const showAmount = () => {
    if (props.status === false) {
      return (
        <>
          <div className="form_div">
            <label className="mount_off">Số lượng người tham gia: </label>
            <>
              {
                <datalist id="number">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </datalist>
              }
            </>
            <input
              type="text"
              list="number"
              placeholder="Tối đa 5 người"
              onChange={props.handleAmount}
              value={props.amount}
              className="input"
              required
            ></input>
          </div>
          {props.submitted && !props.amount && (
            <p id="note_message_child">Please enter amount of people</p>
          )}
        </>
      );
    } else return null;
  };
  const showTitle = () => {
    if (props.status === false) {
      return (
        <>
          <p id="tittle_off">
            <b>In person Campus Tour-1h</b>
            <br></br>
            (Campus Tour Offline + Tour guide)
          </p>
          {/* <p>Bạn chỉ được đăng ký lịch trước 1 tuần</p> */}
        </>
      );
    } else
      return (
        <p id="tittle_off">
          <b>Virtual Campus Tour-30p</b>
          <br></br>
          (Tour Offline + Tour guide)
        </p>
      );
  };

  const pickDay = (date) => {
    if (date?.getDay() === 0) {
      return "9:00 - 10:00";
      // return "15:00 - 16:00";
    } else if (date?.getDay() === 4 || date?.getDay() === 2) {
      return "15:00 - 16:00";
      // return "9:00 - 10:00";
    } else return null;
  };

  const handleChangeDate = (date) => {
    setSelectedDate(date);
    props.handleDay(date, pickDay(date));
  };

  // const handleChangeDepAndPro = ()=>{
  //   props.handleDepartment();
  //   props.handleProgram();
  // }
  let curr = new Date();
  let first = curr.getDate() - curr.getDay() + 1;
  let second = first + 1;
  let third = first + 3;
  let last = first + 6;

  const countSelect = (e) => {
    let isAdd = e.target.checked;
    if (props.amount === "" && props.status === false) {
      alert("Bạn cần chọn số lượng người tham gia trước khi tích chọn");
      e.target.checked = false;
    } else if (
      props.amount !== "" &&
      props.arrayProgram.length >= 3 * props.amount
    ) {
      e.target.checked = false;
      if (isAdd)
        window.alert("Bạn chỉ được chọn 3 ngành/ 1 người tham gia trải nghiệm");
    } else if (
      props.amount === "" &&
      props.status === true &&
      props.arrayProgram.length >= 3
    ) {
      e.target.checked = false;
      if (isAdd) window.alert("Bạn chỉ được chọn 3 ngành tham gia trải nghiệm");
    }
  };

  // const dataDepartment = useSelector(
  //   (state) => state.departmentReducer.dataDepartment
  // );
  const dataDepartment = useSelector(
    (state) => state.departmentReducer.dataDepartment.data
  );
  // const dataProgram = useSelector(
  //   (state) => state.programReducer.dataProgram
  // );
  const dataProgram = useSelector(
    (state) => state.programReducer.dataProgram.data
  );

  const dataDepartmentRight = dataDepartment?.slice(0, 7).reverse();
  const dataDepartmentLeft = dataDepartment?.slice(7, 13).reverse();
  return (
    <div className="body_off">
      {showTitle()}
      <p id="note_message1">Hệ thống chỉ hỗ trợ đăng ký trước 01 tuần</p>
      <div className="form_off">
        <div className="form_off_input">
          <div className="form_div">
            <label>Ngày tham gia trải nghiệm: </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => handleChangeDate(date)}
              dateFormat="dd/MM/yyyy"
              filterDate={(date) => {
                if (
                  date.getDay() !== 6 &&
                  date.getDay() !== 1 &&
                  date.getDay() !== 3 &&
                  date.getDay() !== 5 &&
                  // date.getTime() !== 1649523600000 &&
                  date.getDate() !== second &&
                  date.getDate() !== third &&
                  date.getDate() !== last
                )
                  return true;
                return false;
              }}
              placeholderText="dd/MM/yyyy"
              required
            />
            {props.submitted && props.day == null && (
              <p id="note_message_child">Please enter participation time</p>
            )}
          </div>
          <div className="form_div">
            <label className="time_off">Thời gian:</label>
            <input
              type="text"
              list="time"
              value={props.time}
              placeholder="Thời gian sẽ tự động hiển thị theo chọn ngày bạn chọn"
              className="input"
              readOnly
            ></input>
          </div>
          {}
          {showAmount()}
        </div>
        <p>
          <b>Danh sách các ngành/chương trình muốn trải nghiệm:</b>
        </p>
        <div
          className="bound_container"
          value={props.program.val}
          onChange={props.handleProgram}
          name={props.department.name}
          onInput={props.handleDepartment}
        >
          <div className="container_left">
            {dataDepartmentLeft?.map((dep) => {
              let tmpProgram = dataProgram?.filter(
                (pro) => pro.departmentCode === dep.code
              );
              return (
                <>
                  <p>
                    <b>{dep.name}</b>
                  </p>
                  {tmpProgram?.map((tmpPro) => {
                    return (
                      <label className="container">
                        <p>{tmpPro.name}</p>
                        <input
                          type="checkbox"
                          value={tmpPro.code}
                          onClick={countSelect}
                          name={dep.code}
                          className="checkbox"
                          checked={
                            props.arrayProgram.indexOf(tmpPro.code) !== -1
                          }
                        ></input>
                        <span className="checkmark"></span>
                      </label>
                    );
                  })}
                </>
              );
            })}
          </div>
          <div className="container_right">
            {dataDepartmentRight?.map((dep) => {
              let tmpProgram = dataProgram?.filter(
                (pro) => pro.departmentCode === dep.code
              );
              return (
                <>
                  <p>
                    <b>{dep.name}</b>
                  </p>
                  {tmpProgram?.map((tmpPro) => {
                    return (
                      <label className="container">
                        <p>{tmpPro.name}</p>
                        <input
                          type="checkbox"
                          value={tmpPro.code}
                          onClick={countSelect}
                          name={dep.code}
                          checked={
                            props.arrayProgram.indexOf(tmpPro.code) !== -1
                          }
                          className="checkbox"
                        ></input>
                        <span className="checkmark"></span>
                      </label>
                    );
                  })}
                </>
              );
            })}
          </div>
        </div>
        {props.submitted && !props.arrayProgram.length && (
          <p id="note_message_child">
            Please select the departments you want to join
          </p>
        )}
        <p>
          <b>Xin cảm ơn!</b>
        </p>
        <p>
          Vui lòng nhấn "Gửi" để Trường Đại học Phenikaa nhận được thông tin
          đăng ký của bạn.
        </p>
        <p>Hẹn gặp lại bạn tại Trường theo thời gian đăng ký!</p>
      </div>
    </div>
  );
}
