package com.mhd.sosrota.controller;

import com.mhd.sosrota.model.dto.ambulancia.AmbulanciaCadastroDTO;
import com.mhd.sosrota.model.dto.ambulancia.AmbulanciaExibicaoDTO;
import com.mhd.sosrota.service.AmbulanciaService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @author Hartur Sales Xavier <hartursalesxavier@gmail.com>
 * @date 04/06/2026
 * @brief Controller de ambulâncias
 */
@RestController
@RequestMapping("api/ambulancias")
public class AmbulanciaController {

    private final AmbulanciaService ambulanciaService;

    public AmbulanciaController(AmbulanciaService ambulanciaService) {
        this.ambulanciaService = ambulanciaService;
    }

    @PostMapping
    public ResponseEntity<AmbulanciaExibicaoDTO> criar(
            @RequestBody @Valid AmbulanciaCadastroDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new AmbulanciaExibicaoDTO(ambulanciaService.salvar(dto)));
    }

    @GetMapping
    public ResponseEntity<Page<AmbulanciaExibicaoDTO>> listar(
            @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(
                ambulanciaService.findAll(pageable).map(AmbulanciaExibicaoDTO::new));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AmbulanciaExibicaoDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(new AmbulanciaExibicaoDTO(ambulanciaService.findById(id)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AmbulanciaExibicaoDTO> atualizar(
            @PathVariable Long id,
            @RequestBody @Valid AmbulanciaCadastroDTO dto) {
        return ResponseEntity.ok(
                new AmbulanciaExibicaoDTO(ambulanciaService.atualizar(id, dto)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        ambulanciaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}