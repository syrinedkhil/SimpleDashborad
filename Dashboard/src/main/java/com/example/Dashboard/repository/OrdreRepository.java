package com.example.Dashboard.repository;

import com.example.Dashboard.model.Ordre;
import com.example.Dashboard.model.OrdreFabrication;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrdreRepository extends JpaRepository < Ordre, Long> {
}
