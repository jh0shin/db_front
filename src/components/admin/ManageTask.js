import React, { Component } from 'react';

class ManageTask extends Component {

    state = {
        loading: false,
        ItemList: []
    };

    ItemListTask = []
    ItemListMember = []
    ItemListODT = []

    //manageMain
    loadData1 = async () => {
        axios.post("http://localhost:3000/api/task/manage/", {
        }).then((response) => {
            this.setState({
                loading: true,
                ItemListTask: response.data.result
            })
            console.log(this.state);
        }).catch(e => {
            console.error(e);
            this.setState({
                loading: false
            });
        });
    }

    //addParticipant
    loadData2 = async () => {
        axios.post("http://localhost:3000/api/member/allow/", {
            "member_id": this.state.member_id,
            "taskname": this.state.taskname
        }).then((response) => {
            this.setState({
                loading: true,
                ItemListMember: response.data.result
            })
            console.log(this.state);
        }).catch(e => {
            console.error(e);
            this.setState({
                loading: false
            });
        });
    }

    //addDatatype
    loadData3 = async () => {
        axios.post("http://localhost:3000/api/task/allowodt/", {
            "taskname": this.state.taskname,
            "datatypename": this.state.datatypename,
            "mappingschema": this.state.mappingschema,
        }).then((response) => {
            this.setState({
                loading: true,
                ItemListODT: response.data.result
            })
            console.log(this.state);
        }).catch(e => {
            console.error(e);
            this.setState({
                loading: false
            });
        });
    }

    //setPassval
    loadData4 = async () => {
        axios.post("http://localhost:3000/api/task/setpass/", {
            "taskname": this.state.taskname,
            "passval": this.state.passval
        }).then((response) => {
            this.setState({
                loading: true,
                ItemListMember: response.data.result
            })
            console.log(this.state);
        }).catch(e => {
            console.error(e);
            this.setState({
                loading: false
            });
        });
    }

    render() {
        return (
            <div>
                <text>ManageTask page</text>
            </div>
        );
    }
}

class PopWaitingMember extends Component {
    state = {
        toggle: false,
        taskid: '',
        role: ''
    };

    togglePop = (id, role) => {
        this.setState({
            toggle: !this.state.toggle,
            id: id,
            role: role
        });
    };

    render() {
        const { Itemcard } = this.props;
        return (
            <div className="wrapper">
                <div className="table">
                    <div className="row2-header">
                        <div className="cell">ID</div>
                        <div className="cell">Gender</div>
                        <div className="cell">Age</div>
                        <div className="cell">Role</div>
                    </div>
                    {Itemcard &&
                        Itemcard.map((itemdata) => {
                            return (
                                <div className="row2" onClick={this.togglePop.bind(this, itemdata[0], itemdata[3])} key={itemdata[0]}>
                                    <div className="cell" data-title="id">{itemdata[0]}</div>
                                    <div className="cell" data-title="gender">{itemdata[1]}</div>
                                    <div className="cell" data-title="age">{itemdata[2]}</div>
                                    <div className="cell" data-title="role">{itemdata[3]}</div>
                                </div>
                            );
                        })
                    }
                    {this.state.toggle ? <Popup id={this.state.id} role={this.state.role} closePopup={this.togglePop.bind(this)} /> : null}
                </div>
            </div>
        );
    }
}

export default ManageTask;
