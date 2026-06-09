package com.mhd.sosrota.service;

import com.mhd.sosrota.model.Profissional;
import com.mhd.sosrota.model.dto.profissional.ProfissionalCadastroDTO;
import com.mhd.sosrota.model.enums.FuncaoProfissional;
import com.mhd.sosrota.repository.ProfissionalRepository;
import com.mhd.sosrota.util.ProfissionalIterator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Hartur Sales Xavier <hartursalesxavier@gmail.com>
 * @date 05/06/2026
 * @brief Service de profissionais
 */
@Service
public class ProfissionalService {

    private final ProfissionalRepository profissionalRepository;

    public ProfissionalService(ProfissionalRepository profissionalRepository) {
        this.profissionalRepository = profissionalRepository;
    }

    public Profissional salvar(ProfissionalCadastroDTO dto) {
        if (profissionalRepository.existsByNome(dto.nome())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Já existe um profissional cadastrado com esse nome");
        }

        var profissional = new Profissional();
        profissional.setNome(dto.nome());
        profissional.setFuncaoProfissional(dto.funcao());
        profissional.setContato(dto.contato());
        profissional.setAtivo(true);

        return profissionalRepository.save(profissional);
    }

    public Page<Profissional> findAll(Pageable pageable, String filtro) {
        return profissionalRepository.obterComFiltro(pageable, filtro);
    }

    public Profissional findById(Long id) {
        return profissionalRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Profissional não encontrado"));
    }


    public List<Profissional> findByFuncao(FuncaoProfissional funcao) {
        List<Profissional> todos = profissionalRepository.findAll();
        List<Profissional> resultado = new ArrayList<>();

        ProfissionalIterator iterator = new ProfissionalIterator(todos, funcao);
        while (iterator.hasNext()) {
            resultado.add(iterator.next());
        }
        return resultado;
    }

    public List<Profissional> findDisponiveis() {
        return profissionalRepository.findByAtivoTrueAndEquipeIsNull();
    }

    public Profissional atualizar(Long id, ProfissionalCadastroDTO dto) {
        var profissional = findById(id);

        boolean mudouFuncao = !profissional.getFuncaoProfissional()
                .equals(dto.funcao());

        if (mudouFuncao && profissional.getEquipe() != null
                && profissional.getEquipe().isAtivo()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Não é possível alterar a função de um profissional alocado em equipe ativa");
        }

        profissional.setNome(dto.nome());
        profissional.setFuncaoProfissional(dto.funcao());
        profissional.setContato(dto.contato());

        return profissionalRepository.save(profissional);
    }

    public void deletar(Long id) {
        var profissional = findById(id);

        if (profissional.getEquipe() != null && profissional.getEquipe().isAtivo()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Não é possível excluir um profissional alocado em equipe ativa");
        }

        profissionalRepository.delete(profissional);
    }
}