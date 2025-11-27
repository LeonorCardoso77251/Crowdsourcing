package com.crowdwellbeing.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.crowdwellbeing.backend.model.MensagemIntervencao;

public interface MensagemIntervencaoRepository extends JpaRepository<MensagemIntervencao, Long> {
}
