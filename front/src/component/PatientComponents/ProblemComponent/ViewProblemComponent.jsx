import React, { Component } from 'react'
import ProblemService from '../../../services/ProblemService'

export default class ViewProblemComponent extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            problemid: props.match.params.problemid,
            patient: {},
            problemDetail: null,
            problemName: null,
            pid: null,
            errorMessage: ""
        }
        this.loadProblemDetail = this.loadProblemDetail.bind(this);
    }

    componentDidMount() {
        this.loadProblemDetail();
    }
    loadProblemDetail() {
        ProblemService.getProblem(this.state.problemid).then(res => {
            let p = res.data;
            this.setState({
                problemDetail: p.problemDetail,
                problemName: p.problemName,
                pid: p.pid,
                patient: p.patient
            });
            console.log(this.state.patient)
        }).catch((error) => {
            // Error
            if (error.response) {
                console.log(error.response.data.message);
                this.setState({ errorMessage: error.response.data.message, problemid: null });

            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log(error.message);
            }
        });
        console.log("ViewProblemComponent")
    }
    viewPatient(id) {
        window.localStorage.setItem("patientId", id);
        this.props.history.push('/view-patient/' + id);
    }
    render() {
        return (
            <div className="container">

                {/* Show and close modal */}
                {
                    this.state.errorMessage !== '' ?
                        <div className="row">
                            <div className="col-sm-12">
                                <h3>Problem Details</h3>
                                <hr/>
                            </div>
                            <div className="col-lg-12">
                                <div className="alert alert-danger" role="alert">
                                    {this.state.errorMessage}
                                </div>
                            </div>
                        </div>
                        :
                        <div className="row">
                            <div className="col-sm-12">
                                <button 
                                className="btn btn-danger"
                                onClick={() => this.viewPatient(this.state.patient.patientid)}>Back</button>
                                <hr/>
                                <h3>Problem Details for {this.state.patient.name} {this.state.patient.lastname}</h3>
                                <hr/>
                            </div>
                            <div className="col-lg-6">
                                <div className="card" >
                                    <div className="card-header">
                                        Patient Detail
                                        </div>
                                    <ul className="text-left list-group list-group-flush">
                                        <li className="list-group-item"><b>Name : </b>{this.state.patient.name}</li>
                                        <li className="list-group-item"><b>Last Name : </b>{this.state.patient.lastname}</li>
                                        <li className="list-group-item"><b>Email :</b>{this.state.patient.email}</li>
                                        <li className="list-group-item"><b>City : </b>{this.state.patient.city}</li>
                                        <li className="list-group-item"><b>Age : </b>{this.state.patient.age}</li>
                                        <li className="list-group-item"><b>Gender : </b>{this.state.patient.gender}</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="card" >
                                    <div className="card-header">
                                        Problem Detail
                                        </div>
                                    <ul className="text-left list-group list-group-flush">
                                        <li className="list-group-item"><b>Name : </b>{this.state.problemName}</li>
                                        <li className="list-group-item"><b>Last Name : </b>{this.state.problemDetail}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                }
            </div>
        )
    }
}