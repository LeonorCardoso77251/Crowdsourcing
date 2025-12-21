package com.crowdwellbeing.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crowdwellbeing.backend.model.Respostas;

public interface RespostasRepository extends JpaRepository<Respostas, Long> {
      Optional<Respostas> findByFormulario_IdFormulario(Long idFormulario);
}

