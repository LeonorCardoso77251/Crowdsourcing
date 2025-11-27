package com.crowdwellbeing.backend.controller;

import com.crowdwellbeing.backend.model.Classificacao;
import com.crowdwellbeing.backend.service.ClassificacaoService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/classificacoes")
public class ClassificacaoController {

    private final ClassificacaoService classificacaoService;

    public ClassificacaoController(ClassificacaoService classificacaoService) {
        this.classificacaoService = classificacaoService;
    }

    @GetMapping
    public List<Classificacao> listarTodas() {
        return classificacaoService.listarTodas();
    }

    @GetMapping("/{id}")
    public Classificacao buscarPorId(@PathVariable Long id) {
        return classificacaoService.buscarPorId(id).orElse(null);
    }

    @PostMapping
    public Classificacao criar(@RequestBody Classificacao classificacao) {
        return classificacaoService.criarOuAtualizar(classificacao);
    }

    @PutMapping("/{id}")
    public Classificacao atualizar(@PathVariable Long id, @RequestBody Classificacao classificacao) {
        classificacao.setIdClassificacao(id);
        return classificacaoService.criarOuAtualizar(classificacao);
    }

    @DeleteMapping("/{id}")
    public void apagar(@PathVariable Long id) {
        classificacaoService.apagar(id);
    }
}

