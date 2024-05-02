package com.example.Dashboard.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "SuiviProduction")
public class SuiviProduction {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idSuiviProduction;
	private LocalDate dateLecture;
	private LocalTime time;

	public SuiviProduction() {}

	@PrePersist
	protected void onCreate() {
		dateLecture = LocalDate.now();
		time = LocalTime.now();
	}
	@ManyToOne
	@JoinColumn(name = "idTag")
	private Tag tag;
	@ManyToOne
	@JoinColumn(name = "ordreFabricationId")
	private OrdreFabrication ordreFabrication;
	@ManyToOne
	@JoinColumn(name = "produitId")
	private Produit produit;

	@ManyToOne
	@JoinColumn(name = "idUtilisateur")
	private Utilisateur utilisateur;
	// Getters and setters
	public Long getIdSuiviProduction() {
		return idSuiviProduction;
	}


	public LocalDate getDateLecture() {
		return dateLecture;
	}




	public LocalTime getTime() {
		return time;
	}



	public Tag getTag() {
		return tag;
	}

	public void setTag(Tag tag) {
		this.tag = tag;
	}

	public OrdreFabrication getOrdreFabrication() {
		return ordreFabrication;
	}

	public void setOrdreFabrication(OrdreFabrication ordreFabrication) {
		this.ordreFabrication = ordreFabrication;
	}

	public Produit getProduit() {
		return produit;
	}

	public void setProduit(Produit produit) {
		this.produit = produit;
	}

	public Utilisateur getUtilisateur() {
		return utilisateur;
	}

	public void setUtilisateur(Utilisateur utilisateur) {
		this.utilisateur = utilisateur;
	}
}
