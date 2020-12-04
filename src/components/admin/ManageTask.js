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

export default ManageTask;
