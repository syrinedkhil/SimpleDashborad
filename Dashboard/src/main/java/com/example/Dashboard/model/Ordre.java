package com.example.Dashboard.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table (name = "Ordre")
public class Ordre {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long idOrdre;
    @Temporal ( TemporalType.DATE )

    private Date dateDebutReel;
    @Temporal ( TemporalType.DATE )

    private Date dateFinReel;
 private String etat;
 public Ordre(){}
    public Ordre ( Date dateDebutReel , Date dateFinReel, String etat) {
        this.dateDebutReel = dateDebutReel;
        this.dateFinReel = dateFinReel;
        this.etat = etat;
    }
    @ManyToOne
    @JoinColumn ( name = "ordreFabricationId" )
    private OrdreFabrication ordreFabrication;

    public Date getDateFinReel ( ) {
        return dateFinReel;
    }

    public void setDateFinReel ( Date dateFinReel ) {
        this.dateFinReel = dateFinReel;
    }

    public Date getDateDebutReel ( ) {
        return dateDebutReel;
    }

    public void setDateDebutReel ( Date dateDebutReel ) {
        this.dateDebutReel = dateDebutReel;
    }

    public String getEtat ( ) {
        return etat;
    }

    public void setEtat ( String etat ) {
        this.etat = etat;
    }

    public OrdreFabrication getOrdreFabrication ( ) {
        return ordreFabrication;
    }

    public void setOrdreFabrication ( OrdreFabrication ordreFabrication ) {
        this.ordreFabrication = ordreFabrication;
    }

    public Long getIdOrdre ( ) {
        return idOrdre;
    }
}
