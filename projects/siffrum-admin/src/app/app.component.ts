import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BaseComponent } from './base.component';
import { AppViewModel } from './models/view/app.viewmodel';
import { CommonService } from './services/common.service';
import { LogHandlerService } from './services/log-handler.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent extends BaseComponent<AppViewModel> implements OnInit{
  constructor(logHandler: LogHandlerService, commonService: CommonService) {
    super( commonService, logHandler);
    this.viewModel = new AppViewModel();
  }
  ngOnInit(){
  }
  title = 'siffrum-admin';
}
