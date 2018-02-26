import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.css']
})
export class ImagePreviewComponent implements OnInit {

  localUrl: any[];

  @Input('imageFile') imageFile : string;
  @Input('width') width: any;
  @Input('height') height: any;

  private safeUrl: SafeUrl;


  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
     this.safeUrl = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,'+this.imageFile);
  }


}
