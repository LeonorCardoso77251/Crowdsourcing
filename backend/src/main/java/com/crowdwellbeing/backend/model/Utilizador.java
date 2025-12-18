package com.crowdwellbeing.backend.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "Utilizador")
public class Utilizador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Utilizador")
    private Long idUtilizador;

    @Column(name = "Genero")
    private String genero;

    @Column(name = "Idade_Faixa")
    private String idadeFaixa;

    // 🔗 Relações (opcionais, mas corretas)
    @OneToMany(mappedBy = "utilizador")
    private List<Formulario> formularios;

    @OneToMany(mappedBy = "utilizador")
    private List<Respostas> respostas;

    @OneToMany(mappedBy = "utilizador")
    private List<Avaliacao> avaliacoes;

    @OneToMany(mappedBy = "utilizador")
    private List<Relatorio> relatorios;

    // Getters e Setters
    public Long getIdUtilizador() {
        return idUtilizador;
    }

    public void setIdUtilizador(Long idUtilizador) {
        this.idUtilizador = idUtilizador;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public String getIdadeFaixa() {
        return idadeFaixa;
    }

    public void setIdadeFaixa(String idadeFaixa) {
        this.idadeFaixa = idadeFaixa;
    }
}
