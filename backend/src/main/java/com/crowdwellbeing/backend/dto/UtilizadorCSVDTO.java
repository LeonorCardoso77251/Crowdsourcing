package com.crowdwellbeing.backend.dto;

public class UtilizadorCSVDTO {
    private Long idUtilizador;
    private String idadeFaixa;
    private String genero;

    public Long getIdUtilizador() {
        return idUtilizador;
    }

    public void setIdUtilizador(Long idUtilizador) {
        this.idUtilizador = idUtilizador;
    }

    public String getIdadeFaixa() {
        return idadeFaixa;
    }

    public void setIdadeFaixa(String idadeFaixa) {
        this.idadeFaixa = idadeFaixa;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }
}
