import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MediaCapture} from '@ionic-native/media-capture';
import { Media} from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { IonicStorageModule} from '@ionic/storage';
import { MicpagePage } from '../pages/micpage/micpage';
import { NativeStorage } from '@ionic-native/native-storage';
import { VideoPlayer } from '@ionic-native/video-player';
import { VideopagePage } from '../pages/videopage/videopage';

@NgModule({
  declarations: [
    MyApp,
    VideopagePage,
    MicpagePage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    VideopagePage,
    MicpagePage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,Camera,MediaCapture,Media,File,NativeStorage,VideoPlayer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
