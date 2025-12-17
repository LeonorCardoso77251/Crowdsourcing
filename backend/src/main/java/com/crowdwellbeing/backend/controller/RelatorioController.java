package com.crowdwellbeing.backend.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crowdwellbeing.backend.dto.BehaviorLogDTO;
import com.crowdwellbeing.backend.model.Relatorio;
import com.crowdwellbeing.backend.model.Utilizador;
import com.crowdwellbeing.backend.repository.RelatorioRepository;
import com.crowdwellbeing.backend.repository.UtilizadorRepository;
import com.crowdwellbeing.backend.service.RelatorioService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/relatorios")
public class RelatorioController {

    private final RelatorioService relatorioService;
    private final RelatorioRepository relatorioRepository;
    private final UtilizadorRepository utilizadorRepository;
    private final ObjectMapper objectMapper;

    public RelatorioController(
            RelatorioService relatorioService,
            RelatorioRepository relatorioRepository,
            UtilizadorRepository utilizadorRepository,
            ObjectMapper objectMapper
    ) {
        this.relatorioService = relatorioService;
        this.relatorioRepository = relatorioRepository;
        this.utilizadorRepository = utilizadorRepository;
        this.objectMapper = objectMapper;
    }

    // 🔹 ENDPOINTS EXISTENTES (intocados)

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

    // 🔹 NOVO ENDPOINT: logs comportamentais
    @PostMapping("/behavioral")
    public void guardarBehavioralLogs(@RequestBody BehaviorLogDTO dto)
            throws JsonProcessingException {

        Utilizador utilizador = utilizadorRepository
                .findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("Utilizador não encontrado"));

        Relatorio relatorio = new Relatorio();
        relatorio.setUtilizador(utilizador);
        relatorio.setBehavioralLogs(objectMapper.writeValueAsString(dto.getLogs()));
        relatorio.setDataCriacao(LocalDateTime.now());

        relatorioRepository.save(relatorio);
    }
}
