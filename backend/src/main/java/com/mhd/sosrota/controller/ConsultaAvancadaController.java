package com.mhd.sosrota.controller;

import com.mhd.sosrota.model.dto.atendimento.AtendimentoExibicaoDTO;
import com.mhd.sosrota.model.dto.consulta.ConsultaFiltroDTO;
import com.mhd.sosrota.service.ConsultaAvancadaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Hartur Sales Xavier <hartursalesxavier@gmail.com>
 * @date 07/06/2026
 * @brief Controller de consulta avançada
 */
@RestController
@RequestMapping("api/consulta")
public class ConsultaAvancadaController {

    private final ConsultaAvancadaService consultaAvancadaService;

    public ConsultaAvancadaController(ConsultaAvancadaService consultaAvancadaService) {
        this.consultaAvancadaService = consultaAvancadaService;
    }

    @PostMapping
    public ResponseEntity<List<AtendimentoExibicaoDTO>> consultar(
            @RequestBody ConsultaFiltroDTO filtro) {
        var resultado = consultaAvancadaService.consultar(filtro)
                .stream().map(AtendimentoExibicaoDTO::new).toList();
        return ResponseEntity.ok(resultado);
    }
}