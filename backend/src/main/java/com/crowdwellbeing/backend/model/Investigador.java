package com.crowdwellbeing.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Investigador")
public class Investigador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Investigador")
    private Long idInvestigador;

    @Column(name = "Email", nullable = false, unique = true)
    private String email;

    @Column(name = "PassWord", nullable = false)
    private String password;

    // Getters e Setters
    public Long getIdInvestigador() { return idInvestigador; }
    public void setIdInvestigador(Long idInvestigador) { this.idInvestigador = idInvestigador; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
