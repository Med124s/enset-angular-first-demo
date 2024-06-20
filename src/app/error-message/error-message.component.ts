import { Component } from '@angular/core';
import {AppStateService} from "../service/app-state.service";

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.css'
})
export class ErrorMessageComponent {
  constructor(public appState:AppStateService) {
  }
}
