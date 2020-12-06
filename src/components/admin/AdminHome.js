import React, { Component } from 'react';
 
class AdminHome extends Component {
    render() {
        return (
            <div className="body body-s">
                <div action="" className="sky-form">
                <header>관리자 메인 화면</header>
                
                <fieldset> 
                    <section>
                    <p>어느 기능을 사용하고 싶습니까?</p>
                    </section>
                    
                    <section>
                        <span id="taskCreation"><a href="/admin/createtask">태스크 생성</a></span>
                    </section>
                    <section>
                        <span id="taskAdministration"><a href="/admin/managetask">태스크 관리</a></span>
                    </section>
                    <section>
                        <span id="taskStatistics"><a href="/admin/taskstatistic">태스크 통계</a></span>
                    </section>
                    <section>
                        <span id="memberManagementStatistics"><a href="/admin/user">멤버 관리 및 통계</a></span>
                    </section>
                    <section>
                        <span id="modifyuserinfo"><a href="/info?id=admin">정보 수정</a></span>
                    </section>
                </fieldset>
                </div>
            </div>
        );
    }
}

export default AdminHome;