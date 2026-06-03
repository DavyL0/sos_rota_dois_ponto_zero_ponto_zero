package com.mhd.sosrota.controller;

import com.mhd.sosrota.model.dto.ambulancia.AmbulanciaExibicaoDTO;
import com.mhd.sosrota.service.AmbulanciaService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @date 02/06/2026
 * @brief Class AmbulanciaController
 */
@RestController
@RequestMapping("api/ambulancias")
public class AmbulanciaController {
    private final AmbulanciaService ambulanciaService;

    public AmbulanciaController(AmbulanciaService ambulanciaService) {
        this.ambulanciaService = ambulanciaService;
    }

    @GetMapping
    public ResponseEntity<Page<AmbulanciaExibicaoDTO>> listarAmbulancias(
            @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable paginacao,
            @RequestParam(required = false) String filtro
    ) {
        Page<AmbulanciaExibicaoDTO> ambulancias = ambulanciaService.findAll(paginacao, filtro).map(AmbulanciaExibicaoDTO::new);
        return ResponseEntity.ok(ambulancias);
    }
}
