package com.example.Dashboard.controller;

import com.example.Dashboard.model.Client;
import com.example.Dashboard.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/clients")
public class ClientController {
	@Autowired
	ClientRepository clientRepository;

	@PostMapping("/add-client")

	public ResponseEntity<Client> addClient(@RequestBody Client client) {

		try {

			Client _client = clientRepository
					.save(new Client(client.getName(),client.getAdresse() ,client.getEmail(), client.getTelephone()));

			return new ResponseEntity<>(_client, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/getClients")

	public ResponseEntity<List<Client>> getAllClients() {
		try {
			List<Client> clients = new ArrayList<Client>();
			clientRepository.findAll().forEach(clients::add);

			if (clients.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(clients, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/get-client/{id}")

	public ResponseEntity<Client> getClientById(@PathVariable("id") long id) {
		Optional<Client> clientData = clientRepository.findById(id);

		if (clientData.isPresent()) {
			return new ResponseEntity<>(clientData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("/update-client/{id}")

	public ResponseEntity<Client> updateClient(@PathVariable("id") long id, @RequestBody Client client) {
		Optional<Client> clientData = clientRepository.findById(id);

		if (clientData.isPresent()) {
			Client _client = clientData.get();
			_client.setAdresse(client.getAdresse());
			_client.setName(client.getName());
			_client.setEmail(client.getEmail());
			_client.setTelephone(client.getTelephone());

			return new ResponseEntity<>(clientRepository.save(_client), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/delete-client/{id}")

	public ResponseEntity<HttpStatus> deleteClientById(@PathVariable("id") long id) {
		try {
			clientRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/delete-all-clients")

	public ResponseEntity<HttpStatus> deleteAllClients() {
		try {
			clientRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	private boolean hasRole(String role) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		return authentication.getAuthorities().stream()
				.anyMatch(authority -> authority.getAuthority().equals(role));
	}

//	@GetMapping("/get-client/{ClientName}")
//	public ResponseEntity<Client> getClientByClientName(@PathVariable("ClientName") String ClientName) {
//		Optional<Client> clientData = clientRepository.findByClientName(ClientName);
//
//		if (clientData.isPresent()) {
//			return new ResponseEntity<>(clientData.get(), HttpStatus.OK);
//		} else {
//			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//		}
//	}

}