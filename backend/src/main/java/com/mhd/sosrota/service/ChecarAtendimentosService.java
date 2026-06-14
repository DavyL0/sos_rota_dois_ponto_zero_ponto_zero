package com.mhd.sosrota.service;

import com.mhd.sosrota.model.Ambulancia;
import com.mhd.sosrota.model.Atendimento;
import com.mhd.sosrota.model.enums.StatusAmbulancia;
import com.mhd.sosrota.model.enums.StatusOcorrencia;
import com.mhd.sosrota.repository.AmbulanciaRepository;
import com.mhd.sosrota.repository.AtendimentoRepository;
import com.mhd.sosrota.service.ciclo.CicloAtendimentoTemplate;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

/**
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @date 14/06/2026
 * @brief Class ChecarAtendimentosService
 */
@Service
public class ChecarAtendimentosService {
    private final AtendimentoRepository atendimentoRepository;
    private final AmbulanciaRepository ambulanciaRepository;
    private final Map<String, CicloAtendimentoTemplate> ciclosDeAtendimento;
    private final AtendimentoService atendimentoService;
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(4);

    public ChecarAtendimentosService(AtendimentoRepository atendimentoRepository,
                                     AmbulanciaRepository ambulanciaRepository,
                                     Map<String, CicloAtendimentoTemplate> ciclosDeAtendimento,
                                     AtendimentoService atendimentoService) {
        this.atendimentoRepository = atendimentoRepository;
        this.ambulanciaRepository = ambulanciaRepository;
        this.ciclosDeAtendimento = ciclosDeAtendimento;
        this.atendimentoService = atendimentoService;
    }

    @EventListener(ApplicationReadyEvent.class)
    @Transactional
    public void verificarPendencias() {
        System.out.println("Verificando atendimentos pendentes...");
        var pendentes = atendimentoRepository.findAtendimentosPendentes();
        for (Atendimento pendente : pendentes) {
            tratarAtendimentosPendente(pendente);
        }

        var ambulanciasTravadas = ambulanciaRepository.findByStatus(StatusAmbulancia.EM_ATENDIMENTO);
        for (Ambulancia travada : ambulanciasTravadas) {
            Optional<Atendimento> ultimoAtendimento = atendimentoRepository
                    .findTopByAmbulanciaOrderByDataHoraDespachoDesc(travada);

            if (ultimoAtendimento.isPresent() && ultimoAtendimento.get().getDataHoraConclusao() != null) {
                travada.setStatus(StatusAmbulancia.DISPONIVEL);
                ambulanciaRepository.save(travada);
                System.out.println("Ambulância " + travada.getPlaca() + " destravada com sucesso.");
            }
        }
    }

    private void tratarAtendimentosPendente(Atendimento at) {
        var dataDespacho = at.getDataHoraDespacho();
        OffsetDateTime agora = OffsetDateTime.now(ZoneId.of("America/Sao_Paulo"));

        String chaveCiclo = "ciclo_" + at.getOcorrencia().getGravidadeOcorrencia().name();
        CicloAtendimentoTemplate ciclo = ciclosDeAtendimento.get(chaveCiclo);

        long tempoViagemReais = (long) (ciclo.calcularTempoViagem(at.getDistanciaKm()) * ciclo.FATOR_CONVERSAO);
        long tempoAtendimentoReais = (long) (ciclo.calcularTempoAtendimento() * ciclo.FATOR_CONVERSAO);

        OffsetDateTime horaChegada = dataDespacho.plusSeconds(tempoViagemReais);
        OffsetDateTime horaFimAtendimento = horaChegada.plusSeconds(tempoAtendimentoReais);
        OffsetDateTime horaRetornoBase = horaFimAtendimento.plusSeconds(tempoViagemReais);

        if (agora.isAfter(horaRetornoBase)) {
            at.setDataHoraChegada(horaChegada.toLocalDateTime());
            at.setDataHoraConclusao(horaFimAtendimento.toLocalDateTime());
            at.getOcorrencia().setStatusOcorrencia(StatusOcorrencia.CONCLUIDA);
            at.getAmbulancia().setStatus(StatusAmbulancia.DISPONIVEL);

            atendimentoRepository.save(at);
            System.out.println(">>> [Recovery] Atendimento " + at.getId() + " finalizado.");
        } else {
            // Se ainda está no meio do caminho, agenda o que falta ou resolve o que atrasou!
            long delayChegada = Duration.between(agora, horaChegada).getSeconds();
            long delayFimAtendimento = Duration.between(agora, horaFimAtendimento).getSeconds();
            long delayRetorno = Duration.between(agora, horaRetornoBase).getSeconds();

            // Se ainda não chegou na ocorrência, agendar chegada
            if (delayChegada > 0) {
                scheduler.schedule(() -> atendimentoService.registrarChegada(at.getId()), delayChegada, TimeUnit.SECONDS);
            } else if (at.getDataHoraChegada() == null) {
                // Se o tempo já passou enquanto o servidor caiu e a chegada ainda está vazia
                at.setDataHoraChegada(horaChegada.toLocalDateTime());
                at.getOcorrencia().setStatusOcorrencia(StatusOcorrencia.EM_ATENDIMENTO);
                atendimentoRepository.save(at);
                System.out.println(">>> [Recovery] Chegada do Atendimento " + at.getId() + " registrada retroativamente.");
            }

            // Se ainda não acabou o atendimento, agendar fim
            if (delayFimAtendimento > 0) {
                scheduler.schedule(() -> atendimentoService.registrarConclusao(at.getId()), delayFimAtendimento, TimeUnit.SECONDS);
            } else if (at.getDataHoraConclusao() == null) {
                at.setDataHoraConclusao(horaFimAtendimento.toLocalDateTime());
                at.getOcorrencia().setStatusOcorrencia(StatusOcorrencia.CONCLUIDA);
                atendimentoRepository.save(at);
                System.out.println(">>> [Recovery] Conclusão do Atendimento " + at.getId() + " registrada retroativamente.");
            }

            // O retorno sempre será agendado
            if (delayRetorno > 0) {
                scheduler.schedule(() -> atendimentoService.registrarRetorno(at.getId()), delayRetorno, TimeUnit.SECONDS);
            }

            System.out.println(">>> [Recovery] Atendimento " + at.getId() + " reagendado/recuperado parcialmente.");
        }
    }
}
