package com.mhd.sosrota.service;

import com.mhd.sosrota.model.Atendimento;
import com.mhd.sosrota.model.Bairro;
import com.mhd.sosrota.model.dto.atendimento.OpcaoDespachoDTO;
import com.mhd.sosrota.model.enums.GravidadeOcorrencia;
import com.mhd.sosrota.model.enums.StatusAmbulancia;
import com.mhd.sosrota.model.enums.StatusOcorrencia;
import com.mhd.sosrota.model.enums.TipoAmbulancia;
import com.mhd.sosrota.repository.AtendimentoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

/**
 * @author Hartur Sales Xavier <hartursalesxavier@gmail.com>
 * @date 06/06/2026
 * @brief Service de atendimento e despacho — RF03
 */
@Service
public class AtendimentoService {

    private static final double VELOCIDADE_KMH = 60.0;

    private final OcorrenciaService ocorrenciaService;
    private final AmbulanciaService ambulanciaService;
    private final AtendimentoRepository atendimentoRepository;
    private final GrafoCidadeService grafoCidadeService;

    public AtendimentoService(OcorrenciaService ocorrenciaService,
                              AmbulanciaService ambulanciaService,
                              AtendimentoRepository atendimentoRepository,
                              GrafoCidadeService grafoCidadeService) {
        this.ocorrenciaService = ocorrenciaService;
        this.ambulanciaService = ambulanciaService;
        this.atendimentoRepository = atendimentoRepository;
        this.grafoCidadeService = grafoCidadeService;
    }

    public List<OpcaoDespachoDTO> buscarOpcoesDeDespacho(Long ocorrenciaId) {
        var ocorrencia = ocorrenciaService.findById(ocorrenciaId);
        Bairro localOcorrencia = ocorrencia.getBairro();
        Map<Bairro, Double> distancias = grafoCidadeService.obterGrafo()
                .calcularDistanciasParaTodos(localOcorrencia);

        var ambulanciasDisponiveis = ambulanciaService.findByStatus(StatusAmbulancia.DISPONIVEL);
        List<OpcaoDespachoDTO> opcoes = new ArrayList<>();

        for (var amb : ambulanciasDisponiveis) {
            if (ocorrencia.getGravidadeOcorrencia() == GravidadeOcorrencia.ALTA
                    && amb.getTipoAmbulancia() != TipoAmbulancia.UTI) {
                continue;
            }
            Double distKm = distancias.get(amb.getBairroBase());
            if (distKm != null && distKm != Double.POSITIVE_INFINITY) {
                double tempoMin = (distKm / VELOCIDADE_KMH) * 60.0;
                opcoes.add(new OpcaoDespachoDTO(
                        new com.mhd.sosrota.model.dto.ambulancia.AmbulanciaExibicaoDTO(amb),
                        distKm,
                        tempoMin));
            }
        }
        opcoes.sort(Comparator.comparingDouble(OpcaoDespachoDTO::tempoEstimadoMin));
        return opcoes;
    }

    @Transactional
    public Atendimento realizarDespacho(Long ocorrenciaId, Long ambulanciaId) {
        var ocorrencia = ocorrenciaService.findById(ocorrenciaId);
        var ambulancia = ambulanciaService.findById(ambulanciaId);

        if (ocorrencia.getStatusOcorrencia() != StatusOcorrencia.ABERTA) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Só é possível despachar ocorrências abertas");
        }
        if (ambulancia.getStatus() != StatusAmbulancia.DISPONIVEL) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Só é possível despachar ambulâncias disponíveis");
        }

        Bairro localOcorrencia = ocorrencia.getBairro();
        Map<Bairro, Double> distancias = grafoCidadeService.obterGrafo()
                .calcularDistanciasParaTodos(localOcorrencia);
        Double distanciaKm = distancias.getOrDefault(ambulancia.getBairroBase(), 0.0);

        ocorrencia.setStatusOcorrencia(StatusOcorrencia.DESPACHADA);
        ocorrencia.setSlaFinal(OcorrenciaService.calcularSLAFinal(ocorrencia.getLimiteSLA()));
        ambulancia.setStatus(StatusAmbulancia.EM_ATENDIMENTO);

        var atendimento = new Atendimento(ocorrencia, ambulancia, distanciaKm);
        return atendimentoRepository.save(atendimento);
    }

    public Atendimento findByOcorrencia(Long ocorrenciaId) {
        return atendimentoRepository.findByOcorrenciaId(ocorrenciaId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Atendimento não encontrado para esta ocorrência"));
    }
}