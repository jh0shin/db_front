import React, { Component } from 'react';
import axios from 'axios';

import '../../style.css'
 
class AddDatatype extends Component {
	state = {
		taskname: '',
		typename: '',
		ODTschema: '',
		mappingschema: ''
	}

	handleChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
	}
	
	handleSubmit = async () => {
		axios.post("http://localhost:3000/api/task/newodt/", {
			"taskname": this.state.taskname,
			"typename": this.state.typename,
			"ODTschema": this.state.ODTschema,
			"mappingschema": this.state.mappingschema
		}).then((response) => {
			if (response.data.state === "success") {
				window.Materialize.toast('New task data type created!', 2000);
				this.props.history.push('/admin');
			} else {
				console.log(response.data);
			}
		}).catch((e) => {
			window.Materialize.toast('Error Occured : ' + e, 2000);
			this.setState({
				taskname: this.props.location.search.split("=")[1],
				typename: '',
				ODTschema: '',
				mappingschema: ''
			})
		})
	}
	
	componentDidMount() {
		this.setState({
			taskname: this.props.location.search.split("=")[1]
		});
	}

    render() {
        return (
            <div className="body body-s">
            
                <div action="" className="sky-form">
				<header>Add New Original Data Type</header>
				
				<fieldset>								
					<section>
						<label className="input">
                            <label className="label">Data Type Name</label>
							<input name="typename" type="text" placeholder="Data type name"
								onChange={this.handleChange} value={this.state.typename}
							/>
						</label>
					</section>

					<section>
						<label className="input">
                            <label className="label">Original Data Type Creation Schema (Query)</label>
							<label className="textarea">
                                <i className="icon-append icon-comment"></i>
                                <textarea name="ODTschema" rows="4"
									onChange={this.handleChange} value={this.state.ODTschema}
								></textarea>
                            </label>
							<b className="tooltip tooltip-bottom-right">Needed to verify your account</b>
						</label>
					</section>
					
					<section>
                        <label className="label">Mapping Query from Original Data Type to Task Data Table</label>
						<label className="input">
                            <label className="textarea">
                                <i className="icon-append icon-comment"></i>
                                <textarea name="mappingschema" rows="4"
									onChange={this.handleChange} value={this.state.mappingschema}
								></textarea>
                            </label>
							<b className="tooltip tooltip-bottom-right">Only latin characters and numbers</b>
						</label>
					</section>
				</fieldset>
					
				<footer>
					<button onClick={this.handleSubmit} className="button">Create</button>
				</footer>
			</div>
			
		    </div>
        );
    }
}
 
export default AddDatatype;