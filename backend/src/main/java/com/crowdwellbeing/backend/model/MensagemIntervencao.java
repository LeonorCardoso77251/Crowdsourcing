package com.crowdwellbeing.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "MensagemIntervecao")
public class MensagemIntervencao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Mensagem")
    private Long idMensagem;

    @Column(name = "Nivel_Mobilidade")
    private String nivelMobilidade;

    @Column(name = "Nivel_Depressao")
    private String nivelDepressao;

    @Column(name = "Texto_Mensagem", columnDefinition = "TEXT")
    private String textoMensagem;

    // Getters e Setters
    public Long getIdMensagem() { return idMensagem; }
    public void setIdMensagem(Long idMensagem) { this.idMensagem = idMensagem; }

    public String getNivelMobilidade() { return nivelMobilidade; }
    public void setNivelMobilidade(String nivelMobilidade) { this.nivelMobilidade = nivelMobilidade; }

    public String getNivelDepressao() { return nivelDepressao; }
    public void setNivelDepressao(String nivelDepressao) { this.nivelDepressao = nivelDepressao; }

    public String getTextoMensagem() { return textoMensagem; }
    public void setTextoMensagem(String textoMensagem) { this.textoMensagem = textoMensagem; }
}
