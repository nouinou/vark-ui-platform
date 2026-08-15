import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { getStoredTheme, setTheme, type ThemeName } from '@vark/ui-theme';
import { ButtonComponent, DialogConfig, DialogRef, DialogService, LinkComponent } from '@vark/ui-components';

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
  @ViewChild('createTicketDialogTemplate', { static: true })
  private createTicketDialogTemplate!: TemplateRef<unknown>;

  protected title = 'vark';
  protected activeTheme: ThemeName = getStoredTheme() ?? 'system';
  protected draftTicketTitle = '';
  protected draftTicketDescription = '';
  protected tickets: Ticket[] = [];
  private nextTicketId = 1;
  private readonly dialogService = inject(DialogService);
  private createTicketDialogRef: DialogRef<void> | null = null;

  protected selectTheme(theme: ThemeName) {
    setTheme(theme);
    this.activeTheme = theme;
  }

  protected openCreateTicketPanel() {
    this.createTicketDialogRef?.close();

    const dialogConfig: DialogConfig = {
      size: 'md',
    };

    this.createTicketDialogRef = this.dialogService.open<unknown, void>(
      this.createTicketDialogTemplate,
      dialogConfig,
    );

    this.createTicketDialogRef.afterClosed().subscribe(() => {
      this.createTicketDialogRef = null;
    });
  }

  protected cancelCreateTicket() {
    this.resetTicketDraft();
    this.createTicketDialogRef?.close();
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

    this.resetTicketDraft();
    this.createTicketDialogRef?.close();
  }

  protected trackTicketById(_index: number, ticket: Ticket) {
    return ticket.id;
  }

  private resetTicketDraft() {
    this.draftTicketTitle = '';
    this.draftTicketDescription = '';
  }
}
