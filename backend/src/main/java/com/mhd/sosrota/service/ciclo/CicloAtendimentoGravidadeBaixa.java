package com.mhd.sosrota.service.ciclo;

import org.springframework.stereotype.Component;

/**
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @date 14/06/2026
 * @brief Class CicloAtendimentoGravidadeBaixa
 */
//template pra atendimentos de gravidade baixa
@Component("ciclo_BAIXA")
public class CicloAtendimentoGravidadeBaixa extends CicloAtendimentoTemplate {
    @Override
    public double calcularTempoAtendimento() {
        // Gravidade baixa leva 10 minutos pra fazer o atendimento
        return 10;
    }
}
