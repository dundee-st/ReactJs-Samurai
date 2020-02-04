import React from 'react';
import s from './ProfileStatus.module.css';

class ProfileStatus extends React.Component {
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
    onChangeStatus = (event) => {
        this.setState({ statusText: event.currentTarget.value })
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState({ status: this.props.status })
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