package com.mhd.sosrota.controller;

import com.mhd.sosrota.model.dto.ocorrencia.OcorrenciaCadastroDTO;
import com.mhd.sosrota.model.dto.ocorrencia.OcorrenciaCancelamentoDTO;
import com.mhd.sosrota.model.dto.ocorrencia.OcorrenciaExibicaoDTO;
import com.mhd.sosrota.service.OcorrenciaService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * @author Hartur Sales <hartursalesxavier@gmail.com>
 * @date 04/06/2026
 * @brief Controller de ocorrências
 */
@RestController
@RequestMapping("api/ocorrencias")
public class OcorrenciaController {

    private final OcorrenciaService ocorrenciaService;

    public OcorrenciaController(OcorrenciaService ocorrenciaService) {
        this.ocorrenciaService = ocorrenciaService;
    }

    @PostMapping
    public ResponseEntity<OcorrenciaExibicaoDTO> criar(@RequestBody @Valid OcorrenciaCadastroDTO dto) {
        var ocorrencia = ocorrenciaService.salvar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(new OcorrenciaExibicaoDTO(ocorrencia));
    }

    @GetMapping
    public ResponseEntity<Page<OcorrenciaExibicaoDTO>> listar(
            @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        return ResponseEntity.ok(ocorrenciaService.findAll(pageable).map(OcorrenciaExibicaoDTO::new));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OcorrenciaExibicaoDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(new OcorrenciaExibicaoDTO(ocorrenciaService.findById(id)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<OcorrenciaExibicaoDTO> atualizar(
            @PathVariable Long id,
            @RequestBody @Valid OcorrenciaCadastroDTO dto
    ) {
        return ResponseEntity.ok(new OcorrenciaExibicaoDTO(ocorrenciaService.atualizar(id, dto)));
    }

    @PatchMapping("/{id}/cancelar")
    public ResponseEntity<OcorrenciaExibicaoDTO> cancelar(
            @PathVariable Long id,
            @RequestBody @Valid OcorrenciaCancelamentoDTO dto
    ) {
        return ResponseEntity.ok(
                new OcorrenciaExibicaoDTO(ocorrenciaService.cancelar(id, dto.justificativa())));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        ocorrenciaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}