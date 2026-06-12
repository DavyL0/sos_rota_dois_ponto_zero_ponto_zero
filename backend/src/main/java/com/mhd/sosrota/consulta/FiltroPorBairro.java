package com.mhd.sosrota.consulta;

import com.mhd.sosrota.model.Atendimento;

import java.util.List;

public class FiltroPorBairro extends FiltroDecorator {
    private final String nomeBairro;

    public FiltroPorBairro(FiltroAtendimento filtroInterno, String nomeBairro) {
        super(filtroInterno);
        this.nomeBairro = nomeBairro;
    }

    @Override
    public List<Atendimento> filtrar() {
        return filtroInterno.filtrar().stream()
                .filter(a -> a.getOcorrencia().getBairro().getNome()
                        .equalsIgnoreCase(nomeBairro))
                .toList();
    }
}