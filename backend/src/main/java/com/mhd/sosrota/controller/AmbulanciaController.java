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
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @date 02/06/2026
 * @brief Class AmbulanciaController
 */
@RestController
@RequestMapping("/api/ambulancias")
public class AmbulanciaController {
    private final AmbulanciaService ambulanciaService;

    public AmbulanciaController(AmbulanciaService ambulanciaService) {
        this.ambulanciaService = ambulanciaService;
    }

    @PostMapping
    public ResponseEntity<AmbulanciaExibicaoDTO> salvar(@Valid @RequestBody AmbulanciaCadastroDTO ambulanciaDTO) {
        var novaAmbulancia = ambulanciaService.salvar(ambulanciaDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(new AmbulanciaExibicaoDTO(novaAmbulancia));
    }

    @GetMapping
    public ResponseEntity<Page<AmbulanciaExibicaoDTO>> listarAmbulancias(
            @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable paginacao,
            @RequestParam(required = false) String filtro
    ) {
        Page<AmbulanciaExibicaoDTO> ambulancias = ambulanciaService.findAll(paginacao, filtro).map(AmbulanciaExibicaoDTO::new);
        return ResponseEntity.ok(ambulancias);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AmbulanciaExibicaoDTO> atualizar(@PathVariable Long id, @Valid @RequestBody AmbulanciaCadastroDTO ambulanciaDTO) {
        var ambulancia = ambulanciaService.atualizar(id, ambulanciaDTO);
        return ResponseEntity.ok(new AmbulanciaExibicaoDTO(ambulancia));
    }

    @DeleteMapping("{/id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        ambulanciaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
