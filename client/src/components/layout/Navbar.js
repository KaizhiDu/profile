/**
 * Created by Kaizhi Du on 2019/11/5.
 */
import React, {Fragment} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from "../../actions/auth";

const Navbar = ({logout, auth: {loading, isAuthenticated}}) => {

    const authLinks = (
        <ul>
            <li>
                <a onClick={logout}>Logout</a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <a href="#">Developers</a>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </ul>
    );

    return (
        <div>
            <nav className="navbar bg-dark">
                <h1>
                    {
                        isAuthenticated ? (<Fragment><Link to="/dashboard"><i className="fas fa-code"></i> DevConnector</Link></Fragment>)
                            : (<Fragment><Link to="/"><i className="fas fa-code"></i> DevConnector</Link></Fragment>)
                    }

                </h1>
                <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            </nav>
        </div>
    )
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logout})(Navbar);