package com.crowdwellbeing.backend.controller;

import com.crowdwellbeing.backend.model.MouseMovement;
import com.crowdwellbeing.backend.service.MouseMovementService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/movimentos")
public class MouseMovementController {

    private final MouseMovementService mouseMovementService;

    public MouseMovementController(MouseMovementService mouseMovementService) {
        this.mouseMovementService = mouseMovementService;
    }

    @GetMapping
    public List<MouseMovement> listarTodos() {
        return mouseMovementService.listarTodos();
    }

    @GetMapping("/{id}")
    public MouseMovement buscarPorId(@PathVariable Long id) {
        return mouseMovementService.buscarPorId(id).orElse(null);
    }

    @PostMapping
    public MouseMovement criar(@RequestBody MouseMovement movimento) {
        return mouseMovementService.criarOuAtualizar(movimento);
    }

    @PutMapping("/{id}")
    public MouseMovement atualizar(@PathVariable Long id, @RequestBody MouseMovement movimento) {
        movimento.setIdMovimento(id);
        return mouseMovementService.criarOuAtualizar(movimento);
    }

    @DeleteMapping("/{id}")
    public void apagar(@PathVariable Long id) {
        mouseMovementService.apagar(id);
    }
}
