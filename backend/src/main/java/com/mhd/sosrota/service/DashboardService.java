package com.mhd.sosrota.service;

import com.mhd.sosrota.adapter.RelatorioAdapter;
import com.mhd.sosrota.model.dto.dashboard.DashboardDTO;
import com.mhd.sosrota.model.enums.GravidadeOcorrencia;
import com.mhd.sosrota.model.enums.StatusAmbulancia;
import com.mhd.sosrota.model.enums.StatusOcorrencia;
import com.mhd.sosrota.repository.AtendimentoRepository;
import com.mhd.sosrota.repository.OcorrenciaRepository;
import com.mhd.sosrota.repository.AmbulanciaRepository;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * @author Hartur Sales Xavier <hartursalesxavier@gmail.com>
 * @date 08/06/2026
 * @brief Service do dashboard
 */
@Service
public class DashboardService {

    private final OcorrenciaRepository ocorrenciaRepository;
    private final AmbulanciaRepository ambulanciaRepository;
    private final AtendimentoRepository atendimentoRepository;

    public DashboardService(OcorrenciaRepository ocorrenciaRepository,
                            AmbulanciaRepository ambulanciaRepository,
                            AtendimentoRepository atendimentoRepository) {
        this.ocorrenciaRepository = ocorrenciaRepository;
        this.ambulanciaRepository = ambulanciaRepository;
        this.atendimentoRepository = atendimentoRepository;
    }

    public DashboardDTO gerarDashboard() {
        long abertas = ocorrenciaRepository
                .findByStatusOcorrencia(StatusOcorrencia.ABERTA).size();
        long despachadas = ocorrenciaRepository
                .findByStatusOcorrencia(StatusOcorrencia.DESPACHADA).size();
        long emAtendimento = ocorrenciaRepository
                .findByStatusOcorrencia(StatusOcorrencia.EM_ATENDIMENTO).size();
        long disponiveis = ambulanciaRepository
                .findByStatus(StatusAmbulancia.DISPONIVEL).size();

        Map<String, Long> porBairro = RelatorioAdapter
                .adaptarAtendimentosPorBairro(atendimentoRepository.countAtendimentosByBairro());

        Map<GravidadeOcorrencia, Double> bruto = new LinkedHashMap<>();
        for (GravidadeOcorrencia g : GravidadeOcorrencia.values()) {
            bruto.put(g, atendimentoRepository.calculateTempoMedioRespostaByGravidade(g));
        }
        Map<GravidadeOcorrencia, Double> tempoMedio =
                RelatorioAdapter.adaptarTempoMedioPorGravidade(bruto);

        Map<String, Double> tempoMedioStr = new LinkedHashMap<>();
        tempoMedio.forEach((k, v) -> tempoMedioStr.put(k.getDescricao(), v));

        return new DashboardDTO(
                abertas, despachadas, emAtendimento, disponiveis,
                porBairro, tempoMedioStr);
    }
}