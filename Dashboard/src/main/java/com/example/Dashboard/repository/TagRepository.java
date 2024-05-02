package com.example.Dashboard.repository;

import com.example.Dashboard.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {
	Optional<Tag> findByOperateur(String operateur);
}
