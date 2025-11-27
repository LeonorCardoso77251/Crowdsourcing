package com.crowdwellbeing.backend.service;

import com.crowdwellbeing.backend.model.Investigador;
import com.crowdwellbeing.backend.repository.InvestigadorRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@SuppressWarnings("null")
@Service
public class InvestigadorService {

    private final InvestigadorRepository investigadorRepository;

    public InvestigadorService(InvestigadorRepository investigadorRepository) {
        this.investigadorRepository = investigadorRepository;
    }

    public List<Investigador> listarTodos() {
        return investigadorRepository.findAll();
    }

    public Optional<Investigador> buscarPorId(Long id) {
        return investigadorRepository.findById(id);
    }

    public Investigador criarOuAtualizar(Investigador investigador) {
        return investigadorRepository.save(investigador);
    }

    public void apagar(Long id) {
        investigadorRepository.deleteById(id);
    }
}
