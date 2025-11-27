package com.crowdwellbeing.backend.model;

import jakarta.persistence.*;
import java.util.List;
@SuppressWarnings("unused")


@Entity
@Table(name = "Utilizador")
public class Utilizador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Utilizador")
    private Long idUtilizador;

    @Column(name = "Idade_Faixa")
    private String idadeFaixa;

    @Column(name = "Genero")
    private String genero;

    // Relações
    @OneToMany(mappedBy = "utilizador", cascade = CascadeType.ALL)
    private List<Classificacao> classificacoes;

    @OneToMany(mappedBy = "utilizador", cascade = CascadeType.ALL)
    private List<Formulario> formularios;

    @OneToMany(mappedBy = "utilizador", cascade = CascadeType.ALL)
    private List<Respostas> respostas;

    @OneToMany(mappedBy = "utilizador", cascade = CascadeType.ALL)
    private List<Mapeamento> mapeamentos;

    // Getters e Setters
    public Long getIdUtilizador() { return idUtilizador; }
    public void setIdUtilizador(Long idUtilizador) { this.idUtilizador = idUtilizador; }

    public String getIdadeFaixa() { return idadeFaixa; }
    public void setIdadeFaixa(String idadeFaixa) { this.idadeFaixa = idadeFaixa; }

    public String getGenero() { return genero; }
    public void setGenero(String genero) { this.genero = genero; }
}
