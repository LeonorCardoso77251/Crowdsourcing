package com.crowdwellbeing.backend.controller;

import com.crowdwellbeing.backend.model.KeyLogger;
import com.crowdwellbeing.backend.service.KeyLoggerService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/keys")
public class KeyLoggerController {

    private final KeyLoggerService keyLoggerService;

    public KeyLoggerController(KeyLoggerService keyLoggerService) {
        this.keyLoggerService = keyLoggerService;
    }

    @GetMapping
    public List<KeyLogger> listarTodos() {
        return keyLoggerService.listarTodos();
    }

    @GetMapping("/{id}")
    public KeyLogger buscarPorId(@PathVariable Long id) {
        return keyLoggerService.buscarPorId(id).orElse(null);
    }

    @PostMapping
    public KeyLogger criar(@RequestBody KeyLogger key) {
        return keyLoggerService.criarOuAtualizar(key);
    }

    @PutMapping("/{id}")
    public KeyLogger atualizar(@PathVariable Long id, @RequestBody KeyLogger key) {
        key.setIdKey(id);
        return keyLoggerService.criarOuAtualizar(key);
    }

    @DeleteMapping("/{id}")
    public void apagar(@PathVariable Long id) {
        keyLoggerService.apagar(id);
    }
}
