package com.mhd.sosrota.consulta;

import com.mhd.sosrota.model.Atendimento;
import com.mhd.sosrota.model.enums.StatusOcorrencia;

import java.util.List;

public class FiltroPorStatus extends FiltroDecorator {
    private final StatusOcorrencia status;

    public FiltroPorStatus(FiltroAtendimento filtroInterno, StatusOcorrencia status) {
        super(filtroInterno);
        this.status = status;
    }

    @Override
    public List<Atendimento> filtrar() {
        return filtroInterno.filtrar().stream()
                .filter(a -> a.getOcorrencia().getStatusOcorrencia() == status)
                .toList();
    }
}