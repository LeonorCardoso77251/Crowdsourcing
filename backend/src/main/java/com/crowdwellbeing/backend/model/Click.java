package com.crowdwellbeing.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Click")
public class Click {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Click")
    private Long idClick;

    @ManyToOne
    @JoinColumn(name = "ID_Mapeamento")
    private Mapeamento mapeamento;

    @Column(name = "Timestamp")
    private LocalDateTime timestamp;

    @Column(name = "X")
    private Integer x;

    @Column(name = "Y")
    private Integer y;

    @Column(name = "NodeHTML", columnDefinition = "TEXT")
    private String nodeHTML;

    // Getters e Setters
    public Long getIdClick() { return idClick; }
    public void setIdClick(Long idClick) { this.idClick = idClick; }

    public Mapeamento getMapeamento() { return mapeamento; }
    public void setMapeamento(Mapeamento mapeamento) { this.mapeamento = mapeamento; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public Integer getX() { return x; }
    public void setX(Integer x) { this.x = x; }

    public Integer getY() { return y; }
    public void setY(Integer y) { this.y = y; }

    public String getNodeHTML() { return nodeHTML; }
    public void setNodeHTML(String nodeHTML) { this.nodeHTML = nodeHTML; }
}

