package com.crowdwellbeing.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crowdwellbeing.backend.model.Formulario;
import com.crowdwellbeing.backend.model.Utilizador;
import com.crowdwellbeing.backend.service.FormularioService;
import com.crowdwellbeing.backend.service.UtilizadorService;

@RestController
@RequestMapping("/api/formularios")
@CrossOrigin(origins = "http://localhost:5173")
public class FormularioController {

    private final FormularioService formularioService;

    private final UtilizadorService utilizadorService;

    public FormularioController(FormularioService formularioService,
                                UtilizadorService utilizadorService) {
        this.formularioService = formularioService;
        this.utilizadorService = utilizadorService;
    }

    @GetMapping
    public List<Formulario> listarTodos() {
        return formularioService.listarTodos();
    }

    @GetMapping("/{id}")
    public Formulario buscarPorId(@PathVariable Long id) {
        return formularioService.buscarPorId(id).orElse(null);
    }

    @PostMapping
    public Formulario criar(@RequestBody Formulario formulario) {
        return formularioService.criarOuAtualizar(formulario);
    }

    @PutMapping("/{id}")
    public Formulario atualizar(@PathVariable Long id, @RequestBody Formulario formulario) {
        formulario.setIdFormulario(id);
        return formularioService.criarOuAtualizar(formulario);
    }

    @DeleteMapping("/{id}")
    public void apagar(@PathVariable Long id) {
        formularioService.apagar(id);
    }

    @PostMapping("/novo/{idUtilizador}")
    public Formulario criarFormularioParaUtilizador(@PathVariable Long idUtilizador) {

        Utilizador utilizador = utilizadorService.buscarPorId(idUtilizador)
                .orElseThrow(() -> new RuntimeException("Utilizador não encontrado"));

        Formulario f = new Formulario();
        f.setUtilizador(utilizador);
        f.setPergunta1(null);
        f.setPergunta2(null);

        return formularioService.criarOuAtualizar(f);
    }
}
