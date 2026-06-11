package com.mhd.sosrota.service;

import com.mhd.sosrota.model.Equipe;
import com.mhd.sosrota.model.Profissional;
import com.mhd.sosrota.model.dto.equipe.EquipeCadastroDTO;
import com.mhd.sosrota.model.enums.FuncaoProfissional;
import com.mhd.sosrota.model.enums.StatusAmbulancia;
import com.mhd.sosrota.model.enums.TipoAmbulancia;
import com.mhd.sosrota.repository.AmbulanciaRepository;
import com.mhd.sosrota.repository.EquipeRepository;
import com.mhd.sosrota.repository.ProfissionalRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

/**
 * @author Hartur Sales Xavier <hartursalesxavier@gmail.com>
 * @date 06/06/2026
 * @brief Service de equipes
 */
@Service
public class EquipeService {

    private final EquipeRepository equipeRepository;
    private final AmbulanciaRepository ambulanciaRepository;
    private final ProfissionalRepository profissionalRepository;

    public EquipeService(EquipeRepository equipeRepository,
                         AmbulanciaRepository ambulanciaRepository,
                         ProfissionalRepository profissionalRepository) {
        this.equipeRepository = equipeRepository;
        this.ambulanciaRepository = ambulanciaRepository;
        this.profissionalRepository = profissionalRepository;
    }

    @Transactional
    public Equipe salvar(EquipeCadastroDTO dto) {
        var ambulancia = ambulanciaRepository.findById(dto.ambulanciaId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Ambulância não encontrada"));

        if (ambulancia.getStatus() == StatusAmbulancia.DISPONIVEL
                || ambulancia.getStatus() == StatusAmbulancia.EM_ATENDIMENTO) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Esta ambulância já possui equipe ativa ou está em atendimento");
        }

        List<Profissional> profissionais = dto.profissionalIds().stream()
                .map(id -> profissionalRepository.findById(id)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                                "Profissional não encontrado: " + id)))
                .toList();

        var equipe = new Equipe();
        equipe.setAmbulancia(ambulancia);
        equipe.setAtivo(true);
        profissionais.forEach(equipe::addProfissional);

        validarComposicao(equipe);

        equipe = equipeRepository.save(equipe);

        ambulancia.setStatus(StatusAmbulancia.DISPONIVEL);
        ambulanciaRepository.save(ambulancia);

        return equipe;
    }

    public Page<Equipe> findAll(Pageable pageable, String filtro, Boolean ativo, TipoAmbulancia tipo) {
        return equipeRepository.obterComFiltro(pageable, filtro, ativo, tipo);
    }

    public Equipe findById(Long id) {
        return equipeRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Equipe não encontrada"));
    }

    public Equipe atualizar(Long id, EquipeCadastroDTO dto) {
        var equipe = findById(id);

        if (dto.ativo()) {
            boolean ambulanciaOcupada = equipeRepository
                    .existsByAmbulanciaIdAndAtivoTrueAndIdNot(dto.ambulanciaId(), id);
            if (ambulanciaOcupada) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "A ambulância já está em uso por outra equipe ativa");
            }
        }

        var ambulancia = ambulanciaRepository.findById(dto.ambulanciaId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Ambulância não encontrada"));

        List<Profissional> profissionais = dto.profissionalIds().stream()
                .map(pid -> profissionalRepository.findById(pid)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                                "Profissional não encontrado: " + pid)))
                .toList();

        equipe.getProfissionais().forEach(p -> p.setEquipe(null));
        equipe.getProfissionais().clear();
        equipe.setAmbulancia(ambulancia);
        equipe.setAtivo(dto.ativo());
        profissionais.forEach(equipe::addProfissional);

        validarComposicao(equipe);
        return equipeRepository.save(equipe);
    }

    @Transactional
    public Equipe alterarStatus(Long id, boolean ativo) {
        var equipe = findById(id);

        if (ativo) {
            boolean ambulanciaOcupada = equipeRepository
                    .existsByAmbulanciaIdAndAtivoTrueAndIdNot(equipe.getAmbulancia().getId(), id);
            if (ambulanciaOcupada) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "A ambulância já está em uso por outra equipe ativa");
            }
        } else {
            var ambulancia = equipe.getAmbulancia();
            if (ambulancia.getStatus() == StatusAmbulancia.EM_ATENDIMENTO) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Não é possível desativar uma equipe em atendimento");
            }
        }

        equipe.setAtivo(ativo);
        return equipeRepository.save(equipe);
    }

    @Transactional
    public void deletar(Long id) {
        var equipe = findById(id);

        var ambulancia = equipe.getAmbulancia();

        if (ambulancia.getStatus() == StatusAmbulancia.EM_ATENDIMENTO) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Não é possível excluir uma equipe em atendimento");
        }
        if (ambulancia.getStatus() != StatusAmbulancia.INATIVA) {
            ambulancia.setStatus(StatusAmbulancia.INATIVA);
            ambulanciaRepository.save(ambulancia);
        }

        equipe.getProfissionais().forEach(p -> p.setEquipe(null));
        equipe.getProfissionais().clear();

        equipeRepository.delete(equipe);
    }

    private void validarComposicao(Equipe equipe) {
        List<Profissional> profissionais = equipe.getProfissionais();
        long medicos = profissionais.stream()
                .filter(p -> p.getFuncaoProfissional() == FuncaoProfissional.MEDICO).count();
        long enfermeiros = profissionais.stream()
                .filter(p -> p.getFuncaoProfissional() == FuncaoProfissional.ENFERMEIRO).count();
        long condutores = profissionais.stream()
                .filter(p -> p.getFuncaoProfissional() == FuncaoProfissional.CONDUTOR).count();

        if (equipe.getAmbulancia().getTipoAmbulancia() == TipoAmbulancia.UTI) {
            if (medicos < 1 || enfermeiros < 1 || condutores < 1) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Equipe UTI requer ao menos 1 médico, 1 enfermeiro e 1 condutor");
            }
        } else {
            if (enfermeiros < 1 || condutores < 1) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Equipe básica requer ao menos 1 enfermeiro e 1 condutor");
            }
        }
    }
}