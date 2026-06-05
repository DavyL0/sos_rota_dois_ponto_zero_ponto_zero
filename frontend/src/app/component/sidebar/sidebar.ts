import { Component, OnInit } from '@angular/core';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-sidebar',
  imports: [NgClass, Button, RouterLinkActive, RouterLink, NgOptimizedImage],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  itensMenu: MenuItem[] = [
    { label: 'Dashboard', icon: 'pi pi-th-large', rota: '/home' },
    { label: 'Ocorrências', icon: 'pi pi-exclamation-triangle', rota: '/ocorrencias' },
    { label: 'Ambulâncias', icon: 'pi pi-car', rota: '/ambulancias' },
    { label: 'Equipes', icon: 'pi pi-users', rota: '/equipes' },
    { label: 'Relatórios', icon: 'pi pi-chart-line', rota: '/relatorios' },
  ];
  colapsada: boolean = false;
  modoEscuro: boolean = false;

  ngOnInit(): void {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (prefersDark) {
      this.modoEscuro = true;
      document.documentElement.classList.add('app-dark');
    }
  }

  toggleColapsada() {
    this.colapsada = !this.colapsada;
    if (this.colapsada) {
      this.itensMenu.forEach((item) => (item.aberto = false));
    }
  }

  toggleSubmenu(item: MenuItem) {
    if (item.filhos) {
      if (!item.aberto) {
        item.aberto = true;
      }
    }
  }

  toggleTema() {
    this.modoEscuro = !this.modoEscuro;

    if (this.modoEscuro) {
      document.documentElement.classList.add('app-dark');
    } else {
      document.documentElement.classList.remove('app-dark');
    }
  }

  protected toggleSeta(item: MenuItem, event: PointerEvent) {
    event.preventDefault();
    event.stopPropagation();

    item.aberto = !item.aberto;
  }
}
