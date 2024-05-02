package com.example.Dashboard.controller;

import com.example.Dashboard.model.Client;
import com.example.Dashboard.model.Ordre;
import com.example.Dashboard.model.OrdreFabrication;
import com.example.Dashboard.model.Produit;
import com.example.Dashboard.repository.ClientRepository;
import com.example.Dashboard.repository.OrdreFabricationRepository;
import com.example.Dashboard.repository.OrdreRepository;
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
@RequestMapping("/api/order")
public class OrdreController {
    @Autowired
    OrdreRepository ordreRepository;
    @Autowired
    OrdreFabricationRepository ordreFabricationRepository;
    @Autowired

    private ClientRepository clientRepository;

    @PostMapping ("/add-order")
    public ResponseEntity < Ordre > addOrdre( @RequestBody Ordre ordre) {
        try {

            Long OrdFabId = ordre.getOrdreFabrication().getordreFabricationId();
            System.out.println(OrdFabId);
            OrdreFabrication oFab = ordreFabricationRepository.findById(OrdFabId)
                    .orElseThrow(() -> new Exception("Ordre de Fabrication non trouvé"));


            ordre.setOrdreFabrication(oFab);

            Ordre _ordreRepository = ordreRepository.save(ordre);
            return new ResponseEntity<>(_ordreRepository, HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping ("/get-all-order")
    public ResponseEntity< List <Ordre> > getAllOrdre() {
        try {
            List<Ordre> ordre = new ArrayList <Ordre>();
            ordreRepository.findAll().forEach(ordre::add);

            if (ordre.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(ordre, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get-order/{id}")
    public ResponseEntity<Ordre> getOrdreById(@PathVariable ("id") long id) {
        Optional <Ordre> ordreData = ordreRepository.findById(id);

        if (ordreData.isPresent()) {
            return new ResponseEntity<>(ordreData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping ("/update-order/{id}")
    public ResponseEntity<Ordre> updateOrdre(@PathVariable("id") long id,
                                                                   @RequestBody Ordre ordre) {
        Optional<Ordre> ordreData = ordreRepository.findById(id);

        if (ordreData.isPresent()) {
            Ordre _ordre = ordreData.get();
            _ordre.setDateFinReel(ordre.getDateFinReel());
            _ordre.setDateDebutReel(ordre.getDateDebutReel());
            _ordre.setEtat(ordre.getEtat());



            return new ResponseEntity<>(ordreRepository.save(_ordre), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete-order/{id}")
    public ResponseEntity<HttpStatus> deleteOrdreById(@PathVariable("id") long id) {
        try {
            ordreRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete-all-order")
    public ResponseEntity<HttpStatus> deleteAllOrdre() {
        try {
            ordreRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


}
