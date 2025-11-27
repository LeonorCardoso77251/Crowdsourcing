package com.crowdwellbeing.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.crowdwellbeing.backend.model.MouseMovement;

public interface MouseMovementRepository extends JpaRepository<MouseMovement, Long> {
}
