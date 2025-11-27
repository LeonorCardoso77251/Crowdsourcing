package com.crowdwellbeing.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "KeyLogger")
public class KeyLogger {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Key")
    private Long idKey;

    @ManyToOne
    @JoinColumn(name = "ID_Mapeamento")
    private Mapeamento mapeamento;

    @Column(name = "Timestamp")
    private LocalDateTime timestamp;

    @Column(name = "Tecla")
    private String tecla;

    // Getters e Setters
    public Long getIdKey() { return idKey; }
    public void setIdKey(Long idKey) { this.idKey = idKey; }

    public Mapeamento getMapeamento() { return mapeamento; }
    public void setMapeamento(Mapeamento mapeamento) { this.mapeamento = mapeamento; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public String getTecla() { return tecla; }
    public void setTecla(String tecla) { this.tecla = tecla; }
}

