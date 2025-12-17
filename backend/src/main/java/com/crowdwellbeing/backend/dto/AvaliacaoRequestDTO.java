package com.crowdwellbeing.backend.dto;

public class AvaliacaoRequestDTO {

    private Long idUtilizador;
    private Long idFormulario;
    private Integer scoreTotal;
    private String nivel;

    public Long getIdUtilizador() {
        return idUtilizador;
    }

    public Long getIdFormulario() {
        return idFormulario;
    }

    public Integer getScoreTotal() {
        return scoreTotal;
    }

    public String getNivel() {
        return nivel;
    }
}
