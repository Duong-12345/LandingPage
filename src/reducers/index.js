import { combineReducers } from "redux";
import { dataReducer, departmentReducer, districtReducer, programReducer, provinceReducer, shoolReducer } from "./dataReducer";
const rootReducer = combineReducers({
    dataForm: dataReducer,
    provinceReducer: provinceReducer,
    schoolReducer: shoolReducer,
    districtReducer: districtReducer,
    departmentReducer: departmentReducer,
    programReducer: programReducer
});
export default rootReducer;

