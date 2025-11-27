package com.crowdwellbeing.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.crowdwellbeing.backend.model.Mapeamento;

public interface MapeamentoRepository extends JpaRepository<Mapeamento, Long> {
}
