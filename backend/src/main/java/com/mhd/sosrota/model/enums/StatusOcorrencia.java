package com.mhd.sosrota.model.enums;

/**
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @author Hartur Sales <hartursalesxavier@gmail.com>
 * @date 01/06/2026
 * @brief Enum StatusOcorrencia
 */
public enum StatusOcorrencia {
    ABERTA("Aberta"),
    DESPACHADA("Despachada"),
    EM_ATENDIMENTO("Em Atendimento"),
    CONCLUIDA("Concluída"),
    CANCELADA("Cancelada");

    private final String descricao;

    StatusOcorrencia(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
