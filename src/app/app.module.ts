import { IonicStorageModule } from '@ionic/storage';
import { RegisterPageModule } from './pages/auth/register/register.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule }    from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { Media } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileTransferObject  } from '@ionic-native/file-transfer/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { ImageResizer } from '@ionic-native/image-resizer/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData, DatePipe } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { TypehommeloisPopoverComponent } from './components/typehommeloisPopover/typehommelois-popover/typehommelois-popover.component';

registerLocaleData(localeFr, 'fr-FR');
@NgModule({
  declarations: [AppComponent, TypehommeloisPopoverComponent],
  entryComponents: [TypehommeloisPopoverComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    RegisterPageModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'fr-FR' },  
    FileTransfer,
    FileTransferObject, 
    NativeStorage,
    MediaCapture,
    Media,
    File,
    FileChooser,
    WebView,
    Camera,
    ImageResizer,
    DatePipe,
    InAppBrowser,
    DocumentViewer,
    FileOpener
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
