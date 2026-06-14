package com.mhd.sosrota.util;

import com.mhd.sosrota.model.Profissional;
import com.mhd.sosrota.model.enums.FuncaoProfissional;

import java.util.Iterator;
import java.util.List;
import java.util.NoSuchElementException;

/**
 * @author Hartur Sales Xavier <hartursalesxavier@gmail.com>
 * @date 05/06/2026
 * @brief Iterador de profissionais filtrado por função.
 */
public class ProfissionalIterator implements Iterator<Profissional> {
    //iterator para obter profissionais filtrados por funcao
    private final List<Profissional> profissionais;
    private final FuncaoProfissional filtroFuncao;
    private int cursor = 0;
    private Profissional proximo = null;

    public ProfissionalIterator(List<Profissional> profissionais, FuncaoProfissional filtroFuncao) {
        this.profissionais = profissionais;
        this.filtroFuncao = filtroFuncao;
        avancar();
    }

    public ProfissionalIterator(List<Profissional> profissionais) {
        this(profissionais, null);
    }

    private void avancar() {
        proximo = null;
        while (cursor < profissionais.size()) {
            Profissional candidato = profissionais.get(cursor++);
            if (filtroFuncao == null || candidato.getFuncaoProfissional() == filtroFuncao) {
                proximo = candidato;
                break;
            }
        }
    }

    @Override
    public boolean hasNext() {
        return proximo != null;
    }

    @Override
    public Profissional next() {
        if (!hasNext()) throw new NoSuchElementException();
        Profissional atual = proximo;
        avancar();
        return atual;
    }
}