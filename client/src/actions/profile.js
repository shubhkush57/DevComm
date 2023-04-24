import axios from "axios";
// getting the profiles of the user and thier git repos as well..
import { GET_PROFILE,PROFILE_ERROR ,UPDATE_PROFILE,CLEAR_PROFILE,ACCOUNT_DELETE,GET_PROFILES,GET_REPOS} from "./type";
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

//get all user's profile
export const getProfiles =()=>async dispatch=>{
    dispatch({type: CLEAR_PROFILE});
    try{
        const res = await axios.get('/api/profile');
        dispatch({
            type: GET_PROFILES,
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
// get user profile by id
export const getProfileById =(userId)=>async dispatch=>{
    try{
        const res = await axios.get(`/api/profile/user/${userId}`);
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

// get user's github repos
export const getGithubRepos =(username)=>async dispatch=>{
    try{
        const res = await axios.get(`/api/profile/github/${username}`);
        dispatch({
            type: GET_REPOS,
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
            // history.push('/dashboard');
            navigate('/dashboard');
            // dispatch(navigate('/dashboard', { replace: true }));
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
// ADD Experience.
export const addExperience =(formData,navigate)=> async dispatch=>{
    try{
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profile/experience',formData,config);
        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Experience Added','success'));

        // const navigate = useNavigate();
        // I have to fix it later on..
        
            // history.push('/dashboard');
        navigate('/dashboard');
            // dispatch(navigate('/dashboard', { replace: true }));
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
// ADD Education
export const addEducation =(formData,navigate)=> async dispatch=>{
    try{
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profile/education',formData,config);
        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Education Added','success'));

        // const navigate = useNavigate();
        // I have to fix it later on..
        
            // history.push('/dashboard');
        navigate('/dashboard');
            // dispatch(navigate('/dashboard', { replace: true }));
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
};

// DELETE Experience
export const deleteExperience = (id)=> async dispatch =>{
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('Experience Removed','Success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload:{
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
}
// DELETE Education
export const deleteEducation = (id)=> async dispatch =>{
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('Education Removed','Success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload:{
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
}

// delete account and profile.
export const deleteAccount = ()=> async dispatch =>{
    if(window.confirm('This can delete your profile permanently!! Are you Sure?')){
        try {
            const res = await axios.delete(`/api/profile`);
            dispatch({
                type: CLEAR_PROFILE,
            });
            dispatch({type: ACCOUNT_DELETE});
            dispatch(setAlert('PROFILE DELETED','Success'));
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload:{
                    msg: err.response.statusText,
                    status: err.response.status
                }
            });
        }
    }
    
}