package com.wswork.wswork_api.dto;

import com.wswork.wswork_api.entity.Carro;
import lombok.Getter;

@Getter // Só precisamos dos métodos Getters aqui
public class CarroResponseDTO {
    // Esse DTO é um "molde" para o JSON de resposta que o teste pediu.
    // Ele achata os dados de Carro, Modelo e Marca em um único objeto, não em uma linha contínua.

    private Long id;
    private Long timestamp_cadastro;
    private Long modelo_id;
    private int ano;
    private String combustivel;
    private int num_portas;
    private String cor;
    private String nome_modelo;
    private Double valor;
    private Long brand; // ID da marca

    // Construtor que transforma um objeto Carro (Entidade) em CarroResponseDTO
    public CarroResponseDTO(Carro carro) {
        this.id = carro.getId();
        // Convertendo LocalDateTime para timestamp Unix
        this.timestamp_cadastro = carro.getTimestamp_cadastro().atZone(java.time.ZoneId.systemDefault()).toEpochSecond();
        this.modelo_id = carro.getModelo().getId();
        this.ano = carro.getAno();
        this.combustivel = carro.getCombustivel();
        this.num_portas = carro.getNum_portas();
        this.cor = carro.getCor();
        this.nome_modelo = carro.getModelo().getNome();
        this.valor = carro.getModelo().getValor_fipe();
        this.brand = carro.getModelo().getMarca().getId();
    }
}