import React, { Component } from 'react'
import ApiService from '../services/ApiService';

export default class EditPatientComponent extends Component {
    constructor(props) {
        super(props)
        this.state ={
            patientid: '',
            name: '',
            lastname: '',
            gender: '',
            age:0 ,
            city: '',
            status: 1
        }
        this.loadPatient = this.loadPatient.bind(this);
    }
    componentDidMount() {
        this.loadPatient();
          
    }

    loadPatient() {
        //console.log(window.localStorage.getItem("patientId"))
        ApiService.fetchPatientById(window.localStorage.getItem("patientId"))
            .then((res) => {
                let p = res.data;
                this.setState({
                    patientid: p.patientid,
                    name: p.name,
                    lastname: p.lastname,
                    gender: p.gender,
                    age: p.age,
                    city: p.city,
                    status: p.status,
                })
            });
    }
    saveUser = (e) => {
        e.preventDefault();
        let patient = { 
            id: window.localStorage.getItem("patientId"),
            name: this.state.name, 
            lastname: this.state.lastname, 
            gender: this.state.gender, 
            age: this.state.age, 
            city: this.state.city,
            status: this.state.status };
            console.log(patient)
        ApiService.editPatient(patient)
            .then(res => {
                this.setState({ message: 'User updated successfully.' });
                this.props.history.push('/patients');
            });
    }

    handleChangeGender = (event) => this.setState({ gender: event.target.value});
    handleChangeCity = (event) => this.setState({ city: event.target.value});
    onChange = (e) =>  this.setState({ [e.target.name]: e.target.value });
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h2 className="text-center">Edit Patient</h2>
                        <p>{this.state.name}  {this.state.lastname}   {this.state.city}</p>
                        <hr/>
                        <form>
                        <div className="form-group">
                            <label >User Name:</label>
                            <input type="text" placeholder="name" name="name" className="form-control"  value={this.state.name}  onChange={this.onChange}/>
                        </div>
                        <div className="form-group">
                            <label>Last Name:</label>
                            <input placeholder="Last name" name="lastname" className="form-control" value={this.state.lastname} onChange={this.onChange} />
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
                        <button className="btn btn-success" onClick={this.saveUser}>Update</button>
                    </form>
                    </div>
                </div>
            </div>
        )
    }
}