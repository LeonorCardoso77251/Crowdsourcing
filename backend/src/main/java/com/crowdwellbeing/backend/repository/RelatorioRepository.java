package com.crowdwellbeing.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crowdwellbeing.backend.model.Relatorio;

public interface RelatorioRepository extends JpaRepository<Relatorio, Long> {
        // 🔒 garante 1 relatório por utilizador
    Optional<Relatorio> findByUtilizador_IdUtilizador(Long idUtilizador);
}
