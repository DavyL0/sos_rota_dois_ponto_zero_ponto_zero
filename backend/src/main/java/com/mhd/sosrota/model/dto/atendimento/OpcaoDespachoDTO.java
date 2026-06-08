package com.mhd.sosrota.model.dto.atendimento;

import com.mhd.sosrota.model.dto.ambulancia.AmbulanciaExibicaoDTO;

/**
 * @author Hartur Sales Xavier <hartursalesxavier@gmail.com>
 * @date 06/06/2026
 * @brief DTO para exibir opções de despacho ordenadas por tempo
 */
public record OpcaoDespachoDTO(
        AmbulanciaExibicaoDTO ambulancia,
        double distanciaKm,
        double tempoEstimadoMin
) {}