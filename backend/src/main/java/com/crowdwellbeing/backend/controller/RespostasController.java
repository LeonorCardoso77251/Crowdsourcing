package com.crowdwellbeing.backend.controller;

import com.crowdwellbeing.backend.model.Respostas;
import com.crowdwellbeing.backend.service.RespostasService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/respostas")
public class RespostasController {

    private final RespostasService respostasService;

    public RespostasController(RespostasService respostasService) {
        this.respostasService = respostasService;
    }

    @GetMapping
    public List<Respostas> listarTodas() {
        return respostasService.listarTodas();
    }

    @GetMapping("/{id}")
    public Respostas buscarPorId(@PathVariable Long id) {
        return respostasService.buscarPorId(id).orElse(null);
    }

    @PostMapping
    public Respostas criar(@RequestBody Respostas respostas) {
        return respostasService.criarOuAtualizar(respostas);
    }

    @PutMapping("/{id}")
    public Respostas atualizar(@PathVariable Long id, @RequestBody Respostas respostas) {
        respostas.setIdRespostas(id);
        return respostasService.criarOuAtualizar(respostas);
    }

    @DeleteMapping("/{id}")
    public void apagar(@PathVariable Long id) {
        respostasService.apagar(id);
    }
}
