package com.crowdwellbeing.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crowdwellbeing.backend.model.Utilizador;
import com.crowdwellbeing.backend.service.UtilizadorService;

@RestController
@RequestMapping("/api/utilizadores")
@CrossOrigin(origins = "http://localhost:5173")
public class UtilizadorController {

    private final UtilizadorService utilizadorService;

    public UtilizadorController(UtilizadorService utilizadorService) {
        this.utilizadorService = utilizadorService;
    }

    @GetMapping
    public List<Utilizador> listarTodos() {
        return utilizadorService.listarTodos();
    }

    @GetMapping("/{id}")
    public Utilizador buscarPorId(@PathVariable Long id) {
        return utilizadorService.buscarPorId(id).orElse(null);
    }

    @PostMapping
    public Utilizador criar(@RequestBody Utilizador utilizador) {
        return utilizadorService.criarOuAtualizar(utilizador);
    }

    @PostMapping("/anonimo")
    public Utilizador criarAnonimo() {
        Utilizador u = new Utilizador();
        u.setGenero(null);
        u.setIdadeFaixa(null);
        return utilizadorService.criarOuAtualizar(u);
    }

    @PutMapping("/{id}")
    public Utilizador atualizar(@PathVariable Long id, @RequestBody Utilizador utilizador) {
        utilizador.setIdUtilizador(id);
        return utilizadorService.criarOuAtualizar(utilizador);
    }

    @DeleteMapping("/{id}")
    public void apagar(@PathVariable Long id) {
        utilizadorService.apagar(id);
    }

    @PostMapping("/admin/importar-json")

    public ResponseEntity<String> importarJson() {
        utilizadorService.atualizarUtilizadoresAPartirDoJson();
        return ResponseEntity.ok("Importação concluída!");
    }
}

