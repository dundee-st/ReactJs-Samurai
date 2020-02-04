import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = ({ profile, status, updateStatus }) => {
    if (!profile) {
        return <Preloader />
    }
    return (
        <div className={s.profileInfo}>
            <div>
                <img
                    className={s.image}
                    src={profile.photos.large}
                    alt="ava"
                />
            </div>
            <div className={s.descriptionBlock}>
                <p>Name: {profile.fullName}</p>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
                <p>Обо мне: {profile.aboutMe}</p>
                <p>Ищу работу: {profile.lookingForAJob === true ? "Да" : "Нет"}</p>
                <p>Какую работу ищу: {profile.lookingForAJobDescription}</p>
            </div>
            <div className={s.conacts}>
                <h4>Мои контакты</h4>
                {profile.contacts.facebook && <p>Facebook: {profile.contacts.facebook}</p>}
                {profile.contacts.website && <p>Website: {profile.contacts.website}</p>}
                {profile.contacts.vk && <p>VK: {profile.contacts.vk}</p>}
                {profile.contacts.twitter && <p>Twitter: {profile.contacts.twitter}</p>}
                {profile.contacts.instagram && <p>Instagram: {profile.contacts.instagram}</p>}
                {profile.contacts.youtube && <p>Youtube: {profile.contacts.youtube}</p>}
                {profile.contacts.github && <p>Github: {profile.contacts.github}</p>}
                {profile.contacts.mainLink && <p>MainLink: {profile.contacts.mainLink}</p>}
            </div>
        </div>
    );
};
export default ProfileInfo;
