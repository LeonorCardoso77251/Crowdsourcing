package com.crowdwellbeing.backend.service;

import com.crowdwellbeing.backend.model.MensagemIntervencao;
import com.crowdwellbeing.backend.repository.MensagemIntervencaoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@SuppressWarnings("null")
@Service
public class MensagemIntervencaoService {

    private final MensagemIntervencaoRepository mensagemIntervencaoRepository;

    public MensagemIntervencaoService(MensagemIntervencaoRepository mensagemIntervencaoRepository) {
        this.mensagemIntervencaoRepository = mensagemIntervencaoRepository;
    }

    public List<MensagemIntervencao> listarTodos() {
        return mensagemIntervencaoRepository.findAll();
    }

    public Optional<MensagemIntervencao> buscarPorId(Long id) {
        return mensagemIntervencaoRepository.findById(id);
    }

    public MensagemIntervencao criarOuAtualizar(MensagemIntervencao mensagem) {
        return mensagemIntervencaoRepository.save(mensagem);
    }

    public void apagar(Long id) {
        mensagemIntervencaoRepository.deleteById(id);
    }
}

