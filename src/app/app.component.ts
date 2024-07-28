import { Component, Injector } from '@angular/core';
import { Confirmable } from './shared/decorators/confirmable.decorator';
import { InjectorInstance } from './Injector';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports:[MatButton],
  template: `<button (click)="doSomething()" color="primary" mat-raised-button>
      Do Something
    </button>
    <div>{{ this.confirmed }}</div> `,
})
export class AppComponent {
  public confirmed: boolean = false;
  constructor(private injector: Injector) {
    InjectorInstance.setInjector(this.injector);
  }
  @Confirmable({
    title: 'Delete Confirmation',
    text: 'Are you sure you want to delete this item?'
  }) // <-- Here it is!
  public doSomething(): void {
    this.confirmed = true;
  }
}