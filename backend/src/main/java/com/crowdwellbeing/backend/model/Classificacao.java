package com.crowdwellbeing.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Classificacao")
public class Classificacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Classificacao")
    private Long idClassificacao;

    @Column(name = "Nivel_Mobilidade")
    private String nivelMobilidade;

    @Column(name = "Nivel_Depressao")
    private String nivelDepressao;

    // Relação com Utilizador (muitos para um)
    @ManyToOne
    @JoinColumn(name = "ID_Utilizador")
    private Utilizador utilizador;

    // Getters e Setters
    public Long getIdClassificacao() { return idClassificacao; }
    public void setIdClassificacao(Long idClassificacao) { this.idClassificacao = idClassificacao; }

    public String getNivelMobilidade() { return nivelMobilidade; }
    public void setNivelMobilidade(String nivelMobilidade) { this.nivelMobilidade = nivelMobilidade; }

    public String getNivelDepressao() { return nivelDepressao; }
    public void setNivelDepressao(String nivelDepressao) { this.nivelDepressao = nivelDepressao; }

    public Utilizador getUtilizador() { return utilizador; }
    public void setUtilizador(Utilizador utilizador) { this.utilizador = utilizador; }
}
