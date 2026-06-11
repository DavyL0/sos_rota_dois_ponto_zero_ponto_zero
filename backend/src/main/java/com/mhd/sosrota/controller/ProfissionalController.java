package com.mhd.sosrota.controller;

import com.mhd.sosrota.model.dto.profissional.ProfissionalCadastroDTO;
import com.mhd.sosrota.model.dto.profissional.ProfissionalExibicaoDTO;
import com.mhd.sosrota.model.enums.FuncaoProfissional;
import com.mhd.sosrota.service.ProfissionalService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Hartur Sales Xavier <hartursalesxavier@gmail.com>
 * @date 05/06/2026
 * @brief Controller de profissionais
 */
@RestController
@RequestMapping("api/profissionais")
public class ProfissionalController {

    private final ProfissionalService profissionalService;

    public ProfissionalController(ProfissionalService profissionalService) {
        this.profissionalService = profissionalService;
    }

    @PostMapping
    public ResponseEntity<ProfissionalExibicaoDTO> criar(
            @RequestBody @Valid ProfissionalCadastroDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ProfissionalExibicaoDTO(profissionalService.salvar(dto)));
    }

    @GetMapping
    public ResponseEntity<List<ProfissionalExibicaoDTO>> listar(
            @RequestParam(required = false) FuncaoProfissional funcao) {
        var lista = funcao != null
                ? profissionalService.findByFuncao(funcao)
                : profissionalService.findAll();
        return ResponseEntity.ok(lista.stream().map(ProfissionalExibicaoDTO::new).toList());
    }

    @GetMapping("/disponiveis")
    public ResponseEntity<List<ProfissionalExibicaoDTO>> listarDisponiveis() {
        return ResponseEntity.ok(
                profissionalService.findDisponiveis()
                        .stream().map(ProfissionalExibicaoDTO::new).toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfissionalExibicaoDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(new ProfissionalExibicaoDTO(profissionalService.findById(id)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProfissionalExibicaoDTO> atualizar(
            @PathVariable Long id,
            @RequestBody @Valid ProfissionalCadastroDTO dto) {
        return ResponseEntity.ok(
                new ProfissionalExibicaoDTO(profissionalService.atualizar(id, dto)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        profissionalService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}