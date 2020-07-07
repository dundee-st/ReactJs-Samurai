import React, { useState } from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../img/user2.png';
import ProfileDataForm from './ProfileDataForm';

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {

    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData) => {
        saveProfile(formData)
            .then(() => {
                setEditMode(false);
            })

    }
    return (
        <div className={s.profileInfo}>
            <div>
                <img
                    className={s.image}
                    src={profile.photos.large || userPhoto}
                    alt="ava"
                />
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
                {isOwner && <input type={'file'} onChange={onMainPhotoSelected} />}
            </div>
            {editMode ? <ProfileDataForm profile={profile} onSubmit={onSubmit} initialValues={profile} />  //initialValues задаёт стартовые значения для формы, нужно что бы совпадали имена полей формы и ключи в объекте
                : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => { setEditMode(true) }} />}  {/* через хук меняем editMode */}

        </div>
    );
};



const ProfileData = ({ profile, isOwner, goToEditMode }) => {
    return (
        <div>
            {
                isOwner && <div><button onClick={goToEditMode}>Изменить</button></div>
            }
            <div className={s.descriptionBlock}>
                <div className={s.fieldContainer}>
                    <p><b>Name: </b>{profile.fullName}</p>
                </div>
                <div className={s.fieldContainer}>
                    <p><b>Обо мне: </b>{profile.aboutMe}</p>
                </div>
                <div className={s.fieldContainer}>
                    <p><b>Ищу работу: </b>{profile.lookingForAJob === true ? "Да" : "Нет"}</p>
                </div>
                <div className={s.fieldContainer}>
                    <p><b>Какую работу ищу: </b> {profile.lookingForAJobDescription}</p>
                </div>
            </div>
            <div>
                {Object.keys(profile.contacts).map(key => (
                    <Contact key={key} contactsTitle={key} contactsValue={profile.contacts[key]} />
                ))}
            </div>
        </div>
    )
}

const Contact = ({ contactsTitle, contactsValue }) => {
    return (
        <div className={s.conacts}>
            {<p><b>{contactsTitle}:</b> {contactsValue}</p>}
        </div>
    )
}



export default ProfileInfo;
