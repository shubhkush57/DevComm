import {Fragment, React,useEffect} from "react";
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import setAlert from '../../actions/alerts'
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import DashboardActions from '../dashboard/DashboardActions';
import Experience from "./Experience";
import Education from "./Education";
const Dashboard = ({getCurrentProfile,auth:{user},profile:{profile,loading}}) =>{
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
    auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) =>({
    auth: state.auth,
    profile: state.profile
});
export default connect(mapStateToProps,{getCurrentProfile})(Dashboard);