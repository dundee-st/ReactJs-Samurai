import React from 'react';
import s from './ProfileInfo.module.css';
import { reduxForm } from 'redux-form';
import { Input, createField } from '../../common/FormsControls/FormsControls';

const ProfileDataForm = ({ profile, handleSubmit, error }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div><button >Сохранить</button></div>
            {error && <div className={s.summaryError}>
                {error}
            </div>
            }
            <div className={s.descriptionBlockForm}>
                <div className={s.fieldContainer}>
                    <p><b>Name: </b></p>{createField('Имя...', 'fullName', [], Input)}
                </div>

                <div className={s.fieldContainer}>
                    <p><b>Обо мне: </b></p>{createField('Обо мне...', 'aboutMe', [], Input)}
                </div>
                <div className={s.fieldContainer}>
                    <p><b>Ищу работу: </b></p>{createField('Вы ищете работу?', 'lookingForAJob', [], Input, { type: "checkbox" })}
                </div>
                <div className={s.fieldContainer}>
                    <p><b>Какую работу ищу: </b></p>{createField('Чем вы хотите заниматься?', 'lookingForAJobDescription', [], Input)}
                </div>
            </div >
            <div>
                {Object.keys(profile.contacts).map(key => (
                    <div key={key} className={s.contact}>
                        <b>{key}: </b>{createField(key, 'contacts.' + key, [], Input)}
                    </div>
                ))}
            </div>
        </form >
    )
}

const ProfileDataFormRedux = reduxForm({ form: "editProfile" })(ProfileDataForm);

export default ProfileDataFormRedux;