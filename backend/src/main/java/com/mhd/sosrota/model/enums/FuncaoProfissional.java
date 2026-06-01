package com.mhd.sosrota.model.enums;

import java.util.Arrays;
import java.util.List;

/**
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @author Hartur Sales <hartursalesxavier@gmail.com>
 * @date 01/06/2026
 * @brief Enum Funcao
 */
public enum FuncaoProfissional {
    MEDICO("Médico"),
    ENFERMEIRO("Enfermeiro"),
    CONDUTOR("Condutor");

    private final String nome;

    FuncaoProfissional(String nome) {
        this.nome = nome;
    }

    public static FuncaoProfissional fromNome(String nome) {
        for (FuncaoProfissional funcao : FuncaoProfissional.values()) {
            if (funcao.getNome().equalsIgnoreCase(nome)) {
                return funcao;
            }
        }
        return null;
    }

    public static List<String> getNomes() {
        return Arrays.stream(FuncaoProfissional.values())
                .map(FuncaoProfissional::getNome)
                .toList();
    }


    public String getNome() {
        return nome;
    }
}
