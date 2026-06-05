import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProfissionaisService } from '../../services/profissionais-service/profissionais-service';
import {
  FuncaoProfissional,
  FuncaoProfissionalLabel,
  ProfissionalCadastroModel,
  ProfissionalExibicaoModel,
} from '../../model/profissional.model';
import { Table, TableModule } from 'primeng/table';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { TabelaOrdenacao } from '../../component/tabela-ordenacao';
import { Button } from 'primeng/button';
import { Skeleton } from 'primeng/skeleton';
import { Tooltip } from 'primeng/tooltip';
import { Page } from '../../model/page.model';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { FormsModule, NgForm } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { NgClass } from '@angular/common';
import { Select } from 'primeng/select';
import { Toast } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';

@Component({
  selector: 'app-profissionais-component',
  imports: [
    TableModule,
    Button,
    Skeleton,
    Tooltip,
    IconField,
    InputIcon,
    InputText,
    FormsModule,
    Dialog,
    NgClass,
    Select,
    Toast,
    ConfirmDialog,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './profissionais-component.html',
  styleUrl: './profissionais-component.css',
})
export class ProfissionaisComponent extends TabelaOrdenacao implements OnInit, OnDestroy {
  private profissionaisService = inject(ProfissionaisService);
  private cd = inject(ChangeDetectorRef);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  @ViewChild('cadastroForm') cadastroForm!: NgForm;
  @ViewChild('tabelaProfissionais') tabela!: Table;

  profissionais: ProfissionalExibicaoModel[] = [];

  totalElementos = 0;
  termoBusca: string = '';
  funcaoLabel = FuncaoProfissionalLabel;

  cadastroVisivel = false;
  profissionalCadastrado: ProfissionalCadastroModel = {
    nome: '',
    funcao: null,
    contato: '',
  };
  funcoes = [
    { label: 'Enfermeiro', value: FuncaoProfissional.ENFERMEIRO },
    { label: 'Médico', value: FuncaoProfissional.MEDICO },
    { label: 'Condutor', value: FuncaoProfissional.CONDUTOR },
  ];
  idEditando: number | null = null;
  erroBackend: string | null = null;

  private buscaSubject = new Subject<void>();
  private buscaSubscription!: Subscription;

  ngOnInit(): void {
    this.buscaSubscription = this.buscaSubject.pipe(debounceTime(300)).subscribe(() => {
      this.paginaAtual = 0;
      this.carregarDados();
    });
  }

  ngOnDestroy(): void {
    this.buscaSubscription.unsubscribe();
  }

  protected override carregarDados(): void {
    this.carregando = true;

    this.profissionaisService
      .obterProfissionais(
        this.paginaAtual,
        this.tamanhoPagina,
        this.campoOrdenacao,
        this.ordemOrdenacao ?? -1,
        this.termoBusca,
      )
      .subscribe({
        next: (dados) => {
          this.profissionais = dados.content;
          this.totalElementos = dados.page.totalElements;
          this.carregando = false;
          this.cd.markForCheck();
        },
        error: (err) => {
          console.log('Erro ao obter profissionais: ', err);

          //todo: apagar as linhas abaixo quando o backend estiver funcionando
          const mockCompleto: ProfissionalExibicaoModel[] = [
            {
              id: 17,
              nome: 'Bianca Biquestre',
              funcao: 'ENFERMEIRO' as any,
              contato: 'bibiquestre@yahoo.com.br',
            },
            {
              id: 26,
              nome: 'Davi Augusto',
              funcao: 'MEDICO' as any,
              contato: 'daviaug23@gmail.com',
            },
            {
              id: 4,
              nome: 'Paula Teixeira',
              funcao: 'ENFERMEIRO' as any,
              contato: 'paulinhadopagode@gmail.com',
            },
            {
              id: 3,
              nome: 'Dominic Toretto',
              funcao: 'CONDUTOR' as any,
              contato: 'toretto@toretto.com',
            },
            {
              id: 27,
              nome: 'Marcelo Ferreira',
              funcao: 'CONDUTOR' as any,
              contato: 'celoferreira@yahoo.com',
            },
            {
              id: 28,
              nome: 'Larissa Santana',
              funcao: 'MEDICO' as any,
              contato: 'larisantana@gmail.com',
            },
            {
              id: 29,
              nome: 'Leila Araujo',
              funcao: 'ENFERMEIRO' as any,
              contato: 'araujoleila@gmail.com',
            },
            {
              id: 30,
              nome: 'Amanda Sousa',
              funcao: 'CONDUTOR' as any,
              contato: 'mandexsousa@hotmail.com',
            },
            {
              id: 8,
              nome: 'Ronaldo Filho',
              funcao: 'MEDICO' as any,
              contato: 'rorofilho@outlook.com',
            },
            {
              id: 14,
              nome: 'Luiz Felipe',
              funcao: 'ENFERMEIRO' as any,
              contato: 'felipito@outlook.com',
            },
            {
              id: 1,
              nome: 'Drauzio Varella',
              funcao: 'MEDICO' as any,
              contato: 'drauziovarella@gmail.com',
            },
            {
              id: 15,
              nome: 'Jessica Ferreira',
              funcao: 'CONDUTOR' as any,
              contato: 'jaacaboujessica@gmail.com',
            },
            {
              id: 6,
              nome: 'Maria José',
              funcao: 'ENFERMEIRO' as any,
              contato: 'maryjoseph@outlook.com',
            },
            {
              id: 11,
              nome: 'Rolando Barros',
              funcao: 'CONDUTOR' as any,
              contato: 'fuirolando@yahoo.com.br',
            },
            {
              id: 9,
              nome: 'Gabriela Lisboa',
              funcao: 'ENFERMEIRO' as any,
              contato: 'gabrielisboa@gmail.com',
            },
            {
              id: 10,
              nome: 'Juremaldo Sales',
              funcao: 'CONDUTOR' as any,
              contato: 'juremildo@outlook.com',
            },
            {
              id: 2,
              nome: 'Meredith Grey',
              funcao: 'MEDICO' as any,
              contato: 'meredithzinha@yahoo.com',
            },
            {
              id: 12,
              nome: 'Um Dois Tres de Oliveira',
              funcao: 'CONDUTOR' as any,
              contato: 'umdoistres@gmail.com',
            },
            {
              id: 13,
              nome: 'Joana Darc',
              funcao: 'ENFERMEIRO' as any,
              contato: 'joanadarc@joana.com',
            },
            {
              id: 22,
              nome: 'Pedro Lucas',
              funcao: 'MEDICO' as any,
              contato: 'pedrolucas@outlook.com',
            },
            {
              id: 24,
              nome: 'Pericles',
              funcao: 'CONDUTOR' as any,
              contato: 'periclys@outlook.com',
            },
            {
              id: 25,
              nome: 'Neuma Moura',
              funcao: 'ENFERMEIRO' as any,
              contato: 'neuminha@yahoo.com.br',
            },
            {
              id: 21,
              nome: 'Ameinda Silva',
              funcao: 'ENFERMEIRO' as any,
              contato: 'ameinda@gmail.com',
            },
            {
              id: 18,
              nome: 'Julia Souza',
              funcao: 'CONDUTOR' as any,
              contato: 'jusouza@gmail.com',
            },
            { id: 16, nome: 'Camila Cabo', funcao: 'MEDICO' as any, contato: 'milacabo@gmail.com' },
          ];

          // 2. Simular o Filtro por Texto (termoBusca)
          let dadosFiltrados = mockCompleto;
          if (this.termoBusca) {
            const termo = this.termoBusca.toLowerCase();
            dadosFiltrados = mockCompleto.filter(
              (p) =>
                p.nome.toLowerCase().includes(termo) ||
                p.contato.toLowerCase().includes(termo) ||
                p.funcao?.toLowerCase().includes(termo),
            );
          }

          // 3. Simular a Ordenação (opcional, para a tabela funcionar redondinha)
          if (this.campoOrdenacao) {
            const campo = this.campoOrdenacao as string;
            const direcao = this.ordemOrdenacao === 1 ? 1 : -1;

            dadosFiltrados.sort((a: any, b: any) => {
              if (a[campo] < b[campo]) return -1 * direcao;
              if (a[campo] > b[campo]) return 1 * direcao;
              return 0;
            });
          }

          // 4. Simular a Paginação (ex: 10 itens por página)
          const tamanho = this.tamanhoPagina || 10;
          const indiceInicio = Math.max(0, this.paginaAtual * tamanho);
          const indiceFim = indiceInicio + tamanho;
          const itensDaPagina = dadosFiltrados.slice(indiceInicio, indiceFim);

          // 5. Construir a estrutura de resposta similar à interface Page<T> do backend
          const dadosMockPage: Page<ProfissionalExibicaoModel> = {
            content: itensDaPagina,
            page: {
              size: tamanho,
              number: this.paginaAtual,
              totalElements: dadosFiltrados.length,
              totalPages: Math.ceil(dadosFiltrados.length / tamanho),
            },
          };

          // 6. Atualizar as variáveis da tela como se fosse sucesso
          setTimeout(() => {
            // Timeout leve apenas para simular o delay de rede
            this.profissionais = dadosMockPage.content;
            this.totalElementos = dadosMockPage.page.totalElements;
            this.carregando = false;
            this.cd.markForCheck();
          }, 300);
        },
      });
  }

  protected salvarProfissional() {
    if (this.cadastroForm?.invalid) return;

    if (!this.profissionalCadastrado.contato.includes('@')) {
      this.cadastroForm.controls['email'].setErrors({ email: true });
      return;
    }

    this.erroBackend = null;

    if (this.idEditando) {
    } else {
      this.profissionaisService.criarProfissional(this.profissionalCadastrado).subscribe({
        next: () => {
          this.limparBusca();
          this.limparOrdenacao();
          this.carregarDados();
          this.fecharCadastro();
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Profissional cadastrado com sucesso!',
          });
        },
        error: (err) => {
          console.log('Erro ao criar profissional: ', err);
          //todo gerenciar os tipos de erros pra jogar no formulario OU no toast
        },
      });
    }
  }

  protected confirmarExclusao(profissional: ProfissionalExibicaoModel) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir o funcionário ${profissional.nome}?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Excluir',
      rejectLabel: 'Cancelar',
      rejectButtonProps: {
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        severity: 'danger',
      },
      accept: () => {
        this.excluirProfissional(profissional.id);
      },
    });
  }

  private excluirProfissional(id: number) {

  }

  protected getFuncaoLabel(funcao: any): string {
    return this.funcaoLabel[funcao as FuncaoProfissional] || funcao;
  }

  protected filtrarTabela() {
    this.buscaSubject.next();
  }

  protected limparBusca() {
    this.termoBusca = '';
    this.filtrarTabela();
  }

  protected limparOrdenacao() {
    this.tabela.sortField = null;
    this.tabela.sortOrder = 1;
    this.tabela.reset();
  }

  protected abrirCadastro() {
    this.idEditando = null;
    this.profissionalCadastrado = {
      nome: '',
      funcao: null,
      contato: '',
    };
    this.cadastroVisivel = true;
  }

  protected fecharCadastro() {
    this.cadastroVisivel = false;
    this.profissionalCadastrado = {
      nome: '',
      funcao: null,
      contato: '',
    };
    this.idEditando = null;
    setTimeout(() => {
      this.cadastroForm.resetForm();
    }, 0);
  }

  protected abrirEdicao(profissional: ProfissionalExibicaoModel) {
    this.idEditando = profissional.id;
    this.profissionalCadastrado = {
      nome: profissional.nome,
      funcao: profissional.funcao,
      contato: profissional.contato,
    };
    this.cadastroVisivel = true;
  }
}
