package com.example.Dashboard.repository;

import com.example.Dashboard.model.SuiviProduction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;

import java.util.Date;
import java.util.List;

public interface SuiviProductionRepository extends JpaRepository<SuiviProduction, Long>{
    @Query ("SELECT COUNT(sp) FROM SuiviProduction sp WHERE sp.dateLecture = :date")
    Long countByDateLecture( LocalDate date);

    // Si vous avez besoin de compter pour chaque jour
    @Query ("SELECT sp.dateLecture, COUNT(sp) FROM SuiviProduction sp GROUP BY sp.dateLecture")
    List <Object[]> countByDateLectureGroupByDate();

    @Query("SELECT MONTH(s.dateLecture) AS mois, COUNT(s) AS nombreLectures FROM SuiviProduction s WHERE YEAR(s.dateLecture) = :year GROUP BY MONTH(s.dateLecture)")
    List<Object[]> countLecturesByMonth(@Param ("year") int year);
    List<SuiviProduction> findByDateLecture(LocalDate date);
}