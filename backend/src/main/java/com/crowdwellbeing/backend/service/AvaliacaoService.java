package com.crowdwellbeing.backend.service;

import org.springframework.stereotype.Service;

import com.crowdwellbeing.backend.dto.AvaliacaoRequestDTO;
import com.crowdwellbeing.backend.model.Avaliacao;
import com.crowdwellbeing.backend.model.Formulario;
import com.crowdwellbeing.backend.model.Utilizador;
import com.crowdwellbeing.backend.repository.AvaliacaoRepository;
import com.crowdwellbeing.backend.repository.FormularioRepository;
import com.crowdwellbeing.backend.repository.UtilizadorRepository;

@Service
public class AvaliacaoService {

    private final AvaliacaoRepository avaliacaoRepository;
    private final UtilizadorRepository utilizadorRepository;
    private final FormularioRepository formularioRepository;

    public AvaliacaoService(
            AvaliacaoRepository avaliacaoRepository,
            UtilizadorRepository utilizadorRepository,
            FormularioRepository formularioRepository
    ) {
        this.avaliacaoRepository = avaliacaoRepository;
        this.utilizadorRepository = utilizadorRepository;
        this.formularioRepository = formularioRepository;
    }

public void guardarAvaliacao(AvaliacaoRequestDTO dto) {

    Utilizador utilizador = utilizadorRepository
            .findById(dto.getIdUtilizador())
            .orElseThrow(() -> new RuntimeException("Utilizador não encontrado"));

    Formulario formulario = formularioRepository
            .findById(dto.getIdFormulario())
            .orElseThrow(() -> new RuntimeException("Formulário não encontrado"));

    Avaliacao avaliacao = avaliacaoRepository
            .findByUtilizador_IdUtilizador(dto.getIdUtilizador())
            .orElse(new Avaliacao());

    avaliacao.setUtilizador(utilizador);
    avaliacao.setFormulario(formulario);
    avaliacao.setScoreTotal(dto.getScoreTotal());
    avaliacao.setNivel(dto.getNivel());

    avaliacaoRepository.save(avaliacao);
}

}
