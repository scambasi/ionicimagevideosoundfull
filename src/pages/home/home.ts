import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File, Entry, FileError } from '@ionic-native/file';
import { NativeStorage } from '@ionic-native/native-storage';

declare var cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage implements OnInit{

  public photos:any;
  public base64Image:string ;
 public imageUrl = '';

  constructor(public navCtrl: NavController,private camera: Camera,
    public alertCtrl: AlertController,private file:File,
     private toastCtrl: ToastController,private nativeStorage: NativeStorage) {

  }
 
  ngOnInit()
  {
    this.photos=[];
    this.nativeStorage.getItem('myitem')
  .then(
    data => 
    {console.log(data),
    this.photos=data;},
    error => console.error(error)
  );

  }
  
  takePhoto()
  {
    let options = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 500,
      targetHeight: 500,
      quality: 100,
    //  allowEdit: true,
      correctOrientation: false,
    //  saveToPhotoAlbum: true,
      // mediaType: 0
    };
    this.camera.getPicture(options)
    .then((imageData)=>{
      this.base64Image = "data:image/jpeg;base64," + imageData;

      this.photos.push(this.base64Image);
     this.photos.reverse();
     this.nativeStorage.setItem('myitem', this.photos)
  .then(
    () => console.log('Stored item!'),
    error => console.error('Error storing item', error)
  );

    })
    .catch(err=>{
      console.log(err);
    });
  }
  deletePhoto(index)
  {
    const alert = this.alertCtrl.create({
      title: 'Fotoğraf Sil!',
      subTitle: 'Silmek istiyormusun',
      buttons: [
        { text:'Evet',
          handler:()=>{
            this.photos.splice(index,1);
          }}
       
      ]
    });
    alert.present();
  }
  onTakePhotoV2() {
    this.camera.getPicture({
      encodingType: this.camera.EncodingType.JPEG,
      destinationType: this.camera.DestinationType.DATA_URL,
      correctOrientation: true
    })
      .then(
        imageData => {
          const currentName = imageData.replace(/^.*[\\\/]/, '');
          const path = imageData.replace(/[^\/]*$/, '');
          const newFileName = new Date().getUTCMilliseconds() + '.jpg';
          this.file.moveFile(path, currentName, cordova.file.dataDirectory, newFileName)
            .then(
              (data: Entry) => {
                this.imageUrl = "data:image/jpeg;base64," + imageData;
                this.camera.cleanup();
                // File.removeFile(path, currentName);
              }
            )
            .catch(
              (err: FileError) => {
                this.imageUrl = '';
                const toast = this.toastCtrl.create({
                  message: 'Could not save the image. Please try again',
                  duration: 2500
                });
                toast.present();
                this.camera.cleanup();
              }
            );
          this.imageUrl = imageData;
        }
      )
      .catch(
        err => {
          const toast = this.toastCtrl.create({
            message: 'Could not take the image. Please try again',
            duration: 2500
          });
          toast.present();
        }
      );
  }

}
