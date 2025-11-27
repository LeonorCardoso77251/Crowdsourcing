package com.crowdwellbeing.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "MouseMovement")
public class MouseMovement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Movimento")
    private Long idMovimento;

    @ManyToOne
    @JoinColumn(name = "ID_Mapeamento")
    private Mapeamento mapeamento;

    @Column(name = "Timestamp")
    private LocalDateTime timestamp;

    @Column(name = "X")
    private Integer x;

    @Column(name = "Y")
    private Integer y;

    // Getters e Setters
    public Long getIdMovimento() { return idMovimento; }
    public void setIdMovimento(Long idMovimento) { this.idMovimento = idMovimento; }

    public Mapeamento getMapeamento() { return mapeamento; }
    public void setMapeamento(Mapeamento mapeamento) { this.mapeamento = mapeamento; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public Integer getX() { return x; }
    public void setX(Integer x) { this.x = x; }

    public Integer getY() { return y; }
    public void setY(Integer y) { this.y = y; }
}

