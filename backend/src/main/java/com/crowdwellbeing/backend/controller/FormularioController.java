package com.crowdwellbeing.backend.controller;

import com.crowdwellbeing.backend.model.Formulario;
import com.crowdwellbeing.backend.service.FormularioService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/formularios")
public class FormularioController {

    private final FormularioService formularioService;

    public FormularioController(FormularioService formularioService) {
        this.formularioService = formularioService;
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
}
