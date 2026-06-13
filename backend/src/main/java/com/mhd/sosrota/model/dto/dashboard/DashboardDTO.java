package com.mhd.sosrota.model.dto.dashboard;

import java.util.Map;

/**
 * @author Hartur Sales Xavier <hartursalesxavier@gmail.com>
 * @date 08/06/2026
 * @brief DTO agregado para o dashboard
 */
public record DashboardDTO(
        long totalOcorrenciasAbertas,
        long totalOcorrenciasDespachadas,
        long totalOcorrenciasEmAtendimento,
        long totalAmbulanciasDisponiveis,
        Map<String, Long> atendimentosPorBairro,
        Map<String, Double> tempoMedioRespostaPorGravidade
) {}