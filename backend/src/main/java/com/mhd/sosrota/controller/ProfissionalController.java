package com.mhd.sosrota.controller;

import com.mhd.sosrota.model.Profissional;
import com.mhd.sosrota.model.dto.profissional.ProfissionalCadastroDTO;
import com.mhd.sosrota.model.dto.profissional.ProfissionalExibicaoDTO;
import com.mhd.sosrota.model.enums.FuncaoProfissional;
import com.mhd.sosrota.service.ProfissionalService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
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
    public ResponseEntity<ProfissionalExibicaoDTO> criar(@RequestBody @Valid ProfissionalCadastroDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(new ProfissionalExibicaoDTO(profissionalService.salvar(dto)));
    }

    @GetMapping
    public ResponseEntity<Page<ProfissionalExibicaoDTO>> listar(
            @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable paginacao,
            @RequestParam(required = false) String filtro) {
//        var lista = funcao != null
//                ? profissionalService.findByFuncao(funcao)
//                : profissionalService.findAll(paginacao);
        return ResponseEntity.ok(profissionalService.findAll(paginacao, filtro).map(ProfissionalExibicaoDTO::new));
    }

    @GetMapping("/disponiveis")
    public ResponseEntity<List<ProfissionalExibicaoDTO>> listarDisponiveis(
            @RequestParam(required = false) Long equipeId,
            @RequestParam(required = false) FuncaoProfissional funcao
    ) {
        List<Profissional> disponiveis = profissionalService.findDisponiveis(equipeId, funcao);

        List<ProfissionalExibicaoDTO> dtos = disponiveis.stream()
                .map(ProfissionalExibicaoDTO::new)
                .toList();

        return ResponseEntity.ok(dtos);
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