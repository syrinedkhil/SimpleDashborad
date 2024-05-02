package com.example.Dashboard.model;

import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "OrdreFabrication")
public class OrdreFabrication {
	@Id
	@GeneratedValue ( strategy = GenerationType.IDENTITY )
	private Long ordreFabricationId;
	@Temporal ( TemporalType.DATE )

	private Date dateCreation;
	@Temporal ( TemporalType.DATE )

	private Date dateDebutLancement;


	private int qteProduite;
	private int qteDemander;
	@Temporal ( TemporalType.DATE )

	private Date dateFinLancement;
	private String observation;

	public OrdreFabrication ( ) {
	}

	public OrdreFabrication ( Date dateCreation , Date dateDebutLancement,
							  int qteProduite ,int qteDemander,

							  Date dateFinLancement,
							  String observation) {
		this.dateCreation = dateCreation;
		this.dateDebutLancement = dateDebutLancement;

		this.qteProduite = qteProduite;
		this.qteDemander=qteDemander;
		this.dateFinLancement = dateFinLancement;
		this.observation=observation;


	}
	@ManyToOne
	@JoinColumn ( name = "clientId" )
	private Client client;
	@OneToMany(mappedBy = "ordreFabrication",cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Ordre> ordres;
	@ManyToOne
	@JoinColumn ( name = "produitId" )
	private Produit produit;

	@OneToMany ( mappedBy = "ordreFabrication", cascade = CascadeType.ALL, orphanRemoval = true )
	private List < Tag > tags;

	public Long getordreFabricationId ( ) {
		return ordreFabricationId;
	}

	public Date getDateCreation ( ) {
		return dateCreation;
	}

	public void setDateCreation ( Date dateCreation ) {
		this.dateCreation = dateCreation;
	}



	public int getQteProduite ( ) {
		return qteProduite;
	}

	public void setQteProduite ( int qteProduite ) {
		this.qteProduite = qteProduite;
	}

	public Date getDateDebutLancement ( ) {
		return dateDebutLancement;
	}

	public void setDateDebutLancement ( Date dateDebutLancement ) {
		this.dateDebutLancement = dateDebutLancement;
	}

	public Date getDateFinLancement ( ) {
		return dateFinLancement;
	}

	public void setDateFinLancement ( Date dateFinLancement ) {
		this.dateFinLancement = dateFinLancement;
	}

	public Produit getProduit ( ) {
		return produit;
	}

	public void setProduit ( Produit produit ) {
		this.produit = produit;
	}

	public Client getClient ( ) {
		return client;
	}

	public void setClient ( Client client ) {
		this.client = client;
	}


	public int getQteDemander ( ) {
		return qteDemander;
	}

	public void setQteDemander ( int qteDemander ) {
		this.qteDemander = qteDemander;
	}


	public String getObservation ( ) {
		return observation;
	}

	public void setObservation ( String observation ) {
		this.observation = observation;
	}
}
