/**
 * Created by Kaizhi Du on 2019/11/10.
 */
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile'
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";

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
                {/*<ProfileTop profile={profile}/>*/}
            </div>
        </Fragment>}

    </Fragment>
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);