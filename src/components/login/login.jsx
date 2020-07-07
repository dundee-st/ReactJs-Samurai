import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../common/FormsControls/FormsControls';
import { required } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { logIn } from '../../redux/auth-reducer(reserv js)';
import { Redirect } from 'react-router-dom';
import style from "../common/FormsControls/FormsControls.module.css"

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
    console.log(captchaUrl)
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field type="text" component={Input} placeholder={"Email"} name={'email'}
                    validate={[required]} />
            </div>
            <div>
                <Field type="password" component={Input} placeholder={"Password"} name={'password'}
                    validate={[required]} />
            </div>
            <div>
                <Field type="checkbox" component="input" placeholder={"Password"} name={'rememberMe'} id="rememberMe" />
                <label htmlFor="rememberMe">remember me</label>
            </div>

            {captchaUrl && <img src={captchaUrl} />}
            {captchaUrl &&
                <div>
                    <Field type="text" component="input" placeholder={"Symbols"} name={'captcha'}
                        validate={[required]} />
                </div>}

            {error && <div className={style.summaryError}>
                {error}
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    );
}

const LoginReduxForm = reduxForm({
    // a unique name for the form
    form: 'login'
})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.logIn(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm captchaUrl={props.captchaUrl} onSubmit={onSubmit} />
        </div>
    );

}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, { logIn })(Login);