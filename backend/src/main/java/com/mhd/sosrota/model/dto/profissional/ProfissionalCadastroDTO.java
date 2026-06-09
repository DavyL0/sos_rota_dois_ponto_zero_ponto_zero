package com.mhd.sosrota.model.dto.profissional;

import com.mhd.sosrota.model.enums.FuncaoProfissional;
import jakarta.validation.constraints.*;

/**
 * @author Hartur Sales Xavier <hartursalesxavier@gmail.com>
 * @date 05/06/2026
 * @brief DTO para cadastro de profissional
 */
public record ProfissionalCadastroDTO(
        @NotBlank(message = "O nome do profissional é obrigatório")
        @Size(max = 100, message = "O nome não pode ter mais de 100 caracteres")
        String nome,

        @NotNull(message = "A função é obrigatória")
        FuncaoProfissional funcao,

        @Email(message = "O e-mail informado não é válido")
        @Size(max = 50, message = "O e-mail não pode ter mais de 50 caracteres")
        String contato
) {}