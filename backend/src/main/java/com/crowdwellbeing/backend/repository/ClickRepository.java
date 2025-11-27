package com.crowdwellbeing.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.crowdwellbeing.backend.model.Click;

public interface ClickRepository extends JpaRepository<Click, Long> {
}

