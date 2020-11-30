import React, { Component } from 'react';
 
class TaskStatistic extends Component {
    render() {
        return (
            <div className="body body-s">
                <div action="" className="sky-form">
                <header>테스크 통계 화면</header>

                <fieldset>
                <div id = "admin">
                    <span id="adminMain"><a href="{% url 'administrator:adminMain' %}">관리자 메인 화면</a></span>
                </div>
                <h1>테스크 통계 화면</h1>
                
                    <section>
                        <div id="file-task">
                        <h2>
                            각 테스크 별로 전체 제출된 파일 수
                        </h2>
                        
                        <table>
                            {/*
                            {% for singleFile in file_task %}
                            <th>태스크명</th>
                            <th>파일 수</th>
                            <tr class="fileTask">
                                <td>{{singleFile.TaskName}}</td>
                                <td class="fileTaskCount">{{singleFile.count}}</td>
                            </tr>
                            {% endfor %}
                            */}
                        </table>
                        
                        </div>
                    </section>

                    <section>
                        <div id="tuple-task">
                            <h2>
                                각 테스크별로 pass되어 테스크 데이터 테이블에 저장된 tupel 수
                            </h2>
                        <table>
                            {/*
                            {% for singleTask in tuple_task %}
                                <th>태스크명</th>
                                <th>tuple 수</th>
                                <tr class="tupleTask">
                                    <td>{{singleTask.TaskName}}</td>
                                    <td class="tupleTaskCount">{{singleTask.count}}</td>
                                </tr>
                            {% endfor %}
                            */}
                        </table>
                        </div>
                    </section>
                    

                    <section>
                        <div id="original-file">
                            <h2>
                                각 원본 데이터 타입별로 전체 제출된 파일 수
                            </h2>
                        <table>
                            {/*
                            {% for originalFile in file_original %}
                            <th>원본 데이터 타입명</th>
                            <th>파일 수</th>
                                <tr class="originalFile">
                                    <td>{{originalFile.OriginalName}}</td>
                                    <td class="originalFileCount">{{originalFile.count}}</td>
                                </tr>
                            {% endfor %}
                            */}
                        </table>
                        </div>
                    </section>

                    
                    <section>
                        
                        <div id="original-tuple">
                            <h2>
                                각 원본 데이터 타입별로 pass되어 테스크 데이터 테이블에 저장된 tuple 수
                            </h2>
                        <table>
                        {/*
                            <th>원본 데이터 타입명</th>
                            <th>tuple 수</th>
                            {% for originalTuple in tuple_original %}
                            <tr class="originalTuple">
                                <td>{{originalTuple.OriginalName}}</td>
                                <td class="originalTupleCount">{{originalTuple.count}}</td>
                            </tr>
                            {% endfor %}
                        */}
                        </table>
                        </div>
                    </section>
                    <section>
                        <div id="submitter-now">
                            <h2>
                                각 테스크에 참여 중인 제출자들의 목록
                            </h2>
                            <table>
                            {/*
                                <th>테스크명</th>
                                <th>제출자명</th>

                                {% for nowSubmitter in submitter_now %}
                                <tr class="nowSubmitter">
                                    <td>{{nowSubmitter.TaskName}}</td>
                                    <td><a href="{% url 'administrator:taskNow' name=nowSubmitter.SubmitterName %}">{{nowSubmitter.SubmitterName}}</a></td>
                                </tr>
                                {% endfor %}
                            */}
                            </table>
                    
                        </div>
                    </section>
                </fieldset>

                </div>
            </div>
        );
    }
}
 
export default TaskStatistic;