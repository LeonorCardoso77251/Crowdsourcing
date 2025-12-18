package com.crowdwellbeing.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crowdwellbeing.backend.model.Avaliacao;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {

    // 🔒 garante 1 avaliação por formulário (opcional, mas útil)
    Optional<Avaliacao> findByFormulario_IdFormulario(Long idFormulario);
}
