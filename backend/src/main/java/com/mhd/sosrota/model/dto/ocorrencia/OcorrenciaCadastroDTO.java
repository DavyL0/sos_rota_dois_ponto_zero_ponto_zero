package com.mhd.sosrota.model.dto.ocorrencia;

import com.mhd.sosrota.model.enums.GravidadeOcorrencia;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * @author Hartur Sales <hartursalesxavier@gmail.com>
 * @date 04/06/2026
 * @brief DTO para cadastro de ocorrência
 */
public record OcorrenciaCadastroDTO(
        @NotBlank(message = "O tipo da ocorrência é obrigatório")
        @Size(max = 50, message = "O tipo da ocorrência deve ter no máximo 50 caracteres")
        String tipoOcorrencia,

        @NotNull(message = "A gravidade da ocorrência é obrigatória")
        GravidadeOcorrencia gravidadeOcorrencia,

        @NotNull(message = "O bairro da ocorrência é obrigatório")
        Long bairroId,

        String observacao
) {}