package com.mhd.sosrota.consulta;

import com.mhd.sosrota.model.Atendimento;

import java.util.List;

/**
 * @author Hartur Sales Xavier <hartursalesxavier@gmail.com>
 * @date 07/06/2026
 * @brief Componente concreto base do Decorator — retorna a lista sem filtros.
 */
public class FiltroBase implements FiltroAtendimento {
    private final List<Atendimento> atendimentos;

    public FiltroBase(List<Atendimento> atendimentos) {
        this.atendimentos = atendimentos;
    }

    @Override
    public List<Atendimento> filtrar() {
        return atendimentos;
    }
}