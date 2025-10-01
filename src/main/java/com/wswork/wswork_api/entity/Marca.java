package com.wswork.wswork_api.entity;

import jakarta.persistence.*;
import lombok.Data; // Lombok para facilitar nossa vida, gerar getters, setters, etc.

@Entity // Avisa ao JPA que esta classe representa uma tabela no banco
@Data   // Anotação do Lombok que cria getters, setters, toString, etc.
public class Marca {

    @Id // Chave primária
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ID auto-incremental
    private Long id;

    @Column(unique = true) // O nome da marca deve ser único
    private String nome_marca;
}