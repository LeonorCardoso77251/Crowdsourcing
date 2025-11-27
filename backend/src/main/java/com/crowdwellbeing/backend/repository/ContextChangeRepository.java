package com.crowdwellbeing.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.crowdwellbeing.backend.model.ContextChange;

public interface ContextChangeRepository extends JpaRepository<ContextChange, Long> {
}
