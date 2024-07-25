import React, { Component } from 'react' 
import { withRouter } from 'react-router';
import Moment from 'react-moment';

class PatientDetailModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            patientid: props.patient.patientid,
            name: props.patient.name,
            lastname: props.patient.lastname,
            email: props.patient.email,
            phoneNo: props.patient.phoneNo,
            bornDate: props.patient.bornDate,
            gender: props.patient.gender,
            city: props.patient.city,
            message: ''
        }; 
    } 
    render() {
        var age = null;
        if (this.props.patient.bornDate != null) {
            var born = Number(this.props.patient.bornDate.substr(0, 4));
            var now = Number(new Date().toLocaleDateString('tr-TR').substr(6, 4));
            age = now - born;
        }
        return (
            <div className="modal fade" id="patientModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="exampleModalLabel">Patient Detail</h3>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <div className="card" >
                                    <div className="card-header"> <h3>{this.props.patient.name} {this.props.patient.lastname}</h3></div>
                                    <ul className="text-left list-group list-group-flush">
                                        <li className="list-group-item"><b>Patient id : </b>{this.props.patient.patientid}</li>
                                        <li className="list-group-item"><b>Name : </b>{this.props.patient.name}</li>
                                        <li className="list-group-item"><b>Last Name : </b>{this.props.patient.lastname}</li>
                                        <li className="list-group-item"><b>Phne No : </b>{this.props.patient.phoneNo}</li>
                                        <li className="list-group-item"><b>Age : </b>
                                            {age !== null ? age : null}
                                        </li>
                                        <li className="list-group-item"><b>Born Date : </b>
                                            {this.props.patient.bornDate !== null ?
                                                <Moment format="YYYY / MM / DD  HH:mm"> {this.props.patient.bornDate} </Moment> : null
                                            }
                                        </li>
                                        <li className="list-group-item"><b>Email : </b>{this.props.patient.email}</li>
                                        <li className="list-group-item"><b>City : </b>{this.props.patient.city}</li>
                                        <li className="list-group-item"><b>Gender : </b>{this.props.patient.gender}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(PatientDetailModal)
