/**
 * Created by Kaizhi Du on 2019/11/6.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

const Alert = ({alerts}) =>
    alerts != null &&
    alerts.length > 0 &&
    alerts.map(alert =>(
        <div className={`alert alert-${alert.alertType}`} key={alert.id}>
            {alert.msg}
        </div>
    ));

Alert.prototype = {
    alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) =>({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert)