import {Fragment, React,useEffect} from "react";
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import setAlert from '../../actions/alerts'
import { getCurrentProfile ,deleteAccount} from "../../actions/profile";
import Spinner from "../layout/Spinner";
import DashboardActions from '../dashboard/DashboardActions';
import Experience from "./Experience";
import Education from "./Education";
const Dashboard = ({getCurrentProfile,deleteAccount,auth:{user},profile:{profile,loading}}) =>{
    useEffect(()=>{
        getCurrentProfile();
    },[]);
    return (
        loading === true? <Spinner />:
        <Fragment>
            <h1 className="large text-primary">
                Dashboard
            </h1>
            <p className="lead">
                <i className="fas fa-user"/> Welcome {' '}
                {user && user.name}
            </p>
            {profile !== null ?(<Fragment>
                <DashboardActions />
                <Experience experience={profile.experience} />
                <Education education={profile.education} />
                {/**This is to delete the account of the user. */}
                <div className="my-2">
                    <button className= "btn btn-danger" onClick={()=>{
                        deleteAccount()
                    }}>
                        <i className="fas fa-user-minus"></i>{' '} Delete Account
                    </button>
                </div>
            </Fragment>):(<Fragment>
                <p>You don't have yet set profile, Please set profile</p>
                <Link to = '/create-profile' className = 'btn btn-primary my-1'>Create Profile</Link>
            </Fragment>)}
        </Fragment>

        
    )
}
Dashboard.propTypes ={
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired
}
const mapStateToProps = (state) =>({
    auth: state.auth,
    profile: state.profile
});
export default connect(mapStateToProps,{getCurrentProfile,deleteAccount})(Dashboard);