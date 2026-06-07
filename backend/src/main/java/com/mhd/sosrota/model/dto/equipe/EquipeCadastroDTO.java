package com.mhd.sosrota.model.dto.equipe;

import jakarta.validation.constraints.NotNull;
import java.util.List;

/**
 * @author Hartur Sales Xavier <hartursalesxavier@gmail.com>
 * @date 06/06/2026
 * @brief DTO para cadastro de equipe
 */
public record EquipeCadastroDTO(
        @NotNull(message = "A ambulância é obrigatória")
        Long ambulanciaId,

        @NotNull(message = "A lista de profissionais é obrigatória")
        List<Long> profissionalIds,

        boolean ativo
) {}