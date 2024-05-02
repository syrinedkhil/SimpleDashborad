package com.example.Dashboard.controller;

import com.example.Dashboard.model.Utilisateur;
import com.example.Dashboard.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/users")

public class UtilisateurController {
	@Autowired
	UtilisateurRepository utilisateurRepository;

	@PostMapping("/add-user")
	public ResponseEntity<Utilisateur> addUser(@RequestBody Utilisateur utilisateur) {
		try {
			Utilisateur _utilisateur = utilisateurRepository
					.save(new Utilisateur( utilisateur.getUsername(),utilisateur.getEmail(), utilisateur.getPassword()));
			return new ResponseEntity<>(_utilisateur, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/get-all-users")
	public ResponseEntity<List<Utilisateur>> getAllUsers() {
		try {
			List<Utilisateur> users = new ArrayList<Utilisateur>();
			utilisateurRepository.findAll().forEach(users::add);
			if (users.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(users, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/get-users/{id}")
	public ResponseEntity<Utilisateur> getUserById(@PathVariable("id") long id) {
		Optional<Utilisateur> userData = utilisateurRepository.findById(id);

		if (userData.isPresent()) {
			return new ResponseEntity<>(userData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("/update-user/{id}")
	public ResponseEntity<Utilisateur> updateUser(@PathVariable("id") long id, @RequestBody Utilisateur utilisateur) {
		Optional<Utilisateur> userData = utilisateurRepository.findById(id);

		if (userData.isPresent()) {
			Utilisateur _user = userData.get();
			
			_user.setUsername(utilisateur.getUsername());
			_user.setEmail(utilisateur.getEmail());
			_user.setPassword(utilisateur.getPassword());
			return new ResponseEntity<>(utilisateurRepository.save(_user), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/delete-users/{id}")
	public ResponseEntity<HttpStatus> deleteUserById(@PathVariable("id") long id) {
		try {
			utilisateurRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/delete-all-users")
	public ResponseEntity<HttpStatus> deleteAllUsers() {
		try {
			utilisateurRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

}
