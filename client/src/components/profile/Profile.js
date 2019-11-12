/**
 * Created by Kaizhi Du on 2019/11/10.
 */
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile'
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";

const Profile = ({ auth, profile: { profile, loading }, getProfileById, match }) => {

    useEffect(() => {
        getProfileById(match.params.id);
    }, []);

    return <Fragment>
        {profile === null || loading ? <Spinner/> : <Fragment>
            <Link to='/profiles' className='btn btn-light'>
                Back To Profiles
            </Link>
            {
                auth.isAuthenticated &&
                auth.user._id === profile.user._id &&
                (
                    <Link className='btn btn-dark' to='/edit-profile'>
                        Edit Profile
                    </Link>
                )}
            <div className='profile-grid my-1'>
                <ProfileTop profile={profile}/>
                
                <ProfileAbout profile={profile}/>
                
                <div className="profile-exp bg-white p-2">
                    <h2 className='text-primary'>Experience</h2>
                    {profile.experience.length > 0 ?
                        (<Fragment>
                            {
                                profile.experience.map(experience => (
                                    <ProfileExperience key={experience._id} experience={experience}/>
                                ))
                            }
                        </Fragment>) :
                        (<h4>No experience credentials</h4>)}
                </div>
                
                <div className="profile-edu bg-white p-2">
                    <h2 className='text-primary'>Education</h2>
                    {profile.education.length > 0 ?
                        (<Fragment>
                            {
                                profile.experience.map(education => (
                                    <ProfileEducation key={education._id} education={education}/>
                                ))
                            }
                        </Fragment>) :
                        (<h4>No education credentials</h4>)}
                </div>
            </div>
        </Fragment>}

    </Fragment>
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);