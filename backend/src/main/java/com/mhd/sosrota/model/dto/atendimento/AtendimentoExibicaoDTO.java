package com.mhd.sosrota.model.dto.atendimento;

import com.mhd.sosrota.model.Atendimento;
import com.mhd.sosrota.model.dto.ambulancia.AmbulanciaExibicaoDTO;
import com.mhd.sosrota.model.dto.ocorrencia.OcorrenciaExibicaoDTO;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;

/**
 * @author Hartur Sales Xavier <hartursalesxavier@gmail.com>
 * @date 06/06/2026
 * @brief DTO para exibição de atendimento
 */
public record AtendimentoExibicaoDTO(
        Long id,
        OcorrenciaExibicaoDTO ocorrencia,
        AmbulanciaExibicaoDTO ambulancia,
        OffsetDateTime dataHoraDespacho,
        LocalDateTime dataHoraChegada,
        LocalDateTime dataHoraConclusao,
        Double distanciaKm
) {
    public AtendimentoExibicaoDTO(Atendimento a) {
        this(
                a.getId(),
                new OcorrenciaExibicaoDTO(a.getOcorrencia()),
                new AmbulanciaExibicaoDTO(a.getAmbulancia()),
                a.getDataHoraDespacho(),
                a.getDataHoraChegada(),
                a.getDataHoraConclusao(),
                a.getDistanciaKm()
        );
    }
}