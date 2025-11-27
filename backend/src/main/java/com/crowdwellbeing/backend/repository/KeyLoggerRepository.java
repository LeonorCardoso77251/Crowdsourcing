package com.crowdwellbeing.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.crowdwellbeing.backend.model.KeyLogger;

public interface KeyLoggerRepository extends JpaRepository<KeyLogger, Long> {
}
