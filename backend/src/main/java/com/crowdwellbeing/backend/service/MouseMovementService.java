package com.crowdwellbeing.backend.service;

import com.crowdwellbeing.backend.model.MouseMovement;
import com.crowdwellbeing.backend.repository.MouseMovementRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@SuppressWarnings("null")
@Service
public class MouseMovementService {

    private final MouseMovementRepository mouseMovementRepository;

    public MouseMovementService(MouseMovementRepository mouseMovementRepository) {
        this.mouseMovementRepository = mouseMovementRepository;
    }

    public List<MouseMovement> listarTodos() {
        return mouseMovementRepository.findAll();
    }

    public Optional<MouseMovement> buscarPorId(Long id) {
        return mouseMovementRepository.findById(id);
    }

    public MouseMovement criarOuAtualizar(MouseMovement movimento) {
        return mouseMovementRepository.save(movimento);
    }

    public void apagar(Long id) {
        mouseMovementRepository.deleteById(id);
    }
}
