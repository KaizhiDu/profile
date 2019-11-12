/**
 * Created by Kaizhi Du on 2019/11/10.
 */
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import ProfileItem from "./ProfileItem";
import Spinner from "../layout/Spinner";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {

    useEffect(() => {
        getProfiles();
    }, []);
    return <Fragment>
        <h1 className='large text-primary'>Developers</h1>
        <p className='lead'>
            <i className='fab fa-connectdevelop'></i> Browse and connect with developers
        </p>
        <div className='profiles'>

            {loading && profiles ? <Spinner/>
                : <Fragment>
                    {profiles.length > 0 ?
                        (
                            profiles.map(profile =>
                                <ProfileItem key={profile._id} profile={profile}/>
                            )
                        )
                        :
                        <h4>No Profiles found ...</h4>}
                </Fragment>
            }


        </div>
    </Fragment>
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);