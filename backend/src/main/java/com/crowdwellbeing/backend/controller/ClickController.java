package com.crowdwellbeing.backend.controller;

import com.crowdwellbeing.backend.model.Click;
import com.crowdwellbeing.backend.service.ClickService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/clicks")
public class ClickController {

    private final ClickService clickService;

    public ClickController(ClickService clickService) {
        this.clickService = clickService;
    }

    @GetMapping
    public List<Click> listarTodos() {
        return clickService.listarTodos();
    }

    @GetMapping("/{id}")
    public Click buscarPorId(@PathVariable Long id) {
        return clickService.buscarPorId(id).orElse(null);
    }

    @PostMapping
    public Click criar(@RequestBody Click click) {
        return clickService.criarOuAtualizar(click);
    }

    @PutMapping("/{id}")
    public Click atualizar(@PathVariable Long id, @RequestBody Click click) {
        click.setIdClick(id);
        return clickService.criarOuAtualizar(click);
    }

    @DeleteMapping("/{id}")
    public void apagar(@PathVariable Long id) {
        clickService.apagar(id);
    }
}

