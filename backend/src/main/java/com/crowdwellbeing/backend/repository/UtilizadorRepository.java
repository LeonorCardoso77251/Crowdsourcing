package com.crowdwellbeing.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.crowdwellbeing.backend.model.Utilizador;

public interface UtilizadorRepository extends JpaRepository<Utilizador, Long> {
}

