package com.mhd.sosrota.consulta;

import com.mhd.sosrota.model.Atendimento;
import com.mhd.sosrota.model.enums.GravidadeOcorrencia;

import java.util.List;

public class FiltroPorGravidade extends FiltroDecorator {
    private final GravidadeOcorrencia gravidade;

    public FiltroPorGravidade(FiltroAtendimento filtroInterno, GravidadeOcorrencia gravidade) {
        super(filtroInterno);
        this.gravidade = gravidade;
    }

    @Override
    public List<Atendimento> filtrar() {
        return filtroInterno.filtrar().stream()
                .filter(a -> a.getOcorrencia().getGravidadeOcorrencia() == gravidade)
                .toList();
    }
}