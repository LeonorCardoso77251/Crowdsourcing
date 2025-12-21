package com.crowdwellbeing.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crowdwellbeing.backend.model.Avaliacao;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {

    Optional<Avaliacao> findByUtilizador_IdUtilizador(Long idUtilizador);

    Optional<Avaliacao> findByUtilizador_IdUtilizadorAndFormulario_IdFormulario(
            Long idUtilizador,
            Long idFormulario
    );
}

