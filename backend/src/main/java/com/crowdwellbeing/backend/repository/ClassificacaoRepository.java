package com.crowdwellbeing.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.crowdwellbeing.backend.model.Classificacao;

public interface ClassificacaoRepository extends JpaRepository<Classificacao, Long> {
}
