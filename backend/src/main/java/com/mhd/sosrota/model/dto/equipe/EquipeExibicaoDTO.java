package com.mhd.sosrota.model.dto.equipe;

import com.mhd.sosrota.model.Equipe;
import com.mhd.sosrota.model.dto.ambulancia.AmbulanciaExibicaoDTO;
import com.mhd.sosrota.model.dto.profissional.ProfissionalExibicaoDTO;

import java.util.List;

/**
 * @author Hartur Sales Xavier <hartursalesxavier@gmail.com>
 * @date 06/06/2026
 * @brief DTO para exibição de equipe
 */
public record EquipeExibicaoDTO(
        Long id,
        AmbulanciaExibicaoDTO ambulancia,
        boolean ativo,
        List<ProfissionalExibicaoDTO> profissionais
) {
    public EquipeExibicaoDTO(Equipe e) {
        this(
                e.getId(),
                new AmbulanciaExibicaoDTO(e.getAmbulancia()),
                e.isAtivo(),
                e.getProfissionais().stream().map(ProfissionalExibicaoDTO::new).toList()
        );
    }
}