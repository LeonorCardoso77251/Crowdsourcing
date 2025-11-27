package com.crowdwellbeing.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.crowdwellbeing.backend.model.Formulario;

public interface FormularioRepository extends JpaRepository<Formulario, Long> {
}
