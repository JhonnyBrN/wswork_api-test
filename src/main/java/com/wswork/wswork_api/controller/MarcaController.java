package com.wswork.wswork_api.controller;

import com.wswork.wswork_api.entity.Marca;
import com.wswork.wswork_api.repository.MarcaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Define que esta classe é um Controller REST
@RequestMapping("/marcas") // O URL base para todos os endpoints neste controller será "/marcas"
@CrossOrigin(origins = "*") // Permite o acesso de qualquer origem (essencial para o frontend)
public class MarcaController {

    // O Spring injeta (nos dá) uma instância do repositório para usarmos
    @Autowired
    private MarcaRepository marcaRepository;

    /**
     * Endpoint para LISTAR todas as marcas.
     * Mapeado para: GET /marcas
     */
    @GetMapping
    public List<Marca> listarTodas() {
        return marcaRepository.findAll();
    }

    /**
     * Endpoint para CRIAR uma nova marca.
     * Mapeado para: POST /marcas
     * @param marca O corpo da requisição JSON será convertido para um objeto Marca.
     */
    @PostMapping
    public Marca criar(@RequestBody Marca marca) {
        return marcaRepository.save(marca);
    }
    
    /**
     * Endpoint para ATUALIZAR uma marca existente.
     * Mapeado para: PUT /marcas/{id}
     * @param id O ID da marca a ser atualizada, vindo da URL.
     * @param marcaDetails Os novos dados da marca, vindos do corpo da requisição.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Marca> atualizar(@PathVariable Long id, @RequestBody Marca marcaDetails) {
        // Tenta encontrar a marca pelo ID. Se encontrar, atualiza e salva.
        return marcaRepository.findById(id)
                .map(marca -> {
                    marca.setNome_marca(marcaDetails.getNome_marca());
                    Marca updatedMarca = marcaRepository.save(marca);
                    return ResponseEntity.ok(updatedMarca); // Retorna 200 OK com a marca atualizada
                })
                .orElse(ResponseEntity.notFound().build()); // Se não encontrar, retorna 404 Not Found
    }
    
    /**
     * Endpoint para DELETAR uma marca.
     * Mapeado para: DELETE /marcas/{id}
     * @param id O ID da marca a ser deletada, vindo da URL.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletar(@PathVariable Long id) {
        // Tenta encontrar a marca pelo ID. Se encontrar, deleta.
        return marcaRepository.findById(id)
                .map(marca -> {
                    marcaRepository.delete(marca);
                    return ResponseEntity.noContent().build(); // Retorna 204 No Content (sucesso sem corpo)
                })
                .orElse(ResponseEntity.notFound().build()); // Se não encontrar, retorna 404 Not Found
    }
}