package com.mhd.sosrota.model.dto.ocorrencia;

import com.mhd.sosrota.model.Ocorrencia;
import com.mhd.sosrota.model.dto.bairro.BairroDTO;
import com.mhd.sosrota.model.enums.GravidadeOcorrencia;
import com.mhd.sosrota.model.enums.StatusOcorrencia;

import java.time.OffsetDateTime;

/**
 * @author Hartur Sales <hartursalesxavier@gmail.com>
 * @date 04/06/2026
 * @brief DTO para exibição de ocorrência
 */
public record OcorrenciaExibicaoDTO(
        Long id,
        String tipoOcorrencia,
        GravidadeOcorrencia gravidadeOcorrencia,
        StatusOcorrencia statusOcorrencia,
        BairroDTO bairro,
        OffsetDateTime dataHoraAbertura,
        OffsetDateTime limiteSLA,
        Long slaFinal,
        String observacao
) {
    public OcorrenciaExibicaoDTO(Ocorrencia o) {
        this(
                o.getId(),
                o.getTipoOcorrencia(),
                o.getGravidadeOcorrencia(),
                o.getStatusOcorrencia(),
                new BairroDTO(o.getBairro().getId(), o.getBairro().getNome()),
                o.getDataHoraAbertura(),
                o.getLimiteSLA(),
                o.getSlaFinal() != null ? o.getSlaFinal().getSeconds() : null,
                o.getObservacao()
        );
    }
}