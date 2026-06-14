package com.mhd.sosrota.consulta;

import com.mhd.sosrota.model.Atendimento;

import java.util.List;

/**
 * @author Hartur Sales Xavier <hartursalesxavier@gmail.com>
 * @date 07/06/2026
 * @brief Decorator abstrato — delega para o filtro interno.
 */
public abstract class FiltroDecorator implements FiltroAtendimento {
    //decorator para os diversos tipos de filtro
    protected final FiltroAtendimento filtroInterno;

    protected FiltroDecorator(FiltroAtendimento filtroInterno) {
        this.filtroInterno = filtroInterno;
    }

    @Override
    public List<Atendimento> filtrar() {
        return filtroInterno.filtrar();
    }
}