package com.mhd.sosrota.model.dto.profissional;

import com.mhd.sosrota.model.Profissional;
import com.mhd.sosrota.model.enums.FuncaoProfissional;

/**
 * @author Hartur Sales Xavier <hartursalesxavier@gmail.com>
 * @date 05/06/2026
 * @brief DTO para exibição de profissional
 */
public record ProfissionalExibicaoDTO(
        Long id,
        String nome,
        FuncaoProfissional funcao,
        String contato,
        boolean ativo,
        Long equipeId
) {
    public ProfissionalExibicaoDTO(Profissional p) {
        this(
                p.getId(),
                p.getNome(),
                p.getFuncaoProfissional(),
                p.getContato(),
                p.isAtivo(),
                p.getEquipe() != null ? p.getEquipe().getId() : null
        );
    }
}