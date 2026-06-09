package com.mhd.sosrota.service;

import com.mhd.sosrota.factory.AmbulanciaFactory;
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

import java.util.List;

/**
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @author Hartur Sales Xavier <hartursalesxavier@gmail.com>
 * @date 04/06/2026
 * @brief Service de ambulâncias.
 */
@Service
public class AmbulanciaService {
    private final AmbulanciaRepository ambulanciaRepository;
    private final BairroRepository bairroRepository;
    private final EquipeRepository equipeRepository;
    private final AtendimentoRepository atendimentoRepository;

    public AmbulanciaService(AmbulanciaRepository ambulanciaRepository,
                             BairroRepository bairroRepository,
                             EquipeRepository equipeRepository,
                             AtendimentoRepository atendimentoRepository) {
        this.ambulanciaRepository = ambulanciaRepository;
        this.bairroRepository = bairroRepository;
        this.equipeRepository = equipeRepository;
        this.atendimentoRepository = atendimentoRepository;
    }

    public Ambulancia salvar(AmbulanciaCadastroDTO dto) {
        if (ambulanciaRepository.existsByPlaca(dto.placa())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Já existe uma ambulância cadastrada com essa placa");
        }
        var bairro = bairroRepository.findById(dto.bairroId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "O bairro informado não existe"));

        var ambulancia = AmbulanciaFactory.criar(dto.tipo(), dto.placa(), bairro);
        return ambulanciaRepository.save(ambulancia);
    }

    public Ambulancia findById(Long id) {
        return ambulanciaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Ambulância não encontrada"));
    }

    public Page<Ambulancia> findAll(Pageable pageable, String filtro) {
        return ambulanciaRepository.obterComFiltro(pageable, filtro);
    }

    public List<Ambulancia> findByStatus(StatusAmbulancia status) {
        return ambulanciaRepository.findByStatus(status);
    }

    public Ambulancia atualizar(Long id, AmbulanciaCadastroDTO dto) {
        var ambulancia = findById(id);

        if (!ambulancia.getPlaca().equals(dto.placa())
                && ambulanciaRepository.existsByPlaca(dto.placa())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Já existe uma ambulância cadastrada com essa placa");
        }
        if (ambulancia.getStatus() == StatusAmbulancia.EM_ATENDIMENTO) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Não é possível atualizar uma ambulância em atendimento");
        }
        if (equipeRepository.existsByAmbulanciaId(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Não é possível atualizar uma ambulância vinculada a uma equipe");
        }

        var bairro = bairroRepository.findById(dto.bairroId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "O bairro informado não existe"));

        ambulancia.setPlaca(dto.placa());
        ambulancia.setTipoAmbulancia(dto.tipo());
        ambulancia.setStatus(dto.status());
        ambulancia.setBairroBase(bairro);
        return ambulanciaRepository.save(ambulancia);
    }

    public void deletar(Long id) {
        var ambulancia = findById(id);

        if (ambulancia.getStatus() == StatusAmbulancia.EM_ATENDIMENTO) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Não é possível excluir uma ambulância em atendimento");
        }
        if (equipeRepository.existsByAmbulanciaId(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Não é possível excluir uma ambulância vinculada a uma equipe");
        }
        if (atendimentoRepository.existsByAmbulanciaId(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Não é possível excluir uma ambulância com histórico de atendimentos");
        }
        ambulanciaRepository.delete(ambulancia);
    }
}