package com.crowdwellbeing.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.crowdwellbeing.backend.model.Relatorio;

public interface RelatorioRepository extends JpaRepository<Relatorio, Long> {
}
