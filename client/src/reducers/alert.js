import { SET_ALERT,REMOVE_ALERT } from "../actions/type";
const initialState = [];
const alert = (state = initialState,action)=>{
    const {type,payload} = action;
    switch(type){
        case SET_ALERT:
            // it this action type comes we need to retun the new state without chaing the other things and adding the action payload.
            return [...state,payload];
        case REMOVE_ALERT:
            return state.filter(alert =>alert.id !== payload)
        default:
            return state;
    }
}
export default alert;