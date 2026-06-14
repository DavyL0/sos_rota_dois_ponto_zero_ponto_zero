package com.mhd.sosrota.service.ciclo;

import org.springframework.stereotype.Component;

/**
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @date 14/06/2026
 * @brief Class CicloAtendimentoGravidadeAlta
 */
//template pra atendimentos de gravidade alta
@Component("ciclo_ALTA")
public class CicloAtendimentoGravidadeAlta extends CicloAtendimentoTemplate {

    @Override
    public double calcularTempoAtendimento() {
        // Gravidade alta leva 40 minutos pra fazer o atendimento
        return 40;
    }
}
