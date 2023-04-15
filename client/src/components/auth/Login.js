import {React,Fragment,useState,useEffect} from 'react';
import { Link,redirect ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import {connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { login } from '../../actions/auth';
const Login = ({login,isAuthenticated})=>{
    
    const [formData,setFormData] = useState({
        email :'',
        password: '',
    }
    );
    
    const {email,password} = formData;
    // setfromData is goint to take an ojbect and change the target name to it's target value..
    const onChange = e=>setFormData({...formData,[e.target.name] : e.target.value})
    const onSubmit = async e=>{
        e.preventDefault();
        login(email,password);
        console.log('Success');
        
    }
    const navigate = useNavigate();
    useEffect(() => {
        if(isAuthenticated){
            return navigate('/dashboard', { replace: true });
        }
     },[isAuthenticated]);
    
    return (
        <Fragment>
               <h1 className="large text-primary">Sign In</h1>
                <p className="lead"><i className="fas fa-user"></i>LogIn Your Account</p>
                <form className="form" onSubmit= {e=>onSubmit(e)}>
                    <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" value = {email} onChange ={e=>onChange(e)} />
                    
                    </div>
                    <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        value = {password} onChange ={e=>onChange(e)}
                    />
                    </div>
                    
                    <input type="submit" className="btn btn-primary" value="Login" />
                </form>
                <p className="my-1">
                    Don't have an account? <Link to="/register">Sign In</Link>
                </p>
        </Fragment>
    );
};
Login.propTypes={
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}
const mapStateToProps =(state)=>({
    // alerts: state.alert
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps,{login})(Login);