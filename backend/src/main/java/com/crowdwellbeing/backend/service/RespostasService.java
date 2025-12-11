package com.crowdwellbeing.backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.crowdwellbeing.backend.dto.RespostasDTO;
import com.crowdwellbeing.backend.model.Formulario;
import com.crowdwellbeing.backend.model.Respostas;
import com.crowdwellbeing.backend.model.Utilizador;
import com.crowdwellbeing.backend.repository.FormularioRepository;
import com.crowdwellbeing.backend.repository.RespostasRepository;
import com.crowdwellbeing.backend.repository.UtilizadorRepository;

@Service
public class RespostasService {

    private final RespostasRepository respostasRepository;
    private final UtilizadorRepository utilizadorRepository;
    private final FormularioRepository formularioRepository;

    public RespostasService(RespostasRepository respostasRepository,
                            UtilizadorRepository utilizadorRepository,
                            FormularioRepository formularioRepository) {
        this.respostasRepository = respostasRepository;
        this.utilizadorRepository = utilizadorRepository;
        this.formularioRepository = formularioRepository;
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

    // 🔥 MÉTODO QUE FALTAVA
    public Respostas salvar(RespostasDTO dto) {

        Utilizador utilizador = utilizadorRepository.findById(dto.getIdUtilizador())
                .orElseThrow(() -> new RuntimeException("Utilizador não encontrado"));

        Formulario formulario = formularioRepository.findById(dto.getIdFormulario())
                .orElseThrow(() -> new RuntimeException("Formulário não encontrado"));

        Respostas respostas = new Respostas();
        respostas.setResposta1(dto.getResposta1());
        respostas.setResposta2(dto.getResposta2());
        respostas.setResposta3(dto.getResposta3());   // 🔵 NOVO
        respostas.setTempo(LocalDateTime.now());
        respostas.setUtilizador(utilizador);
        respostas.setFormulario(formulario);

        return respostasRepository.save(respostas);
    }
}
