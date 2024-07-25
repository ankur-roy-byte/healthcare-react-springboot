package com.example.demo.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OrderColumn;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.swing.ImageIcon;
import javax.swing.JLabel;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.XmlType;

import com.sun.istack.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "aapatient")
public class Patient {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "AA_PATIENT_SEQ")
	@SequenceGenerator(sequenceName = "AA_PATIENT_SEQ", allocationSize = 1, name = "AA_PATIENT_SEQ")
	@Column(name = "patientid")
	private Long patientid;
	private String name;
	private String lastname;
	private String gender;
	private String age;
	private String city;

//	@Column(name = "city", length = 100)
//	@Enumerated(EnumType.STRING)
//	private City city;
	private String email;
	private int status;

	@OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private List<Problem> problems;

	
	
	
	@Override
	public String toString() {
		return "Patient [patientid=" + patientid + ", name=" + name + ", lastname=" + lastname + ", gender=" + gender
				+ ", age=" + age + ", city=" + city + "]";
	}




	public Patient(String name, String lastname, String gender, String age, String city, String email, int status) {
		super();
		this.name = name;
		this.lastname = lastname;
		this.gender = gender;
		this.age = age;
		this.city = city;
		this.email = email;
		this.status = status;
	}

}
