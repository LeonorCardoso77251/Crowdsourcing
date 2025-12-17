package com.crowdwellbeing.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crowdwellbeing.backend.model.Avaliacao;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {
}
