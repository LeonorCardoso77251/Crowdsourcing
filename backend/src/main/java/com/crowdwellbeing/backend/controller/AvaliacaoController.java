package com.crowdwellbeing.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crowdwellbeing.backend.dto.AvaliacaoRequestDTO;
import com.crowdwellbeing.backend.service.AvaliacaoService;

@RestController
@RequestMapping("/api/avaliacoes")
@CrossOrigin(origins = "*")
public class AvaliacaoController {

    private final AvaliacaoService avaliacaoService;

    public AvaliacaoController(AvaliacaoService avaliacaoService) {
        this.avaliacaoService = avaliacaoService;
    }

    @PostMapping
    public ResponseEntity<Void> criarAvaliacao(@RequestBody AvaliacaoRequestDTO dto) {
        avaliacaoService.guardarAvaliacao(dto);
        return ResponseEntity.ok().build();
    }
}
