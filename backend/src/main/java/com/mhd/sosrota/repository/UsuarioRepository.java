package com.mhd.sosrota.repository;

import com.mhd.sosrota.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @date 01/06/2026
 * @brief Interface UsuarioRepository
 */
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByUsername(String username);
}
