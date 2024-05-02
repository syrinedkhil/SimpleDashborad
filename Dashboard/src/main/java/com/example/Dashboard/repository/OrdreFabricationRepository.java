package com.example.Dashboard.repository;


import com.example.Dashboard.model.OrdreFabrication;
import com.example.Dashboard.model.SuiviProduction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface OrdreFabricationRepository extends JpaRepository<OrdreFabrication, Long> {
    List< OrdreFabrication > findByDateCreation( LocalDate date);
    //encours
    @Query("SELECT of FROM OrdreFabrication of WHERE of.dateFinLancement > :currentDate")
    List<OrdreFabrication> getOrdreFabricationWithFutureDueDate(Date currentDate);
    //en retard
    @Query("SELECT of FROM OrdreFabrication of WHERE of.dateFinLancement < :currentDate AND of.qteDemander > of.qteProduite")
    List<OrdreFabrication> getOrdreFabricationRetard(Date currentDate);

//termine
    @Query("SELECT of FROM OrdreFabrication of WHERE of.dateFinLancement < :currentDate AND of.qteDemander = of.qteProduite")
    List<OrdreFabrication> getOrdreFabricationtermine(Date currentDate);
}