import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-image-upload',
  // template: `
  //   <input type="file" (change)="onFile($event)" />
  //   <div *ngIf="progress>=0">Uploading: {{progress}}%</div>
  // `,
  templateUrl: './image-upload.html',
  styleUrls: ['./image-upload.css']
})
export class ImageUploadComponent {
  @Input() productId!: number;
  @Output() uploaded = new EventEmitter<void>();
  progress = -1;
  constructor(private svc: ProductService) {}

  onFile(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    this.svc.uploadImage(this.productId, file).subscribe({
      next: ev => {
        if (ev.type === HttpEventType.UploadProgress && ev.total) {
          this.progress = Math.round(100 * ev.loaded / ev.total);
        } else if (ev.type === HttpEventType.Response) {
          this.progress = -1;
          this.uploaded.emit();
        }
      },
      error: () => {
        this.progress = -1;
        alert('Upload failed');
      }
    });
  }
}
