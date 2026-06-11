package com.mhd.sosrota.service;

import com.mhd.sosrota.model.Ocorrencia;
import com.mhd.sosrota.model.dto.ocorrencia.OcorrenciaCadastroDTO;
import com.mhd.sosrota.model.enums.StatusOcorrencia;
import com.mhd.sosrota.repository.BairroRepository;
import com.mhd.sosrota.repository.OcorrenciaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Duration;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;

/**
 * @author Hartur Sales <hartursalesxavier@gmail.com>
 * @date 04/06/2026
 * @brief Service de ocorrências
 */
@Service
public class OcorrenciaService {

    private final OcorrenciaRepository ocorrenciaRepository;
    private final BairroRepository bairroRepository;

    public OcorrenciaService(OcorrenciaRepository ocorrenciaRepository,
                             BairroRepository bairroRepository) {
        this.ocorrenciaRepository = ocorrenciaRepository;
        this.bairroRepository = bairroRepository;
    }

    public Ocorrencia salvar(OcorrenciaCadastroDTO dto) {
        var bairro = bairroRepository.findById(dto.bairroId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "O bairro informado não existe"));

        var ocorrencia = new Ocorrencia();
        ocorrencia.setTipoOcorrencia(dto.tipoOcorrencia());
        ocorrencia.setGravidadeOcorrencia(dto.gravidadeOcorrencia());
        ocorrencia.setBairro(bairro);
        ocorrencia.setObservacao(dto.observacao());
        ocorrencia.setStatusOcorrencia(StatusOcorrencia.ABERTA);
        ocorrencia.setDataHoraAbertura(OffsetDateTime.now(ZoneId.of("America/Sao_Paulo")));

        return ocorrenciaRepository.save(ocorrencia);
    }

    public Page<Ocorrencia> findAll(Pageable pageable) {
        return ocorrenciaRepository.findAll(pageable);
    }

    public Ocorrencia findById(Long id) {
        return ocorrenciaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Ocorrência não encontrada"));
    }

    public Ocorrencia atualizar(Long id, OcorrenciaCadastroDTO dto) {
        var ocorrencia = findById(id);

        if (ocorrencia.getStatusOcorrencia() == StatusOcorrencia.CONCLUIDA
                || ocorrencia.getStatusOcorrencia() == StatusOcorrencia.CANCELADA) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Não é possível editar uma ocorrência já finalizada");
        }

        var bairro = bairroRepository.findById(dto.bairroId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "O bairro informado não existe"));

        ocorrencia.setTipoOcorrencia(dto.tipoOcorrencia());
        ocorrencia.setGravidadeOcorrencia(dto.gravidadeOcorrencia());
        ocorrencia.setBairro(bairro);
        ocorrencia.setObservacao(dto.observacao());

        return ocorrenciaRepository.save(ocorrencia);
    }

    public Ocorrencia cancelar(Long id, String justificativa) {
        var ocorrencia = findById(id);

        if (ocorrencia.getStatusOcorrencia() != StatusOcorrencia.ABERTA
                && ocorrencia.getStatusOcorrencia() != StatusOcorrencia.DESPACHADA) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Somente ocorrências abertas ou despachadas podem ser canceladas");
        }

        ocorrencia.setStatusOcorrencia(StatusOcorrencia.CANCELADA);
        ocorrencia.setSlaFinal(calcularSLAFinal(ocorrencia.getLimiteSLA()));

        var obsAtual = ocorrencia.getObservacao() != null ? ocorrencia.getObservacao().strip() : "";

        String novaObs;

        if (obsAtual.isEmpty()) {
            novaObs = "[CANCELAMENTO]: " + justificativa;
        } else {
            novaObs = obsAtual + "\n[CANCELAMENTO]: " + justificativa;
        }

        ocorrencia.setObservacao(novaObs);

        return ocorrenciaRepository.save(ocorrencia);
    }

    public void deletar(Long id) {
        var ocorrencia = findById(id);

        if (ocorrencia.getStatusOcorrencia() != StatusOcorrencia.ABERTA) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Não é possível deletar uma ocorrência com histórico. Cancele-a, em vez disso");
        }

        if (ocorrencia.getStatusOcorrencia() == StatusOcorrencia.DESPACHADA
                || ocorrencia.getStatusOcorrencia() == StatusOcorrencia.EM_ATENDIMENTO) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Não é possível excluir uma ocorrência que está sendo atendida");
        }

        ocorrenciaRepository.delete(ocorrencia);
    }

    public static Duration calcularSLAFinal(OffsetDateTime limiteSla) {
        OffsetDateTime agora = OffsetDateTime.now(ZoneId.of("America/Sao_Paulo"));
        OffsetDateTime limite = limiteSla.withOffsetSameLocal(ZoneOffset.ofHours(-3));
        return Duration.between(agora, limite);
    }
}