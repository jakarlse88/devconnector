import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';

import { addEducation } from '../../actions/profileActions';

class AddEducation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            current: false,
            degree: '',
            description: '',
            disabled: false,
            errors: {},
            fieldofstudy: '',
            from: '',
            school: '',
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

        const eduData = {
            current: this.state.current,
            degree: this.state.degree,
            description: this.state.description,
            fieldofstudy: this.state.fieldofstudy,
            from: this.state.from,
            school: this.state.school,
            to: this.state.to
        };

        this.props.addEducation(eduData, this.props.history);
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const { errors } = this.state;

        return (
            <div className="add-education">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go back
                            </Link>
                            <h1 className="display-4 text-center">
                                Add Education
                            </h1>
                            <p className="lead text-center">
                                Add any school, bootcamp, etc., that you have
                                attended.
                            </p>
                            <small className="d-block pb-3">
                                * = required field
                            </small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* School"
                                    name="school"
                                    value={this.state.school}
                                    onChange={this.onChange}
                                    error={errors.school}
                                />
                                <TextFieldGroup
                                    placeholder="* Degree / Certification"
                                    name="degree"
                                    value={this.state.degree}
                                    onChange={this.onChange}
                                    error={errors.degree}
                                />
                                <TextFieldGroup
                                    placeholder="* Field of Study"
                                    name="fieldofstudy"
                                    value={this.state.fieldofstudy}
                                    onChange={this.onChange}
                                    error={errors.fieldofstudy}
                                />
                                <h6>* From date:</h6>
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
                                    placeholder="Program Description"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    error={errors.description}
                                    info="Tell us about the program that you were in"
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

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors,
    profile: state.profile
});

export default connect(
    mapStateToProps,
    { addEducation }
)(withRouter(AddEducation));
