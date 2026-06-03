package com.mhd.sosrota.service;

import com.mhd.sosrota.model.Ambulancia;
import com.mhd.sosrota.model.dto.ambulancia.AmbulanciaCadastroDTO;
import com.mhd.sosrota.model.enums.StatusAmbulancia;
import com.mhd.sosrota.repository.AmbulanciaRepository;
import com.mhd.sosrota.repository.AtendimentoRepository;
import com.mhd.sosrota.repository.BairroRepository;
import com.mhd.sosrota.repository.EquipeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

/**
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @date 02/06/2026
 * @brief Class AmbulanciaService
 */
@Service
public class AmbulanciaService {
    private final AmbulanciaRepository ambulanciaRepository;
    private final BairroRepository bairroRepository;
    private final EquipeRepository equipeRepository;
    private final AtendimentoRepository atendimentoRepository;

    public AmbulanciaService(AmbulanciaRepository ambulanciaRepository, BairroRepository bairroRepository, EquipeRepository equipeRepository, AtendimentoRepository atendimentoRepository) {
        this.ambulanciaRepository = ambulanciaRepository;
        this.bairroRepository = bairroRepository;
        this.equipeRepository = equipeRepository;
        this.atendimentoRepository = atendimentoRepository;
    }

    public Ambulancia salvar(AmbulanciaCadastroDTO ambulanciaDTO) {
        var placa = ambulanciaDTO.placa();
        if (ambulanciaRepository.existsByPlaca(placa)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Já existe uma ambulância cadastrada com essa placa");
        }
        var bairro = bairroRepository.findById(ambulanciaDTO.bairroId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "O bairro informado não existe")
        );

        var ambulancia = new Ambulancia();
        ambulancia.setPlaca(placa);
        ambulancia.setTipoAmbulancia(ambulanciaDTO.tipo());
        ambulancia.setStatus(StatusAmbulancia.INATIVA); //sempre iniciamos a ambulancia como inativa, pois ela se inicia sem equipe
        ambulancia.setBairroBase(bairro);

        return ambulanciaRepository.save(ambulancia);
    }

    public Ambulancia findById(Long id) {
        return ambulanciaRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ambulância não encontrada")
        );
    }

    public Page<Ambulancia> findAll(Pageable pageable, String filtro) {
        return ambulanciaRepository.obterComFiltro(pageable, filtro);
    }

    public Ambulancia atualizar(Long id, AmbulanciaCadastroDTO ambulanciaDTO) {
        var ambulancia = findById(id);

        var novaPlaca = ambulanciaDTO.placa();
        if (!ambulancia.getPlaca().equals(novaPlaca) && ambulanciaRepository.existsByPlaca(novaPlaca)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Já existe uma ambulância cadastrada com essa placa");
        }
        if (ambulancia.getStatus() == StatusAmbulancia.EM_ATENDIMENTO) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Não é possível atualizar uma ambulância que está em atendimento");
        }
        if (equipeRepository.existsByAmbulanciaId(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Não é possível atualizar uma ambulância que está vinculada a uma equipe. Remova-a da equipe ou inative-a ao invés disso.");
        }
        var bairro = bairroRepository.findById(ambulanciaDTO.bairroId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "O bairro informado não existe")
        );

        ambulancia.setPlaca(novaPlaca);
        ambulancia.setTipoAmbulancia(ambulanciaDTO.tipo());
        ambulancia.setStatus(ambulanciaDTO.status());
        ambulancia.setBairroBase(bairro);

        return ambulanciaRepository.save(ambulancia);
    }

    public void deletar(Long id) {
        var ambulancia = findById(id);

        if (ambulancia.getStatus() == StatusAmbulancia.EM_ATENDIMENTO) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Não é possível excluir uma ambulância que está em atendimento");
        }
        if (equipeRepository.existsByAmbulanciaId(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Não é possível excluir uma ambulância que está vinculada a uma equipe. Remova-a da equipe ou inative-a ao invés disso.");
        }
        if (atendimentoRepository.existsByAmbulanciaId(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Não é possível excluir uma ambulância que já tenha feito atendimentos. Inative-a ao invés disso.");
        }

        ambulanciaRepository.delete(ambulancia);
    }
}
