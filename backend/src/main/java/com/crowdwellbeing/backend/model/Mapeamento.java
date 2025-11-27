package com.crowdwellbeing.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Mapeamento")
public class Mapeamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Mapeamento")
    private Long idMapeamento;

    @ManyToOne
    @JoinColumn(name = "ID_Utilizador")
    private Utilizador utilizador;

    @Column(name = "Data_Hora_Inicio")
    private LocalDateTime dataHoraInicio;

    @Column(name = "Data_Hora_Fim")
    private LocalDateTime dataHoraFim;

    @Column(name = "Duracao")
    private String duracao; // INTERVAL pode ser tratado como String

    @Column(name = "Browser")
    private String browser;

    @Column(name = "Plataforma")
    private String plataforma;

    @Column(name = "Dispositivo")
    private String dispositivo;

    @Column(name = "UserAgent", columnDefinition = "TEXT")
    private String userAgent;

    @Column(name = "Estado_Processamento")
    private String estadoProcessamento;

    // Getters e Setters
    public Long getIdMapeamento() { return idMapeamento; }
    public void setIdMapeamento(Long idMapeamento) { this.idMapeamento = idMapeamento; }

    public Utilizador getUtilizador() { return utilizador; }
    public void setUtilizador(Utilizador utilizador) { this.utilizador = utilizador; }

    public LocalDateTime getDataHoraInicio() { return dataHoraInicio; }
    public void setDataHoraInicio(LocalDateTime dataHoraInicio) { this.dataHoraInicio = dataHoraInicio; }

    public LocalDateTime getDataHoraFim() { return dataHoraFim; }
    public void setDataHoraFim(LocalDateTime dataHoraFim) { this.dataHoraFim = dataHoraFim; }

    public String getDuracao() { return duracao; }
    public void setDuracao(String duracao) { this.duracao = duracao; }

    public String getBrowser() { return browser; }
    public void setBrowser(String browser) { this.browser = browser; }

    public String getPlataforma() { return plataforma; }
    public void setPlataforma(String plataforma) { this.plataforma = plataforma; }

    public String getDispositivo() { return dispositivo; }
    public void setDispositivo(String dispositivo) { this.dispositivo = dispositivo; }

    public String getUserAgent() { return userAgent; }
    public void setUserAgent(String userAgent) { this.userAgent = userAgent; }

    public String getEstadoProcessamento() { return estadoProcessamento; }
    public void setEstadoProcessamento(String estadoProcessamento) { this.estadoProcessamento = estadoProcessamento; }
}
