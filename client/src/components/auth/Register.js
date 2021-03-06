import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const { name, email, password, password2 } = formData;

    const onChange = event => setFormData({ ...formData, [event.target.name]: event.target.value });

    const onSubmit = (event) => {
        event.preventDefault()
        if(password !== password2) {
           setAlert('passwords do not match', 'danger')
        } else {
            register({ name, email, password });
        }
    }

    if(isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <Fragment>
            <section className="auth-container">
            <h1 className="lg primary-txt">Sign Up</h1>
            <p className="lead">Create an account here</p>
            <form className="form auth-form" onSubmit={event => onSubmit(event)}>
                <div className="form-input form-element">
                    <input 
                    className="form-element-field" 
                    type="text" 
                    placeholder="Name"
                    value={name}
                    onChange={event => onChange(event)}
                    name="name"
                    required />
                    <div className="form-element-bar"></div>
                <label className="form-element-label">Name</label>
                </div>
                <div className="form-input form-element">
                    <input 
                    className="form-element-field" 
                    type="email" 
                    placeholder="Email"
                    value={email}
                    onChange={event => onChange(event)}
                    name="email"
                    required />
                     <div className="form-element-bar"></div>
                 <label className="form-element-label">Email</label>
                </div>
                <div className="form-input form-element">
                    <input 
                    className="form-element-field" 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={event => onChange(event)}
                    name="password"
                    required
                    minLength="6" />
                    <div className="form-element-bar"></div>
                <label className="form-element-label">Password</label>
                </div>
                <div className="form-input form-element">
                    <input 
                    className="form-element-field" 
                    type="password" 
                    placeholder="Confirm Password"
                    value={password2}
                    onChange={event => onChange(event)}
                    name="password2"
                    required
                    minLength="4" />
                    <div className="form-element-bar"></div>
                <label className="form-element-label">Password</label>
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1 primary-txt">Already have an account? <Link to='/login'>Login</Link></p>
            </section>
        </Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
