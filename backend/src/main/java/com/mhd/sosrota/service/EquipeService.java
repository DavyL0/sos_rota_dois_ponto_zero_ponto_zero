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
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
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

        ambulancia.setStatus(StatusAmbulancia.DISPONIVEL);
        ambulanciaRepository.save(ambulancia);

        return equipeRepository.save(equipe);
    }

    public List<Equipe> findAll() {
        return equipeRepository.findAll();
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

    public void deletar(Long id) {
        var equipe = findById(id);
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