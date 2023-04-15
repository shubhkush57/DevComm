//this going to store the token from the header
//x-auth-token will be store the token like global
// or we can fetch it from the loacal storage..
import axios from "axios";

const setAuthToken = (token)=>{
    if(token){
        // if there is token we are going to put in a global herader x-auth-token
        axios.defaults.headers.common['x-auth-token'] = token;
    }
    else{
        delete axios.defaults.headers.common['x-auth-token'];
    }

}
export default setAuthToken;