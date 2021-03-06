import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';

import { addExperience } from '../../actions/profileActions';

class AddExperience extends Component {
    constructor(props) {
        super(props);

        this.state = {
            company: '',
            current: false,
            description: '',
            disabled: false,
            errors: {},
            from: '',
            location: '',
            title: '',
            to: ''
        };
    }

    componentWillReceiveProps = nextProps => {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    };

    onCheck = e => {
        this.setState(prevState => {
            return {
                current: !prevState.current,
                disabled: !prevState.disabled
            };
        });
    };

    onSubmit = e => {
        e.preventDefault();

        const expData = {
            company: this.state.company,
            current: this.state.current,
            description: this.state.description,
            from: this.state.from,
            location: this.state.location,
            title: this.state.title,
            to: this.state.to
        };

        this.props.addExperience(expData, this.props.history);
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const { errors } = this.state;

        return (
            <div className="add-experience">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go back
                            </Link>
                            <h1 className="display-4 text-center">
                                Add Experience
                            </h1>
                            <p className="lead text-center">
                                Add any job or position that you currently have
                                or have had.
                            </p>
                            <small className="d-block pb-3">
                                * = required field
                            </small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* Company"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                />
                                <TextFieldGroup
                                    placeholder="* Job Title"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.onChange}
                                    error={errors.title}
                                />
                                <TextFieldGroup
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                />
                                <h6>From date:</h6>
                                <TextFieldGroup
                                    name="from"
                                    type="date"
                                    value={this.state.from}
                                    onChange={this.onChange}
                                    error={errors.from}
                                />
                                <h6>To date:</h6>
                                <TextFieldGroup
                                    type="date"
                                    name="to"
                                    value={this.state.to}
                                    onChange={this.onChange}
                                    error={errors.to}
                                    disabled={
                                        this.state.disabled ? 'disabled' : ''
                                    }
                                />
                                <div className="form-check mb-4">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="current"
                                        value={this.state.current}
                                        checked={this.state.current}
                                        onChange={this.onCheck}
                                        id="current"
                                    />
                                    <label
                                        htmlFor="current"
                                        className="form-check-label">
                                        Current job
                                    </label>
                                </div>
                                <TextAreaFieldGroup
                                    placeholder="Job Description"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    error={errors.description}
                                    info="Tell us about the position"
                                />
                                <input
                                    type="submit"
                                    className="btn btn-info btn-block mt-4"
                                    value="Submit"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors,
    profile: state.profile
});

export default connect(
    mapStateToProps,
    { addExperience }
)(withRouter(AddExperience));
