package com.crowdwellbeing.backend.service;

import com.crowdwellbeing.backend.model.Classificacao;
import com.crowdwellbeing.backend.repository.ClassificacaoRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@SuppressWarnings("null")
@Service
public class ClassificacaoService {

    private final ClassificacaoRepository classificacaoRepository;

    public ClassificacaoService(ClassificacaoRepository classificacaoRepository) {
        this.classificacaoRepository = classificacaoRepository;
    }

    public List<Classificacao> listarTodas() {
        return classificacaoRepository.findAll();
    }

    public Optional<Classificacao> buscarPorId(Long id) {
        return classificacaoRepository.findById(id);
    }

    public Classificacao criarOuAtualizar(Classificacao classificacao) {
        return classificacaoRepository.save(classificacao);
    }

    public void apagar(Long id) {
        classificacaoRepository.deleteById(id);
    }
}

