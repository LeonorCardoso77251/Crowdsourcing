package com.crowdwellbeing.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crowdwellbeing.backend.model.Avaliacao;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {

    // 🔒 Avaliação única por utilizador
    Optional<Avaliacao> findByUtilizador_IdUtilizador(Long idUtilizador);

    // (mantém este, não estraga nada)
    Optional<Avaliacao> findByUtilizador_IdUtilizadorAndFormulario_IdFormulario(
            Long idUtilizador,
            Long idFormulario
    );
}

