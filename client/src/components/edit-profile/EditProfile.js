import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';

import { createProfile, getCurrentProfile } from '../../actions/profileActions';

import isEmpty from '../../validation/is-empty';

class EditProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bio: '',
            company: '',
            displaySocialInputs: false,
            errors: {},
            facebook: '',
            githubusername: '',
            handle: '',
            instagram: '',
            linkedin: '',
            location: '',
            skills: '',
            status: '',
            twitter: '',
            website: '',
            youtube: ''
        };
    }

    componentDidMount = () => {
        this.props.getCurrentProfile();
    };

    componentWillReceiveProps = nextProps => {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }

        if (nextProps.profile.profile) {
            const profile = nextProps.profile.profile;

            // Bring skills array back to CSV
            const skillsCSV = profile.skills.join(',');

            // If profile field doesn't exist, make empty string
            profile.company = !isEmpty(profile.company) ? profile.company : '';
            profile.website = !isEmpty(profile.website) ? profile.website : '';
            profile.location = !isEmpty(profile.location)
                ? profile.location
                : '';
            profile.githubusername = !isEmpty(profile.githubusername)
                ? profile.githubusername
                : '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
            profile.social = !isEmpty(profile.social) ? profile.social : {};
            profile.social.facebook = !isEmpty(profile.social.facebook)
                ? profile.social.facebook
                : '';
            profile.social.twitter = !isEmpty(profile.social.twitter)
                ? profile.social.twitter
                : '';
            profile.social.instagram = !isEmpty(profile.social.instagram)
                ? profile.social.instagram
                : '';
            profile.social.linkedin = !isEmpty(profile.social.linkedin)
                ? profile.social.linkedin
                : '';
            profile.social.youtube = !isEmpty(profile.social.youtube)
                ? profile.social.youtube
                : '';

            // Set component field states
            this.setState({
                bio: profile.bio,
                company: profile.company,
                facebook: profile.social.facebook,
                githubusername: profile.githubusername,
                handle: profile.handle,
                instagram: profile.social.instagram,
                linkedin: profile.social.linkedin,
                location: profile.location,
                skills: skillsCSV,
                status: profile.status,
                twitter: profile.social.twitter,
                website: profile.website,
                youtube: profile.social.youtube
            });
        }
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const profileData = {
            bio: this.state.bio,
            company: this.state.company,
            facebook: this.state.facebook,
            githubusername: this.state.githubusername,
            handle: this.state.handle,
            instagram: this.state.instagram,
            linkedin: this.state.linkedin,
            location: this.state.location,
            skills: this.state.skills,
            status: this.state.status,
            twitter: this.state.twitter,
            website: this.state.website,
            youtube: this.state.youtube
        };

        this.props.createProfile(profileData, this.props.history);
    };

    render() {
        const { displaySocialInputs, errors } = this.state;

        let socialInputs;

        if (displaySocialInputs) {
            socialInputs = (
                <div>
                    <InputGroup
                        placeholder="Twitter profile URL"
                        name="twitter"
                        icon="fab fa-twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                    />
                    <InputGroup
                        placeholder="Facebook page URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                    />
                    <InputGroup
                        placeholder="LinkedIn profile URL"
                        name="linkedin"
                        icon="fab fa-linkedin"
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin}
                    />
                    <InputGroup
                        placeholder="Instagram profile URL"
                        name="instagram"
                        icon="fab fa-instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                    />
                    <InputGroup
                        placeholder="YouTube channel URL"
                        name="youtube"
                        icon="fab fa-youtube"
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={errors.youtube}
                    />
                </div>
            );
        }

        // Select options for Status
        const options = [
            {
                label: '* Select professional status',
                value: '0'
            },
            {
                label: 'Junior Developer',
                value: 'Junior Developer'
            },
            {
                label: 'Developer',
                value: 'Developer'
            },
            {
                label: 'Senior Developer',
                value: 'Senior Developer'
            },
            {
                label: 'Manager',
                value: 'Manager'
            },
            {
                label: 'Student/Learning',
                value: 'Student/Learning'
            },
            {
                label: 'Instructor/Teacher',
                value: 'Instructor/Teacher'
            },
            {
                label: 'Intern',
                value: 'Intern'
            },
            {
                label: 'Other',
                value: 'Other'
            }
        ];

        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go back
                            </Link>
                            <h1 className="display-4 text-center">
                                Edit Your Profile
                            </h1>
                            <small className="d-block pb-3">
                                * = required field
                            </small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* Profile handle"
                                    name="handle"
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    info="A unique handle for your profile URL."
                                />
                                <SelectListGroup
                                    placeholder="* Status"
                                    name="status"
                                    value={this.state.status}
                                    onChange={this.onChange}
                                    error={errors.status}
                                    options={options}
                                    info="Give us an idea of where you are at in your career"
                                />
                                <TextFieldGroup
                                    placeholder="Company"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                    info="Your own company, or one you work for."
                                />
                                <TextFieldGroup
                                    placeholder="Website"
                                    name="website"
                                    value={this.state.website}
                                    onChange={this.onChange}
                                    error={errors.website}
                                    info="Your own, or a company website."
                                />
                                <TextFieldGroup
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                    info="Suggested; city, or city & country."
                                />
                                <TextFieldGroup
                                    placeholder="Skills"
                                    name="skills"
                                    value={this.state.skills}
                                    onChange={this.onChange}
                                    error={errors.skills}
                                    info="Please used comma-separated values, e.g. HTML,CSS,JavaScript,etc."
                                />
                                <TextFieldGroup
                                    placeholder="GitHub Username"
                                    name="githubusername"
                                    value={this.state.githubusername}
                                    onChange={this.onChange}
                                    error={errors.githubusername}
                                    info="Include your GitHub username to display your latest activity and a profile link"
                                />
                                <TextAreaFieldGroup
                                    placeholder="Short bio"
                                    name="bio"
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    error={errors.bio}
                                    info="Tell us about yourself!"
                                />
                                <div className="mb-3">
                                    <button
                                        type="button"
                                        onClick={e => {
                                            this.setState(prevState => ({
                                                displaySocialInputs: !prevState.displaySocialInputs
                                            }));
                                        }}
                                        className="btn btn-white mr-2">
                                        Add Social Media Links{' '}
                                    </button>
                                    <span className="text-muted">Optional</span>
                                </div>
                                {socialInputs}
                                <input
                                    type="submit"
                                    value="Submit"
                                    onClick={this.onSubmit}
                                    className="btn btn-info btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
