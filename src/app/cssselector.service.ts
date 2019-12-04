import { Injectable, Renderer2,RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CssselectorService {
public renderer: Renderer2;
  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
   }
   setStyle(cn:string){
    //this.renderer.removeClass(document.body,'default');
    this.renderer.addClass(document.body, cn)
  }
}
