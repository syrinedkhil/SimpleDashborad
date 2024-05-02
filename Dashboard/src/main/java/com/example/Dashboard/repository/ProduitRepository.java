package com.example.Dashboard.repository;

import com.example.Dashboard.model.Produit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository

public interface ProduitRepository extends JpaRepository<Produit, Long> {

	List<Produit> findByDesignation(String designation);
	List<Produit> findByReference(   String reference);


}
