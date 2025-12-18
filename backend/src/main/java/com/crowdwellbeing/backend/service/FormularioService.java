package com.crowdwellbeing.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.crowdwellbeing.backend.model.Formulario;
import com.crowdwellbeing.backend.repository.FormularioRepository;

@Service
public class FormularioService {

    private final FormularioRepository formularioRepository;

    public FormularioService(FormularioRepository formularioRepository) {
        this.formularioRepository = formularioRepository;
    }

    public List<Formulario> listarTodos() {
        return formularioRepository.findAll();
    }

    public Optional<Formulario> buscarPorId(Long id) {
        return formularioRepository.findById(id);
    }

    public Formulario criarOuAtualizar(Formulario formulario) {
        return formularioRepository.save(formulario);
    }

    public void apagar(Long id) {
        formularioRepository.deleteById(id);
    }
}
