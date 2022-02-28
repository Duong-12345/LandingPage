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
        <p id="tittle_off">
          <b>In person Campus Tour-1h</b>
          <br></br>
          (Campus Tour Offline + Tour guide)
        </p>
      );
    } else
      return (
        <p id="tittle_off">
          <b>Virtual Campus Tour 30'</b>
          <br></br>
          (Tour Offline + Tour guide)
        </p>
      );
  };
 
  const pickDay = (date) => {
    if (date?.getDay() === 0 || date?.getDay() === 2) {
      return "8:00 - 10:30"
    } else if (date?.getDay() === 4) {
      return   "13:30 - 16:00";
    } else return null;
  };

  const handleChangeDate =  (date) => {
    setSelectedDate(date);
    props.handleDay(date, pickDay(date));
  };

  let curr = new Date();
  let first = curr.getDate() - curr.getDay() + 1;
  let second = first + 1;
  let third = first + 3;
  let last = first + 6;

  const countSelect = (e)=>{
    if(props.amount ==='' && props.array.length >= 3){
      e.target.checked = false
      alert('Mỗi người được chọn 3 ngành muốn trải nghiệm')
    }
    else if(props.amount !== '' && props.array.length >= 3 * props.amount){
      e.target.checked = false
      alert('Bạn được chọn 3 ngành/người tham gia trải nghiệm')
    }
  }

  const dataDepartment = useSelector(
    (state) => state.departmentReducer.dataDepartment.data
  );
  const dataProgram= useSelector(
    (state) => state.programReducer.dataProgram.data
  );
   dataProgram.forEach(element => {
    dataDepartment.forEach(dep=>{
      if(element.departmentCode===dep.code){
        element.nameDepartment = dep.name
      }
    })
  });
  
  dataDepartment?.forEach(element => {
    dataProgram?.forEach(dep=>{
      if(element.code===dep.departmentCode){
        var rong = []
        element.nameProgram= rong.push(dep.name)
      }
    })
  });
  // const dataDepartmentLeft = dataProgram.slice(0,13)
// console.log('đấ')
  return (
    <div className="body_off">
      {showTitle()}
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
          value={props.department.val}
          onChange={props.handleDepartment}
        >
          <div className="container_left">
            {departmentLeft.map(e=>(
              !e.value ? <p>
              <b>{e.name}</b>
            </p> : <label className="container">
              <p>{e.name}</p>
              <input type="checkbox" value={e.value} onClick={countSelect} name='checkbox'></input>
              <span className="checkmark"></span>
            </label>
            ))}
            {/* {dataDepartmentLeft.map(e=>(
              <>
               <p>
              <b>{e.nameDepartment}</b>
            </p>
            <label className="container">
              <p>{e.name}</p>
              <input type="checkbox" value={e.value} onClick={countSelect} name='checkbox'></input>
              <span className="checkmark"></span>
            </label>
              </>
            ))} */}
          </div>
          <div className="container_right">
            {departmentRight.map(e=>(
              !e.value ? <p>
              <b>{e.name}</b>
            </p> : <label className="container">
              <p>{e.name}</p>
              <input type="checkbox" value={e.value} onClick={countSelect} name='checkbox'></input>
              <span className="checkmark"></span>
            </label>
            ))}
            
          </div>
        </div>
        {props.submitted && !props.array.length && (
          <p id="note_message_child">
            Please select the departments you want to join{" "}
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
