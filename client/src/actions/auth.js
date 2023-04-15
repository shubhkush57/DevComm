import { AUTH_ERROR, REGISTER_FAIL,REGISTER_SUCCESS, USER_LOADED } from "./type";
import axios from "axios";
import setAuthToken from "../utilts/setAuthToken";
// to register a user...
// setAlert to show the errors..
import setAlert from "./alerts";
// getting the user from the backend when we hit the register..success and 
export const loadUser = ()=>async dispatch=>{
    if(localStorage.token){
        // if localStorege token exits we will set it in global header
        setAuthToken(localStorage.token);
    }
    try{
        const res = await axios.get('/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });

    }
    catch(err){
        dispatch({
            type: AUTH_ERROR
        });
    }

};
export const register = ({name,email,password})=>async dispatch =>{
    const config = {
        headers:{
            'Content-Type' : 'application/json' 
        }
    }
    const body = JSON.stringify({name,email,password});
    try{
        const res = await axios.post('/api/users',body,config);
        console.log(res.data);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    }
    catch(err){
        const errors = err.response.data.errors;
        console.log(errors);
        if(errors){
            errors.forEach(error => 
                dispatch(setAlert(error.msg,'danger'))
            );
        }
        dispatch({
            type: REGISTER_FAIL
        });

    }
    

}