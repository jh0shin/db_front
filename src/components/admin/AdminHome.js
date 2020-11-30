import React, { Component } from 'react';
import Routes from './Routes';
 
class AdminHome extends Component {
    render() {
        return (
            <div className="body body-s">
                <div action="" className="sky-form">
                <header>관리자 메인 화면</header>
                
                <fieldset> 
                    <p>
                        어느 기능을 사용하고 싶습니까?
                    </p>
                        <span id="taskCreation"><a href="{% url 'administrator:taskCreation' %}">테스크 생성</a></span>
                        <span id="taskAdministration"><a href="{% url 'administrator:taskAdministration' %}">테스크 관리</a></span>
                        <span id="taskStatistics"><a href="{% url 'administrator:taskStatistics' %}">테스크 통계</a></span>
                        <span id="memberManagementStatistics"><a href="{% url 'administrator:memberManagementStatistics' %}">멤버 관리 및 통계</a></span>
                        <span id="signupCertification"><a href="{% url 'administrator:signupCertification' %}">회원가입 및 인증 기능</a></span>
                </fieldset>
                </div>
            </div>
        );
    }
}
 
export default AdminHome;