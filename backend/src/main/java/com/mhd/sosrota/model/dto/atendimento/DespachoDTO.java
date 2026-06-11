package com.mhd.sosrota.model.dto.atendimento;

import jakarta.validation.constraints.NotNull;

/**
 * @author Hartur Sales Xavier <hartursalesxavier@gmail.com>
 * @date 06/06/2026
 * @brief DTO para solicitar o despacho de uma ambulância
 */
public record DespachoDTO(
        @NotNull(message = "O id da ocorrência é obrigatório")
        Long ocorrenciaId,

        @NotNull(message = "O id da ambulância é obrigatório")
        Long ambulanciaId
) {}