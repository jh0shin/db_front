import React, { Component } from 'react';
import axios from 'axios';

class ManageTask extends Component {

    state = {
        loading: false,
        toggle: false,
        taskname: "",
        ItemList: [],
    };

    togglePop = (taskname) => {
        this.setState({
            toggle: !this.state.toggle,
            taskname: taskname
        })
    }


    //manageMain
    loadTaskData = async () => {
        axios.post("http://localhost:3000/api/task/manage/", {
        }).then((response) => {
            this.setState({
                ...this.state,
                loading: true,
                ItemList: response.data.task_list
            })
        }).catch(e => {
            console.error(e);
            this.setState({
                loading: false
            });
        });
    }

    componentDidMount () {
        this.loadTaskData();
    }

    //setPassval

    render() {
        const { Itemcard } = this.props;
        const tasklist = (
            <div>{this.state.ItemList}</div>
        );
        return (
            <div>
                <div className="button_round"><a href="/admin">관리자홈</a></div>
                <div className="wrapper">
                    <div className="table">
                        <div className="row2-header">
                            <div className="cell">taskname</div>
                            <div className="cell">explanation</div>
                            <div className="cell">click to manage task</div>
                        </div>

                            {this.state.ItemList &&
                                this.state.ItemList.map((itemdata) => {
                                    return (
                                        <div className="row2" onClick={this.togglePop.bind(this, itemdata[0])} key={itemdata[0]}>
                                            <div className="cell" data-title="TaskName">{itemdata[0]}</div>
                                            <div className="cell" data-title="Explanation">{itemdata[1]}</div>
                                            <div className="cell">click to manage task</div>
                                        </div>
                                    );
                                })
                            }
                        {this.state.toggle ? <PopWindow taskname={this.state.taskname} closePopup={this.togglePop.bind(this)} /> : null}
                    </div>
                </div>
            </div>
        );
    }
}



class PopWindow extends Component {
    state = {
        loading: false,
        passval: '',
        member_id: "",
        datatypename: "",
        ItemListODT: [],
        ItemListMember: []
    };


    //showDatatype
    showODT = async () => {
        axios.post("http://localhost:3000/api/task/getodt/", {
            "taskname": this.state.taskname,

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


    //showParticipant
    showMember = async () => {
        axios.post("http://localhost:3000/api/task/getmember/", {
            "taskname": this.props.taskname
        }).then((response) => {
            this.setState({
                ...this.state,
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



    setPasslimit = async () => {
        axios.post("http://localhost:3000/api/task/setpass/", {
            "taskname": this.props.taskname,
            "passval": this.props.passval
        }).then((response) => {
            this.setState({
                ...this.state,
                loading: true,
            })
            console.log(this.state);
        }).catch(e => {
            console.error(e);
            this.setState({
                loading: false
            });
        });
    }


    addParticipant = async () => {
        axios.post("http://localhost:3000/api/member/allow/", {
            "member_id": this.props.member_id,
            "taskname": this.props.taskname
        }).then((response) => {
            this.setState({
                ...this.state,
                loading: true,
            })
            console.log(this.state);
        }).catch(e => {
            console.error(e);
            this.setState({
                loading: false
            });
        });
    }

    addODT = async () => {
        axios.post("http://localhost:3000/api/member/allow/", {
            "taskname": this.props.taskname,
            "datatypename": this.props.datatypename,
        }).then((response) => {
            this.setState({
                ...this.state,
                loading: true,
            })
            console.log(this.state);
        }).catch(e => {
            console.error(e);
            this.setState({
                loading: false
            });
        });
    }

    handleChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }


    componentDidMount() {
        this.showODT();
        this.showMember();
    }



    render() {
        const { taskname } = this.props;
        const memberlist = (
            <div>{this.state.ItemListMember}</div>
        );
        const datatypelist = (
            <div>{this.state.ItemListODT}</div>
        );


        const submitterlist = (
            <div className="wrapper">
                <div className="table">
                    <div className="row2-header">
                        <div className="cell">ID</div>
                        <div className="cell">Name</div>
                        <div className="cell">EVALSCORE</div>
                    </div>
                    {this.state.ItemList &&
                        this.state.ItemListMember.map((itemdata) => {
                            return (
                                <div className="row2" onClick={this.addParticipant(itemdata[0], this.state.taskname)} key={itemdata[0]}>
                                    <div className="cell" data-title="ID">{itemdata[0]}</div>
                                    <div className="cell" data-title="Name">{itemdata[1]}</div>
                                    <div className="cell" data-title="EVALSCORE">{itemdata[2]}</div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );

        const odtList = (
            <div className="wrapper">
                <div className="table">
                    <div className="row2-header">
                        <div className="cell">SCHEMATYPE</div>
                        <div className="cell">SCHEMAINFO</div>
                        <div className="cell">DATATYPE_NAME</div>
                    </div>
                    {this.state.ItemListODT &&
                        this.state.ItemListODT.map((itemdata) => {
                            return (
                                <div className="row2" onClick={this.addODT(this.state.taskname, itemdata[0])} key={itemdata[1]}>
                                    <div className="cell" data-title="ID">{itemdata[2]}</div>
                                    <div className="cell" data-title="FileName">{itemdata[1]}</div>
                                    <div className="cell" data-title="P/NP">{itemdata[0]}</div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );

        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <div className="modal-header">
                        <h3>{taskname}</h3>
                    </div>
                    <div className="modal-body">
                        {submitterlist}
                        {odtList}
                    </div>
                    <div className="input">
                        <label className="label">Pass value</label>
                        <input passval="passval" onChange={this.handleChange} value={this.state.passval}
                        />
                        <div className="button_round" onClick={this.props.closePopup}>Close</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ManageTask;
