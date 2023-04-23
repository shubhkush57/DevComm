import axios from "axios";
// getting the profiles of the user and thier git repos as well..
import { GET_PROFILE,PROFILE_ERROR } from "./type";
import setAlert from "./alerts";

export const getCurrentProfile =()=>async dispatch=>{
    try{
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    }
    catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload:{
                msg: err.response.statusText,
                status:err.response.status
            }
        })
    }
}
// create or update current profile..
export const createProfile = (formData,navigate,edit)=>async dispatch=>{
    try{
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/profile',formData,config);
        dispatch({
            type:GET_PROFILE,
            payload: res.data
        });
        dispatch(setAlert(edit?'Profile has been updated':'Profile has been created','success'));

        // const navigate = useNavigate();
        // I have to fix it later on..
        if(edit===false){
            dispatch(navigate('/dashboard', { replace: true }));
        }
    }
    catch(err){
        console.log(err.response);
        const errors = err.response.data.error; // was giving us null values not 
        console.log(errors);
        if(errors){
            errors.forEach(error => 
                dispatch(setAlert(error.msg,'danger'))
            );
        }
        dispatch({
            type: PROFILE_ERROR,
            payload:{
                msg: err.response.statusText,
                status:err.response.status
            }
        })
    }
}