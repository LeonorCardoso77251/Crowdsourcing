package com.crowdwellbeing.backend.controller;

import com.crowdwellbeing.backend.model.Relatorio;
import com.crowdwellbeing.backend.service.RelatorioService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/relatorios")
public class RelatorioController {

    private final RelatorioService relatorioService;

    public RelatorioController(RelatorioService relatorioService) {
        this.relatorioService = relatorioService;
    }

    @GetMapping
    public List<Relatorio> listarTodos() {
        return relatorioService.listarTodos();
    }

    @GetMapping("/{id}")
    public Relatorio buscarPorId(@PathVariable Long id) {
        return relatorioService.buscarPorId(id).orElse(null);
    }

    @PostMapping
    public Relatorio criar(@RequestBody Relatorio relatorio) {
        return relatorioService.criarOuAtualizar(relatorio);
    }

    @PutMapping("/{id}")
    public Relatorio atualizar(@PathVariable Long id, @RequestBody Relatorio relatorio) {
        relatorio.setIdRelatorio(id);
        return relatorioService.criarOuAtualizar(relatorio);
    }

    @DeleteMapping("/{id}")
    public void apagar(@PathVariable Long id) {
        relatorioService.apagar(id);
    }
}
