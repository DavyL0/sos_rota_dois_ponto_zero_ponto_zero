package com.mhd.sosrota.service.ciclo;

import org.springframework.stereotype.Component;

/**
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @date 14/06/2026
 * @brief Class CicloAtendimentoGravidadeMedia
 */
//template pra atendimentos de gravidade media
@Component("ciclo_MEDIA")
public class CicloAtendimentoGravidadeMedia extends CicloAtendimentoTemplate {
    @Override
    public double calcularTempoAtendimento() {
        // Gravidade média leva 25 minutos pra fazer o atendimento
        return 25;
    }
}
