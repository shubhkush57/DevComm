import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// for this we need to get the state from the react-redux store.
const Alert= ({alerts}) => alerts !== null && alerts.length>0 && alerts.map(alert =>(
    <div key = {alert.id} className= {`alert alert-${alert.alertType}`}>
        {alert.msg}
    </div>
));

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}
const mapStateToProps =(state)=>({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
