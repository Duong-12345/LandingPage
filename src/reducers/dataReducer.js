
const initState = {
    isFetching: false,
    dataProvince:[],
    dataSchool:[],
    dataDistrict:[],
    dataDepartment:[],
    dataProgram:[],
}

export const dataReducer = (state=initState, action)=>{
    switch(action.type){
        case 'POST_DATA_REQUEST':{
            return {
                ...state,
                isFetching: true
            }
        }
        case 'POST_DATA_SUCCESS':{
            return {
                ...state,
                isFetching: false,
            }
        }
        case 'POST_DATA_ERROR':{
            return {
                ...state,
                isFetching: false
            }
        }
        default:
            return state
    }
}

export const provinceReducer = (state=initState, action)=>{
    switch(action.type){
        case 'GET_PROVINCE_REQUEST':{
            return {
                ...state,
                isFetching: true
            }
        }
        case 'GET_PROVINCE_SUCCESS':{
            return {
                ...state,
                isFetching: false,
                dataProvince: action.payload
            }
        }
        case 'GET_PROVINCE_ERROR':{
            return {
                ...state,
                isFetching: false
            }
        }
        default:
            return state
    }
}
export const districtReducer = (state=initState, action)=>{
    switch(action.type){
        case 'GET_DISTRICT_REQUEST':{
            return {
                ...state,
                isFetching: true
            }
        }
        case 'GET_DISTRICT_SUCCESS':{
            return {
                ...state,
                isFetching: false,
                dataDistrict: action.payload
            }
        }
        case 'GET_DISTRICT_ERROR':{
            return {
                ...state,
                isFetching: false
            }
        }
        default:
            return state
    }
}
export const shoolReducer = (state=initState, action)=>{
    switch(action.type){
        case 'GET_SCHOOL_REQUEST':{
            return {
                ...state,
                isFetching: true
            }
        }
        case 'GET_SCHOOL_SUCCESS':{
            return {
                ...state,
                isFetching: false,
                dataSchool: action.payload
            }
        }
        case 'GET_SCHOOL_ERROR':{
            return {
                ...state,
                isFetching: false
            }
        }
        default:
            return state
    }
}
export const departmentReducer = (state=initState, action)=>{
    switch(action.type){
        case 'GET_DEPARTMENT_REQUEST':{
            return {
                ...state,
                isFetching: true
            }
        }
        case 'GET_DEPARTMENT_SUCCESS':{
            return {
                ...state,
                isFetching: false,
                dataDepartment: action.payload
            }
        }
        case 'GET_DEPARTMENT_ERROR':{
            return {
                ...state,
                isFetching: false
            }
        }
        default:
            return state
    }
}
export const programReducer = (state=initState, action)=>{
    switch(action.type){
        case 'GET_PROGRAM_REQUEST':{
            return {
                ...state,
                isFetching: true
            }
        }
        case 'GET_PROGRAM_SUCCESS':{
            return {
                ...state,
                isFetching: false,
                dataProgram: action.payload
            }
        }
        case 'GET_PROGRAM_ERROR':{
            return {
                ...state,
                isFetching: false
            }
        }
        default:
            return state
    }
}


