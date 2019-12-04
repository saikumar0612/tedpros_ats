import { Component, OnInit, Inject, ViewChild, ViewContainerRef  } from '@angular/core';
import { Http } from '@angular/http';
import { Title } from '@angular/platform-browser';
import { CssselectorService } from 'src/app/cssselector.service';
import { DOCUMENT } from '@angular/common';
import { AuthenticationService } from './core/services/authentication.service';
import { first } from 'rxjs/operators';
import { InteractionService } from './core/services/interaction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  viewProviders: [Title],
})
export class AppComponent implements OnInit {

  file2_input;
  themeForm;
  logoUrl;
  themeData: {
    siteFav: ''
  };
  newtitle = '';
  title;
  pageTitle;
  favicon;
  color;
  class;
  url: any;
  body: any;
  theme;
  infoArray: any[] = [];
  @ViewChild('chatContainer', { read: ViewContainerRef, static: true })
  viewContainerRef: ViewContainerRef
  constructor(private titleService: Title, private http: Http,
    @Inject(DOCUMENT) private _document: HTMLDocument, public authService: AuthenticationService , private interactionService: InteractionService) {
  }
  ngOnInit() {
    this.authService.getTheme()
      .subscribe(response => {
        this.theme = response;
        // console.log( this.theme);
        this.pageTitle = this.theme.data.title;
        this.color = this.theme.data.themeColor;
        this.class = this.theme.data.themeClass;
        this.favicon = this.theme.data.siteFav;
        this.file2_input = this.theme.data.siteFav;
        // console.log( this.file2_input);
        this.setTitle(this.pageTitle);
        // this.render.setStyle(this.class);
        this.url = this.authService.getBaseUrl();
        this.body = this._document.getElementById('theme');
        this.body.classList.add(this.class);
        this._document.getElementById('appFavicon').setAttribute('href', this.url + '/frontend/logos/' +this.file2_input);
      });

      this.interactionService.getUserInfo().subscribe(info => {
        // console.log('info ', info);
        if (info) {
          this.infoArray.push(info);
          if (!document.getElementById(`chat-${info.fromId}-${info.toId}`)) {
            this.interactionService.setRootViewContainerRef(this.viewContainerRef);
            this.interactionService.addDynamicComponent(info, true);
          }
        }
      })
  }

  public setTitle(newTitle: any) {
    this.titleService.setTitle(newTitle);
  }
}


