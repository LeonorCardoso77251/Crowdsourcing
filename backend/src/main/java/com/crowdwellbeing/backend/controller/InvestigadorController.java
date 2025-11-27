package com.crowdwellbeing.backend.controller;

import com.crowdwellbeing.backend.model.Investigador;
import com.crowdwellbeing.backend.service.InvestigadorService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/investigadores")
public class InvestigadorController {

    private final InvestigadorService investigadorService;

    public InvestigadorController(InvestigadorService investigadorService) {
        this.investigadorService = investigadorService;
    }

    @GetMapping
    public List<Investigador> listarTodos() {
        return investigadorService.listarTodos();
    }

    @GetMapping("/{id}")
    public Investigador buscarPorId(@PathVariable Long id) {
        return investigadorService.buscarPorId(id).orElse(null);
    }

    @PostMapping
    public Investigador criar(@RequestBody Investigador investigador) {
        return investigadorService.criarOuAtualizar(investigador);
    }

    @PutMapping("/{id}")
    public Investigador atualizar(@PathVariable Long id, @RequestBody Investigador investigador) {
        investigador.setIdInvestigador(id);
        return investigadorService.criarOuAtualizar(investigador);
    }

    @DeleteMapping("/{id}")
    public void apagar(@PathVariable Long id) {
        investigadorService.apagar(id);
    }
}

