package com.crowdwellbeing.backend.service;

import com.crowdwellbeing.backend.model.ContextChange;
import com.crowdwellbeing.backend.repository.ContextChangeRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@SuppressWarnings("null")
@Service
public class ContextChangeService {

    private final ContextChangeRepository contextChangeRepository;

    public ContextChangeService(ContextChangeRepository contextChangeRepository) {
        this.contextChangeRepository = contextChangeRepository;
    }

    public List<ContextChange> listarTodos() {
        return contextChangeRepository.findAll();
    }

    public Optional<ContextChange> buscarPorId(Long id) {
        return contextChangeRepository.findById(id);
    }

    public ContextChange criarOuAtualizar(ContextChange contextChange) {
        return contextChangeRepository.save(contextChange);
    }

    public void apagar(Long id) {
        contextChangeRepository.deleteById(id);
    }
}
