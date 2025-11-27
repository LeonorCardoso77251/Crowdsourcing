package com.crowdwellbeing.backend.service;

import com.crowdwellbeing.backend.model.Mapeamento;
import com.crowdwellbeing.backend.repository.MapeamentoRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@SuppressWarnings("null")
@Service
public class MapeamentoService {

    private final MapeamentoRepository mapeamentoRepository;

    public MapeamentoService(MapeamentoRepository mapeamentoRepository) {
        this.mapeamentoRepository = mapeamentoRepository;
    }

    public List<Mapeamento> listarTodos() {
        return mapeamentoRepository.findAll();
    }

    public Optional<Mapeamento> buscarPorId(Long id) {
        return mapeamentoRepository.findById(id);
    }

    public Mapeamento criarOuAtualizar(Mapeamento mapeamento) {
        return mapeamentoRepository.save(mapeamento);
    }

    public void apagar(Long id) {
        mapeamentoRepository.deleteById(id);
    }
    
}
