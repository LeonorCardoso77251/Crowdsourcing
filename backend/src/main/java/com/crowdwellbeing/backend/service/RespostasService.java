package com.crowdwellbeing.backend.service;

import com.crowdwellbeing.backend.model.Respostas;
import com.crowdwellbeing.backend.repository.RespostasRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@SuppressWarnings("null")
@Service
public class RespostasService {

    private final RespostasRepository respostasRepository;

    public RespostasService(RespostasRepository respostasRepository) {
        this.respostasRepository = respostasRepository;
    }

    public List<Respostas> listarTodas() {
        return respostasRepository.findAll();
    }

    public Optional<Respostas> buscarPorId(Long id) {
        return respostasRepository.findById(id);
    }

    public Respostas criarOuAtualizar(Respostas respostas) {
        return respostasRepository.save(respostas);
    }

    public void apagar(Long id) {
        respostasRepository.deleteById(id);
    }
}

