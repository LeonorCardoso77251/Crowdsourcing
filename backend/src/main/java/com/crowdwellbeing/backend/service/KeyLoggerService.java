package com.crowdwellbeing.backend.service;

import com.crowdwellbeing.backend.model.KeyLogger;
import com.crowdwellbeing.backend.repository.KeyLoggerRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@SuppressWarnings("null")
@Service
public class KeyLoggerService {

    private final KeyLoggerRepository keyLoggerRepository;

    public KeyLoggerService(KeyLoggerRepository keyLoggerRepository) {
        this.keyLoggerRepository = keyLoggerRepository;
    }

    public List<KeyLogger> listarTodos() {
        return keyLoggerRepository.findAll();
    }

    public Optional<KeyLogger> buscarPorId(Long id) {
        return keyLoggerRepository.findById(id);
    }

    public KeyLogger criarOuAtualizar(KeyLogger keyLogger) {
        return keyLoggerRepository.save(keyLogger);
    }

    public void apagar(Long id) {
        keyLoggerRepository.deleteById(id);
    }
}
