package com.crowdwellbeing.backend.service;

import com.crowdwellbeing.backend.model.Utilizador;
import com.crowdwellbeing.backend.repository.UtilizadorRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@SuppressWarnings("null")

@Service
public class UtilizadorService {

    private final UtilizadorRepository utilizadorRepository;

    public UtilizadorService(UtilizadorRepository utilizadorRepository) {
        this.utilizadorRepository = utilizadorRepository;
    }

    public List<Utilizador> listarTodos() {
        return utilizadorRepository.findAll();
    }

    public Optional<Utilizador> buscarPorId(Long id) {
        return utilizadorRepository.findById(id);
    }

    public Utilizador criarOuAtualizar(Utilizador utilizador) {
        return utilizadorRepository.save(utilizador);
    }

    public void apagar(Long id) {
        utilizadorRepository.deleteById(id);
    }
}

