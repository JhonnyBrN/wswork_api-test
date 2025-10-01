package com.wswork.wswork_api.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Modelo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private Double valor_fipe;

    @ManyToOne // Muitos modelos pertencem a >>>UMA<<< marca
    @JoinColumn(name = "marca_id") // Nome da coluna da chave estrangeira
    private Marca marca;
}