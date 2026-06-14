package com.mhd.sosrota.service.ciclo;

import com.mhd.sosrota.service.AtendimentoService;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

/**
 * @author Hartur Sales Xavier <hartursalesxavier@gmail.com>
 * @date 06/06/2026
 * @brief Classe abstrata que define o esqueleto do ciclo de atendimento.
 */
//template method para simular a realizacao do atendimento por gravidade da ocorrencia
public abstract class CicloAtendimentoTemplate {
    public final long FATOR_CONVERSAO = 10;

    // Esse scheduler agenda as tarefas no background
    protected final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(4);

    public final void executarCiclo(Long atendimentoId, double distanciaKm, AtendimentoService atendimentoService) {
        double tempoViagem = calcularTempoViagem(distanciaKm);
        double tempoAtendimento = calcularTempoAtendimento();

        agendarChegada(atendimentoId, tempoViagem, atendimentoService);
        agendarConclusao(atendimentoId, tempoViagem + tempoAtendimento, atendimentoService);
        agendarRetorno(atendimentoId, (tempoViagem * 2) + tempoAtendimento, atendimentoService);
    }

    public double calcularTempoViagem(double distanciaKm) {
        return distanciaKm;
    }

    public abstract double calcularTempoAtendimento();

    protected void agendarChegada(Long atendimentoId, double tempoAcumulado, AtendimentoService atendimentoService) {
        long tempoSimulado = (long) (tempoAcumulado * FATOR_CONVERSAO);
        scheduler.schedule(() -> {
            System.out.println("Ambulância chegou ao local. Ocorrência EM_ATENDIMENTO");
            atendimentoService.registrarChegada(atendimentoId);
        }, tempoSimulado, TimeUnit.SECONDS);
    }

    protected void agendarConclusao(Long atendimentoId, double tempoAcumulado, AtendimentoService atendimentoService) {
        long tempoSimulado = (long) (tempoAcumulado * FATOR_CONVERSAO);
        scheduler.schedule(() -> {
            System.out.println("Ambulância terminou o atendimento. Ocorrência CONCLUIDA");
            atendimentoService.registrarConclusao(atendimentoId);
        }, tempoSimulado, TimeUnit.SECONDS);
    }

    protected void agendarRetorno(Long atendimentoId, double tempoAcumulado, AtendimentoService atendimentoService) {
        long tempoSimulado = (long) (tempoAcumulado * FATOR_CONVERSAO);
        scheduler.schedule(() -> {
            System.out.println("Ambulância de volta à base e disponivel");
            atendimentoService.registrarRetorno(atendimentoId);
        }, tempoSimulado, TimeUnit.SECONDS);
    }
}