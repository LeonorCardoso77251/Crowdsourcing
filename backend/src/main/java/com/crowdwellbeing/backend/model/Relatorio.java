package com.crowdwellbeing.backend.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Relatorio")
public class Relatorio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Relatorio")
    private Long idRelatorio;

    @Column(name = "Total_Mensagens")
    private Integer totalMensagens;

    @ManyToOne
    @JoinColumn(name = "ID_Utilizador")
    private Utilizador utilizador;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "Behavioral_Logs", columnDefinition = "jsonb")
    private String behavioralLogs;

    @Column(name = "Data_Criacao")
    private LocalDateTime dataCriacao;

    // Getters e Setters
    public Long getIdRelatorio() {
        return idRelatorio;
    }

    public void setIdRelatorio(Long idRelatorio) {
        this.idRelatorio = idRelatorio;
    }

    public Integer getTotalMensagens() {
        return totalMensagens;
    }

    public void setTotalMensagens(Integer totalMensagens) {
        this.totalMensagens = totalMensagens;
    }

    public Utilizador getUtilizador() {
        return utilizador;
    }

    public void setUtilizador(Utilizador utilizador) {
        this.utilizador = utilizador;
    }

    public String getBehavioralLogs() {
        return behavioralLogs;
    }

    public void setBehavioralLogs(String behavioralLogs) {
        this.behavioralLogs = behavioralLogs;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }
}
