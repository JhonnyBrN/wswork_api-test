package com.wswork.wswork_api.controller;

import com.wswork.wswork_api.dto.CarroResponseDTO;
import com.wswork.wswork_api.entity.Carro;
import com.wswork.wswork_api.repository.CarroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/carros") // Todos os endpoints aqui começarão com /carros
@CrossOrigin(origins = "*") // Permite que qualquer frontend acesse esta API (CORS)
public class CarroController {

    @Autowired // Injeção de dependência
    private CarroRepository carroRepository;

    // Endpoint especial solicitado
    @GetMapping("/json")
    public Map<String, List<CarroResponseDTO>> listarTodosFormatado() {
        List<Carro> carros = carroRepository.findAll();
        List<CarroResponseDTO> carrosDTO = carros.stream()
                .map(CarroResponseDTO::new) // Converte cada Carro para CarroResponseDTO
                .collect(Collectors.toList());
        return Collections.singletonMap("cars", carrosDTO);
    }
    
    // CRUD Básico
    
    @GetMapping
    public List<Carro> listarTodos() {
        return carroRepository.findAll();
    }
    
    @PostMapping
    public Carro criar(@RequestBody Carro carro) {
        carro.setTimestamp_cadastro(LocalDateTime.now());
        return carroRepository.save(carro);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Carro> atualizar(@PathVariable Long id, @RequestBody Carro carroDetails) {
        return carroRepository.findById(id)
                .map(carro -> {
                    carro.setAno(carroDetails.getAno());
                    carro.setCombustivel(carroDetails.getCombustivel());
                    carro.setNum_portas(carroDetails.getNum_portas());
                    carro.setCor(carroDetails.getCor());
                    carro.setModelo(carroDetails.getModelo());
                    Carro updatedCarro = carroRepository.save(carro);
                    return ResponseEntity.ok(updatedCarro);
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletar(@PathVariable Long id) {
        return carroRepository.findById(id)
                .map(carro -> {
                    carroRepository.delete(carro);
                    return ResponseEntity.noContent().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}