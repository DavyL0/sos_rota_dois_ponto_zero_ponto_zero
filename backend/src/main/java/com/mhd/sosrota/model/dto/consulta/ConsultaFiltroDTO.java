package com.mhd.sosrota.model.dto.consulta;

import com.mhd.sosrota.model.enums.GravidadeOcorrencia;
import com.mhd.sosrota.model.enums.StatusOcorrencia;

public record ConsultaFiltroDTO(
        GravidadeOcorrencia gravidade,
        String bairro,
        StatusOcorrencia status
) {
}
