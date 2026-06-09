package com.mhd.sosrota.controller;

import com.mhd.sosrota.model.dto.equipe.EquipeCadastroDTO;
import com.mhd.sosrota.model.dto.equipe.EquipeExibicaoDTO;
import com.mhd.sosrota.model.enums.TipoAmbulancia;
import com.mhd.sosrota.service.EquipeService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Page<EquipeExibicaoDTO>> listar(
            @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable paginacao,
            @RequestParam(required = false) String filtro,
            @RequestParam(required = false) Boolean ativo,
            @RequestParam(required = false) TipoAmbulancia tipo
    ) {
        return ResponseEntity.ok(equipeService.findAll(paginacao, filtro, ativo, tipo).map(EquipeExibicaoDTO::new));
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