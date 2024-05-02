package com.example.Dashboard.controller;

import com.example.Dashboard.model.*;
import com.example.Dashboard.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;

import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/suiviProduction")
public class SuiviProductionController {
	@Autowired
	SuiviProductionRepository suiviProductionRepository;
	@Autowired
	private TagRepository tagRepository;
	@Autowired
	private ProduitRepository produitRepository;
	@Autowired
	private UtilisateurRepository utilisateurRepository;
	@Autowired
	private OrdreFabricationRepository ordreFabricationRepository;

	@GetMapping("/get-all-suivi")
	public ResponseEntity<List<SuiviProduction>> getAllSuiviProduction() {
		try {
			List<SuiviProduction> suiviProductions = new ArrayList<SuiviProduction>();
			suiviProductionRepository.findAll().forEach(suiviProductions::add);

			if (suiviProductions.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(suiviProductions, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/lectures-par-jour")
	public Long countByDateLecture() {
		Date currentDate = new Date();
		LocalDate  date=currentDate.toInstant().atZone(ZoneId.systemDefault())
				.toLocalDate();

		return suiviProductionRepository.countByDateLecture(date);
	}

	@GetMapping("/lecture-par-mois")
	public List<Object[]> getLecturesByMonth() {

		int currentYear = java.time.Year.now().getValue();
		return suiviProductionRepository.countLecturesByMonth(currentYear);
	}
	@PostMapping("/add-suivi")
	public ResponseEntity<SuiviProduction> addSuivi(@RequestBody SuiviProduction suiviProduction) {
		try {
			Long produitId = suiviProduction.getProduit().getProduitId();
			Long tagId=suiviProduction.getTag().getIdTag();
			Long utilisateurId=suiviProduction.getUtilisateur().getIdUtilisateur();
			Long ordreFabricationId=suiviProduction.getOrdreFabrication().getordreFabricationId();

			Produit produit = produitRepository.findById(produitId).orElseThrow(() -> new Exception("Produit non trouvé"));
			Tag tag = tagRepository.findById(tagId).orElseThrow(() -> new Exception("tag non trouvé"));
			Utilisateur utilisateur = utilisateurRepository.findById(utilisateurId).orElseThrow(() -> new Exception("Utilisateur non trouvé"));
			OrdreFabrication ordreFabrication = ordreFabricationRepository.findById(ordreFabricationId).orElseThrow(() -> new Exception("Ordre non trouvé"));



			suiviProduction.setProduit(produit);
			suiviProduction.setTag(tag);
			suiviProduction.setUtilisateur(utilisateur);
			suiviProduction.setOrdreFabrication(ordreFabrication);
			SuiviProduction _suiviProductionRepository = suiviProductionRepository.save(suiviProduction);
			return new ResponseEntity<>(_suiviProductionRepository, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}



	@GetMapping("/get-suivi/{id}")
	public ResponseEntity<SuiviProduction> getSuiviProductionById(@PathVariable("id") long id) {
		Optional<SuiviProduction> suiviProductionData = suiviProductionRepository.findById(id);

		if (suiviProductionData.isPresent()) {
			return new ResponseEntity<>(suiviProductionData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("/update-suivi/{id}")
	public ResponseEntity<SuiviProduction> updateSuiviProduction(@PathVariable("id") long id,
																 @RequestBody SuiviProduction suiviProduction) {
		Optional<SuiviProduction> suiviProductionData = suiviProductionRepository.findById(id);

		if (suiviProductionData.isPresent()) {
			SuiviProduction _suiviProductionRepository = suiviProductionData.get();
			return new ResponseEntity<>(suiviProductionRepository.save(_suiviProductionRepository), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/delete-suivi/{id}")
	public ResponseEntity<HttpStatus> deleteSuiviProductionById(@PathVariable("id") long id) {
		try {
			suiviProductionRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/delete-all-suivi")
	public ResponseEntity<HttpStatus> deleteAllSuiviProduction() {
		try {
			suiviProductionRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping("/get-daily-tracking")
	public ResponseEntity<List<SuiviProduction>> getDailyTracking() {
		try {

			LocalDate currentDate = LocalDate.now();
			List<SuiviProduction> dailyTracking = suiviProductionRepository.findByDateLecture(currentDate);

			if (dailyTracking.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(dailyTracking, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}



}