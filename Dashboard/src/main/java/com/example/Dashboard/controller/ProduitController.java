package com.example.Dashboard.controller;

import com.example.Dashboard.model.Produit;
import com.example.Dashboard.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/produit")
public class ProduitController {
	@Autowired
	ProduitRepository produitRepository;

	@PostMapping("/add-produit")
	public ResponseEntity<Produit> addProduit(@RequestBody Produit produit) {
		try {
			Produit _produit = produitRepository
					.save(new Produit(
							produit.getDesignation(),
							produit.getCodeConception(),
							produit.getDecalageHoraire(),
							produit.getCodeFournisseur(),
							produit.getDateCreation(),
							produit.getReference()));
			return new ResponseEntity<>(_produit, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/get-all-produit")
	public ResponseEntity<List<Produit>> getAllProduit() {
		try {
			List<Produit> produits = new ArrayList<Produit>();
			produitRepository.findAll().forEach(produits::add);

			if (produits.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(produits, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/get-produits/{id}")
	public ResponseEntity<Produit> getproduitById(@PathVariable("id") long id) {
		Optional<Produit> produitData = produitRepository.findById(id);

		if (produitData.isPresent()) {
			return new ResponseEntity<>(produitData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("/update-produit/{id}")
	public ResponseEntity<Produit> updateProduit(@PathVariable("id") long id, @RequestBody Produit produit) {
		Optional<Produit> produitData = produitRepository.findById(id);

		if (produitData.isPresent()) {
			Produit _produit = produitData.get();
			_produit.setCodeConception(produit.getCodeConception());
			_produit.setCodeFournisseur(produit.getCodeFournisseur());
			_produit.setDateCreation(produit.getDateCreation());
			_produit.setDecalageHoraire(produit.getDecalageHoraire());
			_produit.setDesignation(produit.getDesignation());
			_produit.setReference(produit.getReference());
			return new ResponseEntity<>(produitRepository.save(_produit), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/delete-produit/{id}")
	public ResponseEntity<HttpStatus> deleteProduitById(@PathVariable("id") long id) {
		try {
			produitRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/delete-all-produit")
	public ResponseEntity<HttpStatus> deleteAllProduit() {
		try {
			produitRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

}
