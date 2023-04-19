import {React,useEffect} from 'react';
import { Link ,redirect,useNavigate} from 'react-router-dom';
import { PropTypes } from 'prop-types';
import {connect } from 'react-redux';
const Landing = ({isAuthenticated})=>{
    console.log(isAuthenticated);
    const navigate = useNavigate();
    useEffect(() => {
        if(isAuthenticated){
            return navigate('/dashboard', { replace: true });
        }
     },[isAuthenticated]);
    return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
            <Link to="/login" className="btn btn-light">Login</Link>
          </div>
        </div>
      </div>
    </section>

    );
};
Landing.propTypes={
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = (state) =>({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Landing);