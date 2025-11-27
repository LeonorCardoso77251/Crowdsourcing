package com.crowdwellbeing.backend.service;

import com.crowdwellbeing.backend.model.Relatorio;
import com.crowdwellbeing.backend.repository.RelatorioRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@SuppressWarnings("null")
@Service
public class RelatorioService {

    private final RelatorioRepository relatorioRepository;

    public RelatorioService(RelatorioRepository relatorioRepository) {
        this.relatorioRepository = relatorioRepository;
    }

    public List<Relatorio> listarTodos() {
        return relatorioRepository.findAll();
    }

    public Optional<Relatorio> buscarPorId(Long id) {
        return relatorioRepository.findById(id);
    }

    public Relatorio criarOuAtualizar(Relatorio relatorio) {
        return relatorioRepository.save(relatorio);
    }

    public void apagar(Long id) {
        relatorioRepository.deleteById(id);
    }
}
