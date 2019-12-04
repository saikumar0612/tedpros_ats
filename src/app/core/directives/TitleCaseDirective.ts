import { Directive, ElementRef, HostListener  } from '@angular/core';

@Directive({
  selector: '[appTitleCase]'
})
export class TitleCaseDirective {
  newArray =[];
  constructor(private el: ElementRef) {
  }

  @HostListener('keyup') keyup() {
    if (this.el.nativeElement.value) {
        this.newArray =[];
        const arr: string[] = this.el.nativeElement.value.split(' ');
        for(let i=0; i<arr.length; i++){
            const word:string[] = arr[i].split('');
            if(word[0]){
                word[0] = word[0].toUpperCase();
                arr[i] = word.join('');
            }
        }      
      this.el.nativeElement.value = arr.join(' ');
    }
  }
}