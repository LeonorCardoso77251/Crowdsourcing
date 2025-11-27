package com.crowdwellbeing.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.crowdwellbeing.backend.model.Investigador;

public interface InvestigadorRepository extends JpaRepository<Investigador, Long> {
}
