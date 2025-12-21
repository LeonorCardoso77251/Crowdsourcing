package com.crowdwellbeing.backend.controller;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crowdwellbeing.backend.dto.AvaliacaoRequestDTO;
import com.crowdwellbeing.backend.model.Avaliacao;
import com.crowdwellbeing.backend.repository.AvaliacaoRepository;
import com.crowdwellbeing.backend.service.AvaliacaoService;

@RestController
@RequestMapping("/api/avaliacoes")
@CrossOrigin(origins = "*")
public class AvaliacaoController {

    private final AvaliacaoService avaliacaoService;

     private final AvaliacaoRepository avaliacaoRepository;

    public AvaliacaoController(
            AvaliacaoService avaliacaoService,
            AvaliacaoRepository avaliacaoRepository
    ) {
        this.avaliacaoService = avaliacaoService;
        this.avaliacaoRepository = avaliacaoRepository;
    }

    @PostMapping
    public ResponseEntity<Void> criarAvaliacao(@RequestBody AvaliacaoRequestDTO dto) {
        avaliacaoService.guardarAvaliacao(dto);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<Avaliacao>> obterTodasAvaliacoes() {
        return ResponseEntity.ok(avaliacaoRepository.findAll());
    }
}
