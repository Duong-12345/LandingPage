import { combineReducers } from "redux";
import { dataReducer, provinceReducer, shoolReducer } from "./dataReducer";
const rootReducer = combineReducers({
    dataForm: dataReducer,
    provinceReducer: provinceReducer,
    schoolReducer: shoolReducer
});
export default rootReducer;

