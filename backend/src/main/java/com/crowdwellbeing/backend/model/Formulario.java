package com.crowdwellbeing.backend.model;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "Formulario")
public class Formulario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Formulario")
    private Long idFormulario;

    @Column(name = "Pergunta1")
    private String pergunta1;

    @Column(name = "Pergunta2")
    private String pergunta2;

    @ManyToOne
    @JoinColumn(name = "ID_Utilizador", nullable = false)
    @JsonIgnoreProperties({"formularios", "classificacoes", "respostas", "mapeamentos"})
    private Utilizador utilizador;

    public Long getIdFormulario() { return idFormulario; }
    public void setIdFormulario(Long idFormulario) { this.idFormulario = idFormulario; }

    public String getPergunta1() { return pergunta1; }
    public void setPergunta1(String pergunta1) { this.pergunta1 = pergunta1; }

    public String getPergunta2() { return pergunta2; }
    public void setPergunta2(String pergunta2) { this.pergunta2 = pergunta2; }

    public Utilizador getUtilizador() { return utilizador; }
    public void setUtilizador(Utilizador utilizador) { this.utilizador = utilizador; }
    
}
