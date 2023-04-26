import React, { useEffect,Fragment } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { getProfileById } from '../../actions/profile';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
const Profile =({
    getProfileById,
    profile:{profile,loading},
    auth,
    match
})=> {
    const { id } = useParams();
    useEffect(()=>{
        getProfileById(id)
    },[getProfileById,id]);
  return (
    <Fragment>
        {loading || profile ===null ?<Spinner />:<Fragment>
            
            <Link to= '/profiles' className='btn btn-light'>Back To Profiles</Link>
            {auth.isAuthenticated && auth.loading === false &&auth.user._id === profile.user._id &&(
                <Link to="/edit-profile" className='btn btn-dark'>Edit Profile</Link>
            )}
            <div class="profile-grid my-1">
                <ProfileTop profile = {profile}/>
                <ProfileAbout profile = {profile} />
                <div className='profile-exp bg-white p-2'>
                    <h2 className='text-primary'>Experience</h2>
                    {console.log(profile.experience.length)}
                    {profile.experience.length>0?(<Fragment>
                        {profile.experience.map(exp=>(<ProfileExperience key = {exp._id}
                            experience = {exp} />
                            
                        ))}
                    </Fragment>):(<h4>No Experience Credentials</h4>)}
                </div>

                <div className='profile-edu bg-white p-2'>
                    <h2 className='text-primary'>Education</h2>
                    {console.log(profile.education.length)}
                    {profile.education.length>0?(<Fragment>
                        {profile.education.map(edu=>(<ProfileEducation key = {edu._id}
                            education = {edu} />
                            
                        ))}
                    </Fragment>):(<h4>No Education Credentials</h4>)}
                </div>
                {profile.githubusername && <ProfileGithub username ={profile.githubusername}/>}
            </div>
        </Fragment>}
    </Fragment>
  )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) =>({
    auth: state.auth,
    profile: state.profile
})
export default connect(mapStateToProps,{getProfileById})(Profile);