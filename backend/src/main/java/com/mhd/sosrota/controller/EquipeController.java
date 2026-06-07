package com.mhd.sosrota.controller;

import com.mhd.sosrota.model.dto.equipe.EquipeCadastroDTO;
import com.mhd.sosrota.model.dto.equipe.EquipeExibicaoDTO;
import com.mhd.sosrota.service.EquipeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Hartur Sales Xavier <hartursalesxavier@gmail.com>
 * @date 06/06/2026
 * @brief Controller de equipes
 */
@RestController
@RequestMapping("api/equipes")
public class EquipeController {

    private final EquipeService equipeService;

    public EquipeController(EquipeService equipeService) {
        this.equipeService = equipeService;
    }

    @PostMapping
    public ResponseEntity<EquipeExibicaoDTO> criar(@RequestBody @Valid EquipeCadastroDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new EquipeExibicaoDTO(equipeService.salvar(dto)));
    }

    @GetMapping
    public ResponseEntity<List<EquipeExibicaoDTO>> listar() {
        return ResponseEntity.ok(
                equipeService.findAll().stream().map(EquipeExibicaoDTO::new).toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EquipeExibicaoDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(new EquipeExibicaoDTO(equipeService.findById(id)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EquipeExibicaoDTO> atualizar(
            @PathVariable Long id,
            @RequestBody @Valid EquipeCadastroDTO dto) {
        return ResponseEntity.ok(new EquipeExibicaoDTO(equipeService.atualizar(id, dto)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        equipeService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}