/**
 * Created by Kaizhi Du on 2019/11/5.
 */
import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from "../../actions/auth";

const Navbar = ({ logout, auth: { loading, isAuthenticated } }) => {

    const authLinks = (
        <ul>
            <li>
                <Link to='/profiles'>
                    <span className='hide-sm'>Developers</span>
                </Link>
            </li>
            <li>
                <Link to='/posts'>
                    <span className='hide-sm'>Posts</span>
                </Link>
            </li>
            <li>
                <a onClick={logout} href='#!'>
                    <span className='hide-sm' className='hide-sm'>Logout</span>
                </a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <Link to='/profiles'>
                    <span className='hide-sm'>Developers</span>
                </Link>
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

export default connect(mapStateToProps, { logout })(Navbar);