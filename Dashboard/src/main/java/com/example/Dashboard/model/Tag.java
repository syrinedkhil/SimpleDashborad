package com.example.Dashboard.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "Tag")
public class Tag {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idTag;
	private String operateur;

	@ManyToOne
	@JoinColumn(name = "ordreFabricationId")
	private OrdreFabrication ordreFabrication;
	@OneToMany(mappedBy = "tag",cascade = CascadeType.ALL, orphanRemoval = true)
	private List <SuiviProduction> suiviProduction;
	public Tag() {}


	public Tag(String operateur) {

		this.operateur = operateur;
	}

	public Long getIdTag() {
		return idTag;
	}



	public String getOperateur() {
		return operateur;
	}
	public void setOperateur(String operateur) {
		this.operateur=operateur;
	}

	public OrdreFabrication getOrderFabrication() {
		return ordreFabrication;
	}

	public void setOrderFabrication(OrdreFabrication ordre) {
		this.ordreFabrication = ordre;
	}
}