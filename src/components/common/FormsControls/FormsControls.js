import React from 'react';
import styles from './FormsControls.module.css';
import { Field } from 'redux-form';

export const TextArea = ({ input, meta: { touched, error }, ...props }) => {
    const hasError = touched && error;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : '')}>
            <textarea {...input} {...props} />
            <div>
                {hasError && <span>Some error</span>}
            </div>
        </div>
    )
}

export const Input = ({ input, meta: { touched, error }, ...props }) => {
    const hasError = touched && error;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : '')}>
            <input {...input} {...props} />
            <div>
                {hasError && <span>Some error</span>}
            </div>
        </div>
    )
}

export const createField = (placeholder, name, validators, component, props = {}, text = '') => (
    <div>
        <Field
            placeholder={placeholder}
            name={name}
            validators={validators}
            component={component}
            {...props}
        /> {text}
    </div>
)