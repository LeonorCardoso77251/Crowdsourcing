package com.crowdwellbeing.backend.service;

import java.io.File;
import java.util.List;
import java.util.Optional;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import com.crowdwellbeing.backend.model.Utilizador;
import com.crowdwellbeing.backend.repository.UtilizadorRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class UtilizadorService {

    private final UtilizadorRepository utilizadorRepository;

    public UtilizadorService(UtilizadorRepository utilizadorRepository) {
        this.utilizadorRepository = utilizadorRepository;
    }

    public List<Utilizador> listarTodos() {
        return utilizadorRepository.findAll();
    }

    public Optional<Utilizador> buscarPorId(Long id) {
        return utilizadorRepository.findById(id);
    }

    public Utilizador criarOuAtualizar(Utilizador utilizador) {
        return utilizadorRepository.save(utilizador);
    }

    public void apagar(Long id) {
        utilizadorRepository.deleteById(id);
    }
    public void atualizarUtilizadoresAPartirDoJson() {
        try {
            ObjectMapper mapper = new ObjectMapper();

            File jsonFile = new ClassPathResource("utilizadores_update.json").getFile();

            List<Utilizador> lista =
                    mapper.readValue(jsonFile, new TypeReference<List<Utilizador>>() {});

            for (Utilizador dado : lista) {

                Optional<Utilizador> opt = utilizadorRepository.findById(dado.getIdUtilizador());

                if (opt.isPresent()) {
                    Utilizador u = opt.get();

                    u.setIdadeFaixa(dado.getIdadeFaixa());
                    u.setGenero(dado.getGenero());

                    utilizadorRepository.save(u);
                    System.out.println("Atualizado → ID " + u.getIdUtilizador());
                } else {
                    System.out.println("Não encontrado → ID " + dado.getIdUtilizador());
                }
            }

            System.out.println("Importação JSON concluída!");

        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Erro ao importar JSON");
        }
    }
}
