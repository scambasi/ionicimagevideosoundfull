import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { VideopagePage } from '../videopage/videopage';
import { MicpagePage } from '../micpage/micpage';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  hometab = HomePage;
  videotab = VideopagePage;
  mictab = MicpagePage;

  constructor() {

  }
}
