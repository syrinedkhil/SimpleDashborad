package com.example.Dashboard.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "Client")
public class Client {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long clientId;
	private String name;
	private String adresse;
	private String email;
	private String telephone;
	@OneToMany(mappedBy = "client",cascade = CascadeType.ALL, orphanRemoval = true)
	private List <OrdreFabrication> ordresFabrication;
	public Client() {}
	public Client(String name,String adresse, String email, String telephone) {
		this.name= name;
		this.adresse = adresse;
		this.email = email;
		this.telephone = telephone;

	}
	// Getters and setters

	public Long getClientId() {
		return clientId;
	}

	public String getAdresse() {
		return adresse;
	}

	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

}
