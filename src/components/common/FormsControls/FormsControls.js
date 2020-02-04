import React from 'react';
import styles from './FormsControls.module.css';

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