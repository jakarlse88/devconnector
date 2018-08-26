import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { getProfilesArr } from '../../actions/profileActions';

import ProfileItem from './ProfileItem';
import Spinner from '../common/Spinner';

class Profiles extends Component {
    componentDidMount = () => {
        this.props.getProfilesArr();
    };

    render() {
        const { profilesArr, loading } = this.props.profile;

        let profileItems;

        if (profilesArr === null || loading) {
            profileItems = <Spinner />;
        } else {
            if (profilesArr.length > 0) {
                profileItems = profilesArr.map(profile => (
                    <ProfileItem key={profile._id} profile={profile} />
                ));
            } else {
                profileItems = <h4>No profiles found.</h4>;
            }
        }

        return (
            <div className="profiles">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">
                                Developer Profiles
                            </h1>
                            <p className="lead text-center">
                                Browse and connect with developers.
                            </p>
                            {profileItems}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Profiles.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfilesArr: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(
    mapStateToProps,
    { getProfilesArr }
)(Profiles);
