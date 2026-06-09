package com.mhd.sosrota.model.dto.ocorrencia;

import jakarta.validation.constraints.NotBlank;

/**
 * @author Hartur Sales <hartursalesxavier@gmail.com>
 * @date 04/06/2026
 * @brief DTO para cancelamento de ocorrência com justificativa
 */
public record OcorrenciaCancelamentoDTO(
        @NotBlank(message = "A justificativa do cancelamento é obrigatória")
        String justificativa
) {
}