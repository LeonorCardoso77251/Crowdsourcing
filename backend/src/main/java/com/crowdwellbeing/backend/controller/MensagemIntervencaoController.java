package com.crowdwellbeing.backend.controller;

import com.crowdwellbeing.backend.model.MensagemIntervencao;
import com.crowdwellbeing.backend.service.MensagemIntervencaoService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/mensagens")
public class MensagemIntervencaoController {

    private final MensagemIntervencaoService mensagemIntervencaoService;

    public MensagemIntervencaoController(MensagemIntervencaoService mensagemIntervencaoService) {
        this.mensagemIntervencaoService = mensagemIntervencaoService;
    }

    @GetMapping
    public List<MensagemIntervencao> listarTodos() {
        return mensagemIntervencaoService.listarTodos();
    }

    @GetMapping("/{id}")
    public MensagemIntervencao buscarPorId(@PathVariable Long id) {
        return mensagemIntervencaoService.buscarPorId(id).orElse(null);
    }

    @PostMapping
    public MensagemIntervencao criar(@RequestBody MensagemIntervencao mensagem) {
        return mensagemIntervencaoService.criarOuAtualizar(mensagem);
    }

    @PutMapping("/{id}")
    public MensagemIntervencao atualizar(@PathVariable Long id, @RequestBody MensagemIntervencao mensagem) {
        mensagem.setIdMensagem(id);
        return mensagemIntervencaoService.criarOuAtualizar(mensagem);
    }

    @DeleteMapping("/{id}")
    public void apagar(@PathVariable Long id) {
        mensagemIntervencaoService.apagar(id);
    }
}


