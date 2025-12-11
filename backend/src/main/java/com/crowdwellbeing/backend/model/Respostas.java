package com.crowdwellbeing.backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Respostas")
public class Respostas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Respostas")
    private Long idRespostas;

    @Column(name = "Resposta1")
    private String resposta1;

    @Column(name = "Resposta2")
    private String resposta2;
    
    @Column(name = "Resposta3")       // 🔵 NOVO
    private String resposta3;

    @Column(name = "Tempo")
    private LocalDateTime tempo;

    // Relação com Utilizador
    @ManyToOne
    @JoinColumn(name = "ID_Utilizador")
    private Utilizador utilizador;

    // Relação com Formulario
    @ManyToOne
    @JoinColumn(name = "ID_Formulario")
    private Formulario formulario;

    // Getters e Setters
    public Long getIdRespostas() { return idRespostas; }
    public void setIdRespostas(Long idRespostas) { this.idRespostas = idRespostas; }

    public String getResposta1() { return resposta1; }
    public void setResposta1(String resposta1) { this.resposta1 = resposta1; }

    public String getResposta2() { return resposta2; }
    public void setResposta2(String resposta2) { this.resposta2 = resposta2; }

    // 🔵 NOVO
    public String getResposta3() { return resposta3; }
    public void setResposta3(String resposta3) { this.resposta3 = resposta3; }

    public LocalDateTime getTempo() { return tempo; }
    public void setTempo(LocalDateTime tempo) { this.tempo = tempo; }

    public Utilizador getUtilizador() { return utilizador; }
    public void setUtilizador(Utilizador utilizador) { this.utilizador = utilizador; }

    public Formulario getFormulario() { return formulario; }
    public void setFormulario(Formulario formulario) { this.formulario = formulario; }
}
