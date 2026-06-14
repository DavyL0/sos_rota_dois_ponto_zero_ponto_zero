package com.mhd.sosrota.adapter;

import com.mhd.sosrota.model.enums.GravidadeOcorrencia;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * @author Hartur Sales Xavier <hartursalesxavier@gmail.com>
 * @date 05/06/2026
 * @brief Adapter que converte dados
 */
public class RelatorioAdapter {
    //adapter para obter os relatorios
    public static Map<String, Long> adaptarAtendimentosPorBairro(
            java.util.List<Object[]> dadosBrutos) {

        Map<String, Long> resultado = new LinkedHashMap<>();
        for (Object[] linha : dadosBrutos) {
            String bairro = (String) linha[0];
            Long qtd = ((Number) linha[1]).longValue();
            resultado.put(bairro, qtd);
        }
        return resultado;
    }

    public static Map<GravidadeOcorrencia, Double> adaptarTempoMedioPorGravidade(
            Map<GravidadeOcorrencia, Double> dadosEmSegundos) {

        Map<GravidadeOcorrencia, Double> resultado = new LinkedHashMap<>();
        for (Map.Entry<GravidadeOcorrencia, Double> entry : dadosEmSegundos.entrySet()) {
            if (entry.getValue() != null) {
                resultado.put(entry.getKey(), entry.getValue() / 60.0);
            }
        }
        return resultado;
    }
}