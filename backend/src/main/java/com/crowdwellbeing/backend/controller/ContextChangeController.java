package com.crowdwellbeing.backend.controller;

import com.crowdwellbeing.backend.model.ContextChange;
import com.crowdwellbeing.backend.service.ContextChangeService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/contextos")
public class ContextChangeController {

    private final ContextChangeService contextChangeService;

    public ContextChangeController(ContextChangeService contextChangeService) {
        this.contextChangeService = contextChangeService;
    }

    @GetMapping
    public List<ContextChange> listarTodos() {
        return contextChangeService.listarTodos();
    }

    @GetMapping("/{id}")
    public ContextChange buscarPorId(@PathVariable Long id) {
        return contextChangeService.buscarPorId(id).orElse(null);
    }

    @PostMapping
    public ContextChange criar(@RequestBody ContextChange contexto) {
        return contextChangeService.criarOuAtualizar(contexto);
    }

    @PutMapping("/{id}")
    public ContextChange atualizar(@PathVariable Long id, @RequestBody ContextChange contexto) {
        contexto.setIdContexto(id);
        return contextChangeService.criarOuAtualizar(contexto);
    }

    @DeleteMapping("/{id}")
    public void apagar(@PathVariable Long id) {
        contextChangeService.apagar(id);
    }
}
