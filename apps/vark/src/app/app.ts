import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { getStoredTheme, setTheme, type ThemeName } from '@vark/ui-theme';
import { ButtonComponent, LinkComponent } from '@vark/ui-components';

type Ticket = {
  id: number;
  title: string;
  description: string;
};

@Component({
  imports: [FormsModule, RouterModule, ButtonComponent, LinkComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'vark';
  protected activeTheme: ThemeName = getStoredTheme() ?? 'system';
  protected isCreateTicketPanelOpen = false;
  protected draftTicketTitle = '';
  protected draftTicketDescription = '';
  protected tickets: Ticket[] = [];
  private nextTicketId = 1;

  protected selectTheme(theme: ThemeName) {
    setTheme(theme);
    this.activeTheme = theme;
  }

  protected openCreateTicketPanel() {
    this.isCreateTicketPanelOpen = true;
  }

  protected cancelCreateTicket() {
    this.isCreateTicketPanelOpen = false;
    this.resetTicketDraft();
  }

  protected confirmCreateTicket() {
    this.tickets = [
      ...this.tickets,
      {
        id: this.nextTicketId++,
        title: this.draftTicketTitle,
        description: this.draftTicketDescription,
      },
    ];

    this.isCreateTicketPanelOpen = false;
    this.resetTicketDraft();
  }

  protected trackTicketById(_index: number, ticket: Ticket) {
    return ticket.id;
  }

  private resetTicketDraft() {
    this.draftTicketTitle = '';
    this.draftTicketDescription = '';
  }
}
