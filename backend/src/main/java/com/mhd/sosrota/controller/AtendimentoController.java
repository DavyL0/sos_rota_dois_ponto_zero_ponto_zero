package com.mhd.sosrota.controller;

import com.mhd.sosrota.model.dto.atendimento.AtendimentoExibicaoDTO;
import com.mhd.sosrota.model.dto.atendimento.DespachoDTO;
import com.mhd.sosrota.model.dto.atendimento.OpcaoDespachoDTO;
import com.mhd.sosrota.service.AtendimentoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Hartur Sales Xavier <hartursalesxavier@gmail.com>
 * @date 06/06/2026
 * @brief Controller de atendimento/despacho
 */
@RestController
@RequestMapping("api/atendimentos")
public class AtendimentoController {

    private final AtendimentoService atendimentoService;

    public AtendimentoController(AtendimentoService atendimentoService) {
        this.atendimentoService = atendimentoService;
    }

    @GetMapping("/opcoes-despacho/{ocorrenciaId}")
    public ResponseEntity<List<OpcaoDespachoDTO>> opcoesDespacho(
            @PathVariable Long ocorrenciaId) {
        return ResponseEntity.ok(atendimentoService.buscarOpcoesDeDespacho(ocorrenciaId));
    }

    @PostMapping("/despachar")
    public ResponseEntity<AtendimentoExibicaoDTO> despachar(
            @RequestBody @Valid DespachoDTO dto) {
        var atendimento = atendimentoService.realizarDespacho(dto.ocorrenciaId(), dto.ambulanciaId());
        return ResponseEntity.status(HttpStatus.CREATED).body(new AtendimentoExibicaoDTO(atendimento));
    }

    @GetMapping("/ocorrencia/{ocorrenciaId}")
    public ResponseEntity<AtendimentoExibicaoDTO> buscarPorOcorrencia(
            @PathVariable Long ocorrenciaId) {
        return ResponseEntity.ok(
                new AtendimentoExibicaoDTO(atendimentoService.findByOcorrencia(ocorrenciaId)));
    }
}