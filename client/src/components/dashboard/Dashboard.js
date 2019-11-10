/**
 * Created by Kaizhi Du on 2019/11/7.
 */
import React, { Fragment, useEffect } from 'react';
import { connect } from "react-redux";
import { getCurrentProfile } from '../../actions/profile'
import { Link } from "react-router-dom";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile } }) => {

    useEffect(() => {
        getCurrentProfile();
    }, []);

    return (
        <Fragment>
            <h1 className='large text-primary'>Dashboard</h1>
            <p className='lead'>
                <i className='fas fa-user'>Welcome {user && user.name}</i>
            </p>
            {
                profile !== null ? (
                        <Fragment>
                            <DashboardActions/>
                            <Experience experience={profile.experience}/>
                            <Education education={profile.education}/>

                        </Fragment>
                    ) :
                    (<Fragment>
                        <p>You have not yet setup a profile, please add some info</p>
                        <Link to='/create-profile' className='btn btn-primary my-1'>
                            Create Profile
                        </Link>
                    </Fragment>)
            }
        </Fragment>
    );
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);