import {v4 as uuid} from 'uuid'

// to dispatch more than one action from this..
import { SET_ALERT,REMOVE_ALERT } from './type';
const setAlert = (msg,alertType)=> dispath =>{
    console.log("Set Alert activated");
    const id = uuid(); // coz each state need a id in react.
    dispath({
        type: SET_ALERT, // payload is something which is going to add in the state.
        payload:{msg,alertType,id}
    });

    setTimeout(()=>{
        dispath({
            type: REMOVE_ALERT,
            payload: id
        })
    },5000)
};
export default setAlert;