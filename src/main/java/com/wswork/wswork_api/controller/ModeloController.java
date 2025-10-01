package com.wswork.wswork_api.controller;

import com.wswork.wswork_api.entity.Modelo;
import com.wswork.wswork_api.repository.ModeloRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Define que esta classe é um Controller REST
@RequestMapping("/modelos") // O URL base para todos os endpoints neste controller será "/modelos"
@CrossOrigin(origins = "*") // Permite o acesso de qualquer origem (essencial para o frontend)
public class ModeloController {

    // O Spring injeta (nos dá) uma instância do repositório para usarmos
    @Autowired
    private ModeloRepository modeloRepository;

    /**
     * Endpoint para LISTAR todos os modelos.
     * Mapeado para: GET /modelos
     */
    @GetMapping
    public List<Modelo> listarTodos() {
        return modeloRepository.findAll();
    }

    /**
     * Endpoint para CRIAR um novo modelo.
     * Mapeado para: POST /modelos
     * O corpo da requisição JSON deve incluir a marca associada.
     * Exemplo de JSON: { "nome": "ONIX", "valor_fipe": 50000.0, "marca": { "id": 1 } }
     */
    @PostMapping
    public Modelo criar(@RequestBody Modelo modelo) {
        return modeloRepository.save(modelo);
    }
    
    /**
     * Endpoint para ATUALIZAR um modelo existente.
     * Mapeado para: PUT /modelos/{id}
     * @param id O ID do modelo a ser atualizado, vindo da URL.
     * @param modeloDetails Os novos dados do modelo, vindos do corpo da requisição.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Modelo> atualizar(@PathVariable Long id, @RequestBody Modelo modeloDetails) {
        // Tenta encontrar o modelo pelo ID. Se encontrar, atualiza e salva.
        return modeloRepository.findById(id)
                .map(modelo -> {
                    modelo.setNome(modeloDetails.getNome());
                    modelo.setValor_fipe(modeloDetails.getValor_fipe());
                    modelo.setMarca(modeloDetails.getMarca());
                    Modelo updatedModelo = modeloRepository.save(modelo);
                    return ResponseEntity.ok(updatedModelo); // Retorna 200 OK com o modelo atualizado
                })
                .orElse(ResponseEntity.notFound().build()); // Se não encontrar, retorna 404 Not Found
    }

    /**
     * Endpoint para DELETAR um modelo.
     * Mapeado para: DELETE /modelos/{id}
     * @param id O ID do modelo a ser deletado, vindo da URL.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletar(@PathVariable Long id) {
        // Tenta encontrar o modelo pelo ID. Se encontrar, deleta.
        return modeloRepository.findById(id)
                .map(modelo -> {
                    modeloRepository.delete(modelo);
                    return ResponseEntity.noContent().build(); // Retorna 204 No Content (sucesso sem corpo)
                })
                .orElse(ResponseEntity.notFound().build()); // Se não encontrar, retorna 404 Not Found
    }
}