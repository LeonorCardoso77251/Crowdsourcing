package com.crowdwellbeing.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crowdwellbeing.backend.dto.RespostasDTO;
import com.crowdwellbeing.backend.model.Respostas;
import com.crowdwellbeing.backend.service.RespostasService;

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
    public Respostas criar(@RequestBody RespostasDTO dto) {
        return respostasService.salvar(dto);
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

