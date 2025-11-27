package com.crowdwellbeing.backend.service;

import com.crowdwellbeing.backend.model.Click;
import com.crowdwellbeing.backend.repository.ClickRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@SuppressWarnings("null")
@Service
public class ClickService {

    private final ClickRepository clickRepository;

    public ClickService(ClickRepository clickRepository) {
        this.clickRepository = clickRepository;
    }

    public List<Click> listarTodos() {
        return clickRepository.findAll();
    }

    public Optional<Click> buscarPorId(Long id) {
        return clickRepository.findById(id);
    }

    public Click criarOuAtualizar(Click click) {
        return clickRepository.save(click);
    }

    public void apagar(Long id) {
        clickRepository.deleteById(id);
    }
}
