package com.mhd.sosrota.service.ciclo;

/**
 * @author Hartur Sales Xavier <hartursalesxavier@gmail.com>
 * @date 06/06/2026
 * @brief Classe abstrata que define o esqueleto do ciclo de atendimento.
 */
public abstract class CicloAtendimentoTemplate {
    public final void executarCiclo(Long atendimentoId, double distanciaKm) {
        double tempoViagem = calcularTempoViagem(distanciaKm);
        double tempoAtendimento = calcularTempoAtendimento();

        agendarChegada(atendimentoId, tempoViagem);
        agendarConclusao(atendimentoId, tempoViagem + tempoAtendimento);
        agendarRetorno(atendimentoId, (tempoViagem * 2) + tempoAtendimento);
    }

    protected abstract double calcularTempoViagem(double distanciaKm);

    protected abstract double calcularTempoAtendimento();

    protected abstract void agendarChegada(Long atendimentoId, double delaySegundos);

    protected abstract void agendarConclusao(Long atendimentoId, double delaySegundos);

    protected abstract void agendarRetorno(Long atendimentoId, double delaySegundos);
}