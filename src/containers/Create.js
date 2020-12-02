import React, { Component } from 'react';
import { CreateTask } from '../components';

// redux
import { connect } from 'react-redux';
import { taskCreateRequest } from '../actions/task';

class Create extends Component {
    handleCreate = (name, description, minuploadcycle, tdtname, tdtschema) => {
        return this.props.taskCreateRequest(name, description, minuploadcycle, tdtname, tdtschema).then(
            () => {
                if (this.props.status === "SUCCESS") {
                    window.Materialize.toast('태스크 생성이 완료되었습니다.', 2000);
                    this.props.history.push('/admin/adddatatype?taskname=' + name);
                    return true;
                } else {
                    let $toastContent = window.$('<span style="color: #FFB4BA">' + this.props.errorMessage + '</span>');
                    window.Materialize.toast($toastContent, 2000);
                    return false;
                }
            }
        );
    }

    render() {
        return (
            <div>
                <CreateTask
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}

// ==================================================
// can use redux state and thunk like component props
const mapStateToProps = (state) => {
    return {
        status: state.task.submit.status,
        errorMessage: state.task.submit.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        taskCreateRequest: (name, description, minuploadcycle, tdtname, tdtschema) => {
            return dispatch(taskCreateRequest(name, description, minuploadcycle, tdtname, tdtschema));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);