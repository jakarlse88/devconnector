import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions'; // FIXME: this component name clashes with Redux actions file of same name
import Experience from './Experience';
import Education from './Education';

class Dashboard extends Component {
    componentDidMount = () => {
        this.props.getCurrentProfile();
    };

    onDeleteClick = e => {
        this.props.deleteAccount();
    };

    render() {
        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;

        let dashboardContent;

        if (profile === null || loading) {
            dashboardContent = <Spinner />;
            // Check whether logged-in user has profile data
        } else if (Object.keys(profile).length > 0) {
            dashboardContent = (
                <div>
                    <p className="lead text-muted">
                        Welcome,{' '}
                        <Link to={`/profile/${profile.handle}`}>
                            {user.name}
                        </Link>
                        !
                    </p>
                    <ProfileActions />
                    <Experience experience={profile.experience} />
                    <Education education={profile.education} />
                    <div style={{ marginBottom: '60px' }} />
                    <button
                        className="btn btn-danger"
                        onClick={this.onDeleteClick}>
                        Delete My Account
                    </button>
                </div>
            );
        } else {
            // User is logged in but has no profile
            dashboardContent = (
                <div>
                    <p className="lead text-muted">Welcome, {user.name}!</p>
                    <p>
                        You have not yet created a profile. Please add some
                        info.
                    </p>
                    <Link to="/create-profile" className="btn btn-lg btn-info">
                        Create Profile
                    </Link>
                </div>
            );
        }

        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Dashboard</h1>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { getCurrentProfile, deleteAccount }
)(Dashboard);
