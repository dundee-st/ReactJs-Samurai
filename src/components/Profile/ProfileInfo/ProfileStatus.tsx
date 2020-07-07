import React, { ChangeEvent } from 'react';
import s from './ProfileStatus.module.css';

type PropsType = {
    status: string
    updateStatus: (newStatus: string) => void
}
type StateType = {
    editMode: boolean
    statusText: string
}
class ProfileStatus extends React.Component<PropsType, StateType> {
    state = {
        editMode: false,
        statusText: this.props.status
    }
    activateEditMode = () => {
        this.setState({ editMode: true })
    }
    deactivateEditMode = () => {
        this.setState({ editMode: false });
        this.props.updateStatus(this.state.statusText);
    }
    onChangeStatus = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ statusText: event.currentTarget.value })
    }
    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if (prevProps.status !== this.props.status) {
            this.setState({ statusText: this.props.status })
        }
    }
    render() {
        return (
            <div className={s.statusBar}>
                {!this.state.editMode &&
                    <div>
                        <p onClick={this.activateEditMode}>{this.props.status || "no status now"}</p>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input autoFocus={true} onBlur={this.deactivateEditMode} onChange={this.onChangeStatus} type="text" value={this.state.statusText} />
                    </div>
                }
            </div>
        );
    }
};
export default ProfileStatus;