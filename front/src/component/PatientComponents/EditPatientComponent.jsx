import React, { Component } from 'react'
import PatientService from '../../services/PatientService';
import * as alertify from 'alertifyjs';
import "alertifyjs/build/css/alertify.css";

export default class EditPatientComponent extends Component {
    constructor(props) {
        super(props)
        this.state ={
            patientid: '',
            name: '',
            lastname: '',
            gender: 'Male',
            email: '',
            age:0 ,
            city: 'Ankara',
            status: 1
        }
        this.loadPatient = this.loadPatient.bind(this);
    }
    componentDidMount() {
        this.loadPatient();
          
    }

    loadPatient() {
        //console.log(window.localStorage.getItem("patientId"))
        PatientService.getPatientById(window.localStorage.getItem("patientId"))
            .then((res) => {
                let p = res.data;
                this.setState({
                    patientid: p.patientid,
                    name: p.name,
                    lastname: p.lastname,
                    email: p.email,
                    gender: p.gender,
                    age: p.age,
                    city: p.city,
                    status: p.status,
                })
            });
    }
    editPatient = (e) => {
        e.preventDefault();
        let patient = { 
            patientid: window.localStorage.getItem("patientId"),
            name: this.state.name, 
            lastname: this.state.lastname, 
            gender: this.state.gender, 
            email: this.state.email, 
            age: this.state.age, 
            city: this.state.city,
            status: this.state.status };
        PatientService.editPatient(patient)
            .then(res => {
                this.props.history.push('/patients');
                
                alertify.success("Editing is ok");
            });
    }

    handleChangeGender = (event) => this.setState({ gender: event.target.value});
    handleChangeCity = (event) => this.setState({ city: event.target.value});
    onChange = (e) =>  this.setState({ [e.target.name]: e.target.value });
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <h2 className="text-center">Edit Patient</h2>
                        <hr/>
                        <form>
                        <div className="form-group">
                            <label >User Name:</label>
                            <input type="text" placeholder="name" name="name" className="form-control"  value={this.state.name}  onChange={this.onChange}/>
                        </div>
                        <div className="form-group">
                            <label>Last Name:</label>
                            <input type="text"  placeholder="Last name" name="lastname" className="form-control" value={this.state.lastname} onChange={this.onChange} />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" placeholder="Email" name="email" className="form-control" value={this.state.email} onChange={this.onChange} />
                        </div>
                        <div className="form-group">
                            <label>Age:</label>
                            <input type="number" placeholder="age" name="age" className="form-control" value={this.state.age} onChange={this.onChange} />
                        </div>
                        <div className="form-group">
                            <label>Gender:</label>
                            <select  className="form-control" value={this.state.gender} onChange={this.handleChangeGender} >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                         </div>
                        <div className="form-group">
                            <label>City:</label>
                            <select  className="form-control" value={this.state.city} onChange={this.handleChangeCity} >
                                
                                <option value="Adana">Adana</option>
                                <option value="Ankara">Ankara</option>
                                <option value="Antalya">Antalya</option>
                                <option value="Bursa">Bursa</option>
                                <option value="Diyarbakır">Diyarbakır</option>
                                <option value="İzmir">İzmir</option>
                                <option value="İstanbul">İstanbul</option>
                                <option value="Karaman">Karaman</option>
                                <option value="Konya">Konya</option>
                                <option value="Manisa">Manisa</option>
                                <option value="Mugla">Mugla</option>
                                <option value="Samsun">Samsun</option>
                                <option value="Sivas">Sivas</option>
                                <option value="Osmanniye">Osmaniye</option>
                                <option value="Zonguldak">Zonguldak</option>
                            </select>
                         </div>
                        <button className="btn btn-success" onClick={this.editPatient}>Update</button>
                    </form>
                    </div>
                    
                    <div className="col-lg-6">
                        <img style={{width: 500, height: 300}} src="https://cdn.dribbble.com/users/6060/screenshots/3028817/dribbble.jpg" alt="" />

                    </div>
                    <div className="col-sm-12">
                        
                        <hr/>
                        <hr/>
                        <hr/>
                    </div>
                </div>
            </div>
        )
    }
}