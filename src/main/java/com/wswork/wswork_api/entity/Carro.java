package com.wswork.wswork_api.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Carro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime timestamp_cadastro;
    private int ano;
    private String combustivel;
    private int num_portas;
    private String cor;

    @ManyToOne // Muitos carros pertencem a >>>UM<<< modelo
    @JoinColumn(name = "modelo_id")
    private Modelo modelo;
}