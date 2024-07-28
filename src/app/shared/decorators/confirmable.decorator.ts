import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SimpleDialogComponent } from '../components/simple-dialog/simple-dialog.component';
import { Type } from '@angular/core';
import { InjectorInstance } from '../../Injector';

export interface ConfirmableDecoratorOptions {
  title?: string;
  text?: string;
}

export function Confirmable(info: ConfirmableDecoratorOptions) {
  return (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value;
    const config: ConfirmableDecoratorOptions = {
      title: info.text,
      text: info.title,
    };

    descriptor.value = async function (...args: any[]) {
        
        const injector = InjectorInstance.getInjector();
        const dialog = injector.get<MatDialog>(MatDialog as Type<MatDialog>);

      const dialogRef: MatDialogRef<SimpleDialogComponent> = dialog.open(
        SimpleDialogComponent,
        {
          data: {
            title: config.title,
            text: config.text,
          },
        }
      );

      dialogRef.afterClosed().subscribe((result) => {
        if (result === true) {
          return originalMethod.apply(this, args);
        }
      });
    };
    return descriptor;
  };
}