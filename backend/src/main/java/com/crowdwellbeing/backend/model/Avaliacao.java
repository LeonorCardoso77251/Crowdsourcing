package com.crowdwellbeing.backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "Avaliacao")
public class Avaliacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Avaliacao")
    private Long idAvaliacao;

    @Column(name = "Score_Total", nullable = false)
    private Integer scoreTotal;

    @Column(name = "Nivel", nullable = false)
    private String nivel;

    @Column(name = "Data_Criacao")
    private LocalDateTime dataCriacao;

    // 🔗 Relação com Utilizador
    @ManyToOne
    @JoinColumn(name = "ID_Utilizador", nullable = false)
    private Utilizador utilizador;

    // 🔗 Relação com Formulario
    @ManyToOne
    @JoinColumn(name = "ID_Formulario", nullable = false)
    private Formulario formulario;

    @PrePersist
    protected void onCreate() {
        this.dataCriacao = LocalDateTime.now();
    }

    // Getters e Setters
    public Long getIdAvaliacao() {
        return idAvaliacao;
    }

    public Integer getScoreTotal() {
        return scoreTotal;
    }

    public void setScoreTotal(Integer scoreTotal) {
        this.scoreTotal = scoreTotal;
    }

    public String getNivel() {
        return nivel;
    }

    public void setNivel(String nivel) {
        this.nivel = nivel;
    }

    public Utilizador getUtilizador() {
        return utilizador;
    }

    public void setUtilizador(Utilizador utilizador) {
        this.utilizador = utilizador;
    }

    public Formulario getFormulario() {
        return formulario;
    }

    public void setFormulario(Formulario formulario) {
        this.formulario = formulario;
    }
}
