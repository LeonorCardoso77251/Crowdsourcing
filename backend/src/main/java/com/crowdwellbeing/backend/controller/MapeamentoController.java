package com.crowdwellbeing.backend.controller;

import com.crowdwellbeing.backend.model.Mapeamento;
import com.crowdwellbeing.backend.service.MapeamentoService;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@CrossOrigin(origins = "*")

@RestController
@RequestMapping("/api/mapeamentos")
public class MapeamentoController {

    private final MapeamentoService mapeamentoService;

    public MapeamentoController(MapeamentoService mapeamentoService) {
        this.mapeamentoService = mapeamentoService;
    }

    @GetMapping
    public List<Mapeamento> listarTodos() {
        return mapeamentoService.listarTodos();
    }

    @GetMapping("/{id}")
    public Mapeamento buscarPorId(@PathVariable Long id) {
        return mapeamentoService.buscarPorId(id).orElse(null);
    }

    //@PostMapping
    //public Mapeamento criar(@RequestBody Mapeamento mapeamento) {
       // return mapeamentoService.criarOuAtualizar(mapeamento);
    //}

    @PutMapping("/{id}")
    public Mapeamento atualizar(@PathVariable Long id, @RequestBody Mapeamento mapeamento) {
        mapeamento.setIdMapeamento(id);
        return mapeamentoService.criarOuAtualizar(mapeamento);
    }

    @DeleteMapping("/{id}")
    public void apagar(@PathVariable Long id) {
        mapeamentoService.apagar(id);
    }

    // 🔥 NOVO ENDPOINT PARA RECEBER OS DADOS JAVASCRIPT DO PROF
    @PostMapping
    public ResponseEntity<String> receberMapeamento(@RequestBody Map<String, Object> dados) {
        System.out.println("Recebido: " + dados);
        return ResponseEntity.ok("Mapeamento recebido com sucesso!");
    }

    @PostMapping("/receber")
    public ResponseEntity<String> receber(@RequestBody Map<String, Object> payload) {

        System.out.println("=== RECEBI MAPEAMENTO ===");
        System.out.println(payload);

        return ResponseEntity.ok("OK");
    }
}
