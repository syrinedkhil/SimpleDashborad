package com.example.Dashboard.controller;

import com.example.Dashboard.model.OrdreFabrication;
import com.example.Dashboard.model.Produit;
import com.example.Dashboard.model.SuiviProduction;
import com.example.Dashboard.model.Tag;
import com.example.Dashboard.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/tags")
public class TagController {
	@Autowired
	private TagRepository tagRepository;
	@Autowired
	UtilisateurRepository utilisateurRepository;
	@Autowired

	private OrdreFabricationRepository ordreFabricationRepository;
	@Autowired
	private SuiviProductionRepository suiviProductionRepository;
	@Autowired
	private ProduitRepository produitRepository;

	@PostMapping("/add-tag")
	public ResponseEntity<Tag> addTag(@RequestBody Tag tag) {
		try {
			String operateur=tag.getOperateur();
			Long idOf=tag.getOrderFabrication().getordreFabricationId();
			OrdreFabrication ordre = ordreFabricationRepository.findById(idOf).orElseThrow(() -> new Exception("ordre non trouvé"));
			Long idProduit=ordre.getProduit().getProduitId();
			System.out.println(idProduit);
			tag.setOrderFabrication(ordre);
			Tag _tag = tagRepository.save(tag);
			Produit produit=produitRepository.findById(idProduit).orElseThrow(()->new Exception("produit non existant"));

			SuiviProduction suivi=new SuiviProduction();

			suivi.setTag(_tag);
			suivi.setOrdreFabrication(ordre);
			suivi.setProduit(produit);
			SuiviProduction _suivi=suiviProductionRepository.save(suivi);

			return new ResponseEntity<>(_tag, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/get-all-tags")
	public ResponseEntity<List<Tag>> getAllTags() {
		try {
			List<Tag> tags = new ArrayList<Tag>();
			tagRepository.findAll().forEach(tags::add);

			if (tags.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(tags, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/get-tag/{id}")
	public ResponseEntity<Tag> getTagById(@PathVariable("id") long id) {
		Optional<Tag> tagData = tagRepository.findById(id);

		if (tagData.isPresent()) {
			return new ResponseEntity<>(tagData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("/update-tag/{id}")
	public ResponseEntity<Tag> updateTag(@PathVariable("id") long id, @RequestBody Tag tag) {
		Optional<Tag> tagData = tagRepository.findById(id);

		if (tagData.isPresent()) {
			Tag _tag = tagData.get();
			_tag.setOperateur(tag.getOperateur());
			return new ResponseEntity<>(tagRepository.save(_tag), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/delete-tag/{id}")
	public ResponseEntity<HttpStatus> deleteTagById(@PathVariable("id") long id) {
		try {
			tagRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/delete-all-tags")
	public ResponseEntity<HttpStatus> deleteAllTags() {
		try {
			tagRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}


}
