import React, { Component } from 'react';

import axios from "axios";

class Pop extends Component {
    state = {
        loading: false,
        ItemList: []
    };

    loadData = async () => {
        axios.post("http://localhost:3000/api/task/now/", {
            "submitterID": this.props.submitterID,
        }).then((response) => {
            console.log(response.data);
            this.setState({
                loading: true,
                ItemList: response.data.task_now,
            })
            console.log(this.state);
        }).catch(e => {
            console.error(e);
            this.setState({
                loading: false
            });
        });
    }



    componentDidMount() {
        this.loadData();
    }

    render() {
        return (
            <div>
                <div className="body">
                    <div className="wrapper">
                        <h6>
                            제출자가 참여 중인 태스크
                        </h6>
                        <div className="table">
                            <div className="row2-header">
                                <div className="cell">태스크명</div>
                            </div>
                            {this.state.ItemList &&
                                this.state.ItemList.map((itemdata) => {
                                    return (
                                        <div className="row2" key={itemdata[0]}>
                                            <div className="cell" data-title="FileCount">{itemdata[0]}</div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class TaskNow extends Component {
    state = {
        toggle: false,
        submitterID: ''
    };

    togglePop = (submitterID) => {
        this.setState({
            toggle: !this.state.toggle,
            submitterID: submitterID
        });
    };

    render() {
        const { Itemcard } = this.props;
        return (
            <div className="wrapper">
                <h6>
                    각 태스크에 참여 중인 제출자들의 목록
                </h6>
                <div className="table">
                    <div className="row2-header">
                        <div className="cell">태스크명</div>
                        <div className="cell">제출자ID</div>
                    </div>
                    {Itemcard &&
                        Itemcard.map((itemdata5) => {
                            return (
                                <div className="row2" onClick={this.togglePop.bind(this, itemdata5[1])} key={itemdata5[0]}>
                                    <div className="cell" data-title="taskname">{itemdata5[0]}</div>
                                    <div className="cell" data-title="submitterID">{itemdata5[1]}</div>
                                </div>
                            );
                        })
                    }
                    {this.state.toggle ? <Pop submitterID={this.state.submitterID} closePopup={this.togglePop.bind(this)} /> : null}
                </div>
            </div>
        );
    }
}
export default TaskNow;