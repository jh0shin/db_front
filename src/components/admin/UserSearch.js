import React, { Component } from "react";
import axios from "axios";

class Popup extends Component {
    state = {
        loading: false,
        ItemList: []
    };

    loadData = async () => {
        if (this.props.id === "admin") {
            this.setState({
                loading: true,
                ItemList: ['Admin info is not visible']
            });
        }
        else {
            axios.post("http://localhost:3000/api/member/info/", {
                "userid": this.props.id,
                "role": this.props.role,
            }).then((response) => {
                this.setState({
                    loading: true,
                    ItemList: response.data.result
                })
                console.log(this.state);
            }).catch(e => {
                console.error(e);
                this.setState({
                    loading: false
                });
            });
        }
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        const { id, role } = this.props;

        const adminView = (
            <div>{this.state.ItemList}</div>
        );

        const submitterView = (
            <div>{this.state.ItemList}</div>
        );

        const evaluatorView = (
            <div>{this.state.ItemList}</div>
        );

        return (
          <div className='popup'>
            <div className='popup_inner'>
            <div className="modal-header">
                <h3>{id}</h3>
            </div>
            <div className="modal-body">
                {(role === 'A') ? adminView
                    : (role === 'S' ? submitterView : evaluatorView)
                }
            </div>
            <button onClick={this.props.closePopup}>close me</button>
            </div>
          </div>
        );
      }
}

class UserSearch extends Component {
    state = {
        toggle: false,
        id: '',
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

export default UserSearch;