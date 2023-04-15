import { REGISTER_FAIL,REGISTER_SUCCESS } from "./type";
import axios from "axios";
// to register a user...
// setAlert to show the errors..
import setAlert from "./alerts";

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