import React, { useState, useEffect } from 'react';
import s from './ProfileStatus.module.css';

const ProfileStatusWithHooks = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }
    const onChangeStatus = (event) => {
        setStatus(event.currentTarget.value);
    }

    return (
        <div className={s.statusBar}>
            {!editMode &&
                <div>
                    <p onClick={activateEditMode}><b>Статус: </b>{props.status || "no status now"}</p>
                </div>
            }
            {editMode &&
                <div>
                    <input autoFocus={true} onBlur={deactivateEditMode} onChange={onChangeStatus} type="text" value={status} />
                </div>
            }
        </div>
    );
};
export default ProfileStatusWithHooks;