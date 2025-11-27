package com.crowdwellbeing.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ContextChange")
public class ContextChange {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Contexto")
    private Long idContexto;

    @ManyToOne
    @JoinColumn(name = "ID_Mapeamento")
    private Mapeamento mapeamento;

    @Column(name = "Timestamp")
    private LocalDateTime timestamp;

    @Column(name = "Tipo")
    private String tipo;

    // Getters e Setters
    public Long getIdContexto() { return idContexto; }
    public void setIdContexto(Long idContexto) { this.idContexto = idContexto; }

    public Mapeamento getMapeamento() { return mapeamento; }
    public void setMapeamento(Mapeamento mapeamento) { this.mapeamento = mapeamento; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
}

