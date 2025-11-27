package com.crowdwellbeing.backend.controller;

import com.crowdwellbeing.backend.model.Utilizador;
import com.crowdwellbeing.backend.service.UtilizadorService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/utilizadores")
public class UtilizadorController {

    private final UtilizadorService utilizadorService;

    public UtilizadorController(UtilizadorService utilizadorService) {
        this.utilizadorService = utilizadorService;
    }

    @GetMapping
    public List<Utilizador> listarTodos() {
        return utilizadorService.listarTodos();
    }

    @GetMapping("/{id}")
    public Utilizador buscarPorId(@PathVariable Long id) {
        return utilizadorService.buscarPorId(id).orElse(null);
    }

    @PostMapping
    public Utilizador criar(@RequestBody Utilizador utilizador) {
        return utilizadorService.criarOuAtualizar(utilizador);
    }

    @PutMapping("/{id}")
    public Utilizador atualizar(@PathVariable Long id, @RequestBody Utilizador utilizador) {
        utilizador.setIdUtilizador(id);
        return utilizadorService.criarOuAtualizar(utilizador);
    }

    @DeleteMapping("/{id}")
    public void apagar(@PathVariable Long id) {
        utilizadorService.apagar(id);
    }
}
