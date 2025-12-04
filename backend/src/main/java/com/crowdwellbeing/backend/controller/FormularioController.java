package com.crowdwellbeing.backend.controller;

import com.crowdwellbeing.backend.model.Formulario;
import com.crowdwellbeing.backend.model.Utilizador;
import com.crowdwellbeing.backend.service.FormularioService;
import com.crowdwellbeing.backend.service.UtilizadorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/formularios")
@CrossOrigin(origins = "http://localhost:5173")
public class FormularioController {

    private final FormularioService formularioService;

    // 🔵 ADICIONAR ISTO
    private final UtilizadorService utilizadorService;

    // 🔵 CONSTRUTOR CORRETO (COM OS DOIS SERVICES)
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

    // 🔵 AGORA 100% CORRETO — NÃO DÁ MAIS ERRO 400
    @PostMapping("/novo/{idUtilizador}")
    public Formulario criarFormularioParaUtilizador(@PathVariable Long idUtilizador) {

        // 1️⃣ Buscar o utilizador real na BD
        Utilizador utilizador = utilizadorService.buscarPorId(idUtilizador)
                .orElseThrow(() -> new RuntimeException("Utilizador não encontrado"));

        // 2️⃣ Criar um novo formulário associado
        Formulario f = new Formulario();
        f.setUtilizador(utilizador);
        f.setPergunta1(null);
        f.setPergunta2(null);

        // 3️⃣ Guardar
        return formularioService.criarOuAtualizar(f);
    }
}
