import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from "@angular/common";

@Pipe({
  name: 'FormatdatePipe'
})
export class FormatdatePipe implements PipeTransform {
  transform(value: any, format: string = 'dd-MM-yyyy') : any {
    const datePipe = new DatePipe('en-Us')
    return datePipe.transform(value, format);
  }
}
