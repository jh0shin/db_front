import React, { Component } from 'react';

class ManageTask extends Component {

    state = {
        toggle: false,

        ItemList: [],
    };


    //manageMain
    loadData1 = async () => {
        axios.post("http://localhost:3000/api/task/manage/", {
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



    //setPassval

    render() {
        const { Itemcard } = this.props;
        const tasklist = (
          <div>{this.state.ItemList}</div>
        );
        return (
            <div className="wrapper">
                <div className="table">
                    <div className="row2-header">
                        <div className="cell">taskname</div>
                        <div className="cell">explanation</div>
                        <div className="cell">manage task</div>

                        </div>
                        {this.state.ItemList &&
                            this.state.ItemList.map((itemdata) => {
                                return (
                                    <div className="row2" onClick={this.togglePop.bind(this, itemdata[0])} key={itemdata[0]}>
                                        <div className="cell" data-title="TaskName">{itemdata[0]}</div>
                                        <div className="cell" data-title="Explanation">{itemdata[1]}</div>
                                        <div className="cell">manage task</div>
                                    </div>
                                );
                            })
                        }
                    </div>

                    {this.state.toggle ? <Popup id={this.state.id} role={this.state.role} closePopup={this.togglePop.bind(this)} /> : null}
                </div>
            </div>
        );
    }
  }



class PopWindow extends Component {
  state = {
      loading: false,
      ItemListODT: [],
      ItemListMember : []
  };


  //showDatatype
  loadData1 = async () => {
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
  loadData2 = async () => {
      axios.post("http://localhost:3000/api/task/getmember/", {

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



  loadData3 = async () => {
      axios.post("http://localhost:3000/api/task/setpass/", {
          "taskname": this.state.taskname,
          "passval": this.state.passval
      }).then((response) => {
          this.setState({
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


  componentDidMount() {
      this.loadData();
  }

  render() {
      const { id, role } = this.props;

      const adminView = (
          <div>{this.state.ItemListMember}</div>
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
                      this.state.ItemList.map((itemdata) => {
                          return (
                              <div className="row2" key={itemdata[0]}>
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
                      <div className="cell">SCHEMAINFO</div>
                      <div className="cell">SCHEMATYPE</div>
                  </div>
                  {this.state.ItemListODT &&
                      this.state.ItemListODT.map((itemdata) => {
                          return (
                              <div className="row2" key={itemdata[0]}>
                                  <div className="cell" data-title="ID">{itemdata[0]}</div>
                                  <div className="cell" data-title="FileName">{itemdata[1]}</div>
                                  <div className="cell" data-title="P/NP">{itemdata[2]}</div>
                                  <div className="cell" data-title="Total tuple">{itemdata[3]}</div>
                                  <div className="cell" data-title="Dup tuple">{itemdata[4]}</div>
                                  <div className="cell" data-title="Null Ratio">{itemdata[5]}</div>
                                  <div className="cell" data-title="Quality">{itemdata[6]}</div>
                                  <div className="cell" data-title="Score">{itemdata[7]}</div>
                                  <div className="cell" data-title="Eval ID">{itemdata[8]}</div>
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
              <h3>{id}</h3>
          </div>
          <div className="modal-body">
              {(role === 'A') ? adminView
                  : (role === 'S' ? submitterView : evaluatorView)
              }
          </div>
          <div className="button_round" onClick={this.props.closePopup}>Close</div>
          </div>
        </div>
      );
    }
}

export default ManageTask;
