package com.example.Dashboard.controller;

import com.example.Dashboard.model.Client;
import com.example.Dashboard.model.OrdreFabrication;
import com.example.Dashboard.model.Produit;
import com.example.Dashboard.model.SuiviProduction;
import com.example.Dashboard.repository.ClientRepository;
import com.example.Dashboard.repository.OrdreFabricationRepository;
import com.example.Dashboard.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/ordre-fabrication")
public class OrdreFabricationController {

	@Autowired
	OrdreFabricationRepository ordreFabricationRepository;
	@Autowired

	private ProduitRepository produitRepository;
	@Autowired

	private ClientRepository clientRepository;

	@PostMapping("/add-ordre-fabrication")
	public ResponseEntity<OrdreFabrication> addOrdreFabrication(@RequestBody OrdreFabrication ordreFabrication) {
		try {
			Long produitId = ordreFabrication.getProduit().getProduitId();
			Long clientId = ordreFabrication.getClient().getClientId();


			Produit produit = produitRepository.findById(produitId)
					.orElseThrow(() -> new Exception("Produit non trouvé"));

			Client client=clientRepository.findById(clientId)
					.orElseThrow(() -> new Exception("Produit non trouvé"));
			ordreFabrication.setProduit(produit);
			ordreFabrication.setClient(client);
			OrdreFabrication _ordreFabricationRepository = ordreFabricationRepository.save(ordreFabrication);
			return new ResponseEntity<>(_ordreFabricationRepository, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/get-all-ordre-fabrication")
	public ResponseEntity<List<OrdreFabrication>> getAllOrdreFabrication() {
		try {
			List<OrdreFabrication> ordreFabrication = new ArrayList<OrdreFabrication>();
			ordreFabricationRepository.findAll().forEach(ordreFabrication::add);

			if (ordreFabrication.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(ordreFabrication, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/get-ordre-fabrication/{id}")
	public ResponseEntity<OrdreFabrication> getOrdreById(@PathVariable("id") long id) {
		Optional<OrdreFabrication> ordreFabricationData = ordreFabricationRepository.findById(id);

		if (ordreFabricationData.isPresent()) {
			return new ResponseEntity<>(ordreFabricationData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("/update-ordre-fabrication/{id}")
	public ResponseEntity<OrdreFabrication> updateOrdreFabrication(@PathVariable("id") long id,
																   @RequestBody OrdreFabrication ordreFabrication) {
		Optional<OrdreFabrication> ordreFabricationData = ordreFabricationRepository.findById(id);

		if (ordreFabricationData.isPresent()) {
			OrdreFabrication _ordreFabrication = ordreFabricationData.get();
			_ordreFabrication.setDateCreation(ordreFabrication.getDateCreation());
			_ordreFabrication.setDateDebutLancement(ordreFabrication.getDateDebutLancement());
			_ordreFabrication.setQteProduite(ordreFabrication.getQteProduite());
			_ordreFabrication.setQteDemander(ordreFabrication.getQteDemander());
			_ordreFabrication.setObservation(ordreFabrication.getObservation());
			_ordreFabrication.setDateFinLancement(ordreFabrication.getDateFinLancement());


			return new ResponseEntity<>(ordreFabricationRepository.save(_ordreFabrication), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/delete-ordre-fabrication/{id}")
	public ResponseEntity<HttpStatus> deleteOrdreFabricationById(@PathVariable("id") long id) {
		try {
			ordreFabricationRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/delete-all-ordre-fabrication")
	public ResponseEntity<HttpStatus> deleteAllOrdreFabrication() {
		try {
			ordreFabricationRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	@GetMapping("/qte-produite/{id}")
	public int getQteProduite(@PathVariable Long id) {
		OrdreFabrication ordreFabrication = ordreFabricationRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Ordre de fabrication introuvable avec l'ID : " + id));
		return ordreFabrication.getQteProduite();
	}
	@GetMapping("/qte-demande/{id}")
	public int getQteDemande(@PathVariable Long id) {
		OrdreFabrication ordreFabrication = ordreFabricationRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Ordre de fabrication introuvable avec l'ID : " + id));
		return ordreFabrication.getQteDemander();
	}
	@GetMapping("/get-daily-tracking")
	public ResponseEntity<List< OrdreFabrication >> getDailyTracking() {
		try {

			LocalDate currentDate = LocalDate.now();
			List<OrdreFabrication> dailyTracking = ordreFabricationRepository.findByDateCreation(currentDate);

			if (dailyTracking.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(dailyTracking, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}}
	@GetMapping("/list-ordre-en-cours")
	public List<OrdreFabrication> getOrdresFabricationEnCours() {
		Date currentDate = new Date(); // Obtenez la date actuelle
		return ordreFabricationRepository.getOrdreFabricationWithFutureDueDate(currentDate);
	}

	@GetMapping("/en-cours")
	public int getOrdresEnCours() {
		Date currentDate = new Date();
		List<OrdreFabrication> ordreEnCours= ordreFabricationRepository.getOrdreFabricationWithFutureDueDate(currentDate);
		return ordreEnCours.size();
	}

	@GetMapping("/termines")
	public int  getNbOrdresTermines() {
		Date currentDate = new Date();
		List<OrdreFabrication> nbOrdreTerminee=ordreFabricationRepository.getOrdreFabricationtermine(currentDate);
		return nbOrdreTerminee.size();
	}

	@GetMapping("/en-retard")
	public int getNbOrdresEnRetard() {
		Date currentDate = new Date();
		List<OrdreFabrication> nbOrdreEnRetard= ordreFabricationRepository.getOrdreFabricationRetard(currentDate);
		return  nbOrdreEnRetard.size();
	}



}
