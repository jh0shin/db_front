import React, { Component } from 'react';
import axios from 'axios';

import '../style.css';
class UserModify extends Component {
    state = {
        id: "",
        name: "",
        address: "",
        gender: "",
        phone: "",
        year: "",
        month: "",
        day: "",
        role: ""
    }

    handleChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleModify = () => {
        let birth = this.state.year + "-" + this.state.month + "-" + this.state.day;

        axios.post("http://localhost:3000/api/user/modify/", {
            "userid": this.state.id,
            "name": this.state.name,
            "address": this.state.address,
            "gender": this.state.gender,
            "phone": this.state.phone,
            "birth": birth
        }).then((response) => {
            let $toastContent = window.$('<span style="color: #FFB4BA">회원 정보 수정이 완료되었습니다.</span>');
            window.Materialize.toast($toastContent, 4000);
            if (this.state.role === "A")
                this.props.history.push('/admin');
            else if (this.state.role === "S")
                window.location.assign("http://localhost:3000/submitter?id=" + this.state.id)
            else
                window.location.assign("http://localhost:3000/evaluater?id=" + this.state.id)
        }).catch((e) => { });
    }

    handleWithdraw = async () => {
        if (this.state.id === "admin") {
            let $toastContent = window.$('<span style="color: #FFB4BA">admin은 탈퇴가 불가능합니다.</span>');
            window.Materialize.toast($toastContent, 4000);
        } else {
            axios.post("http://localhost:3000/api/user/delete/", {
                "userid": this.state.id
            }).then((response) => {
                let $toastContent = window.$('<span style="color: #FFB4BA">회원 탈퇴가 완료되었습니다.</span>');
                window.Materialize.toast($toastContent, 4000);
                this.props.history.push("/login");
            }).catch((e) => { });
        }
    }

    loadData = async () => {
        axios.post("http://localhost:3000/api/user/info/", {
            "userid": this.props.location.search.split("=")[1]
        }).then((response) => {
            this.setState({
                id: response.data.info[0],
                name: response.data.info[2],
                address: response.data.info[3],
                gender: response.data.info[4],
                phone: response.data.info[5],
                year: response.data.info[6].split("-")[0],
                month: response.data.info[6].split("-")[1],
                day: response.data.info[6].split("-")[2],
                role: response.data.info[7]
            })
            console.log(this.state);
        }).catch((e) => {
            console.error(e);
            let $toastContent = window.$('<span style="color: #FFB4BA">Error occured : ' + e + '</span>');
            window.Materialize.toast($toastContent, 4000);
            this.props.history.push("/");
        });
    }

    componentDidMount = () => {
        this.loadData();
    }

    render() {
        return (
            <div>
                <div className="button_round"><a href="/admin">관리자홈</a></div>
                <div className="body">
                    <div action="" className="sky-form">
                        <header>
                            Modify User Info
                    </header>
                        <fieldset>
                            <section>
                                <label className="input">
                                    <label className="label">ID</label>
                                    <input name="id" type="text" placeholder="user ID"
                                        disabled={true}
                                        onChange={this.handleChange} value={this.state.id}
                                    />
                                </label>
                            </section>

                            <section>
                                <label className="input">
                                    <label className="label">Name</label>
                                    <input name="name" type="text" placeholder="Name"
                                        onChange={this.handleChange} value={this.state.name}
                                    />
                                </label>
                            </section>

                            <section>
                                <label className="input">
                                    <label className="label">Address</label>
                                    <input name="address" type="text" placeholder="Address"
                                        onChange={this.handleChange} value={this.state.address}
                                    />
                                </label>
                            </section>

                            <section>
                                <label className="label">Gender</label>
                                <section>
                                    <label className="select">
                                        <select name="gender" onChange={this.handleChange} value={this.state.gender}>
                                            <option value="M">Male</option>
                                            <option value="W">Female</option>
                                        </select>
                                        <i></i>
                                    </label>
                                </section>
                            </section>

                            <section>
                                <label className="input">
                                    <label className="label">Phone</label>
                                    <input name="phone" type="text" placeholder="Phone (Please enter without '-')"
                                        onChange={this.handleChange} value={this.state.phone}
                                    />
                                </label>
                            </section>

                            <label className="label">Birth</label>
                            <div className="row">
                                <section className="col col-4">
                                    <label className="input">
                                        <input name="year" type="number" placeholder="Year"
                                            min="1900" max="2020"
                                            onChange={this.handleChange} value={this.state.year}
                                        />
                                    </label>
                                </section>
                                <section className="col col-4">
                                    <label className="input">
                                        <input name="month" type="number" placeholder="Month"
                                            min="01" max="12"
                                            onChange={this.handleChange} value={this.state.month}
                                        />
                                    </label>
                                </section>
                                <section className="col col-4">
                                    <label className="input">
                                        <input name="day" type="number" placeholder="Day"
                                            min="01" max="31"
                                            onChange={this.handleChange} value={this.state.day}
                                        />
                                    </label>
                                </section>
                            </div>

                            <section>
                                <label className="label">Role</label>
                                <section>
                                    <label className="select">
                                        <select name="role" onChange={this.handleChange} value={this.state.role}>
                                            <option value="S" disabled={true}>Submitter</option>
                                            <option value="E" disabled={true}>Evaluater</option>
                                        </select>
                                        <i></i>
                                    </label>
                                </section>
                            </section>
                        </fieldset>

                        <footer>
                            <button onClick={this.handleModify} className="button">정보 수정</button>
                            <button onClick={this.handleWithdraw} className="button">회원 탈퇴</button>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserModify;