package com.crowdwellbeing.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Relatorio")
public class Relatorio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Relatorio")
    private Long idRelatorio;

    @Column(name = "Total_Mensagens")
    private Integer totalMensagens;

    // Getters e Setters
    public Long getIdRelatorio() { return idRelatorio; }
    public void setIdRelatorio(Long idRelatorio) { this.idRelatorio = idRelatorio; }

    public Integer getTotalMensagens() { return totalMensagens; }
    public void setTotalMensagens(Integer totalMensagens) { this.totalMensagens = totalMensagens; }
}
