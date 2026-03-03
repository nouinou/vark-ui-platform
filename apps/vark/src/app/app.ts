import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { getStoredTheme, setTheme, type ThemeName } from '@vark/ui-theme';
import { ButtonComponent, LinkComponent } from '@vark/ui-components';

@Component({
  imports: [RouterModule, ButtonComponent, LinkComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'vark';
  protected activeTheme: ThemeName = getStoredTheme() ?? 'system';

  protected selectTheme(theme: ThemeName) {
    setTheme(theme);
    this.activeTheme = theme;
  }
}
