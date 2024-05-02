package com.example.Dashboard.model;

import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Produit")
public class Produit {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long produitId;
	private String designation;
	private String codeConception;
	private String decalageHoraire;
	private String codeFournisseur;
	@Temporal ( TemporalType.DATE )
	private Date dateCreation;
	private String reference;
	public Produit() {}
	public Produit(String designation, String codeConception, String decalageHoraire, String codeFournisseur,
				   Date dateCreation, String reference) {
		this.designation = designation;
		this.codeConception = codeConception;
		this.decalageHoraire=decalageHoraire;
		this.codeFournisseur = codeFournisseur;
		this.dateCreation = dateCreation;
		this.reference = reference;

	}

	@OneToMany(mappedBy = "produit",cascade = CascadeType.ALL, orphanRemoval = true)
	private List<OrdreFabrication> ordresFabrication;

	// Getters and setters
	public Long getProduitId() {
		return produitId;
	}
	public void setId(Long id) {
		this.produitId=id;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public String getCodeConception() {
		return codeConception;
	}

	public void setCodeConception(String codeConception) {
		this.codeConception = codeConception;
	}

	public String getCodeFournisseur() {
		return codeFournisseur;
	}

	public void setCodeFournisseur(String codeFournisseur) {
		this.codeFournisseur = codeFournisseur;
	}

	public Date getDateCreation() {
		return dateCreation;
	}

	public void setDateCreation(Date dateCreation) {
		this.dateCreation = dateCreation;
	}

	public String getReference() {
		return reference;
	}

	public void setReference(String reference) {
		this.reference = reference;
	}

	public String getDecalageHoraire() {
		return decalageHoraire;
	}

	public void setDecalageHoraire(String decalageHoraire) {
		this.decalageHoraire = decalageHoraire;
	}
}

