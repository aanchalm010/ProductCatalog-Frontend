import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar'; // optional
import { ImageUploadComponent } from '../../shared/image-upload/image-upload';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ImageUploadComponent, RouterModule], 
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = false;

  constructor(private svc: ProductService, private snack: MatSnackBar) {}

  ngOnInit(): void { this.load(); }

  load() {
    this.loading = true;
    this.svc.getAll().subscribe({
      next: data => { this.products = data; this.loading = false; },
      error: err => { console.error(err); this.loading = false; this.snack.open('Failed to load products'); }
    });
  }

  delete(id: number) {
    if (!confirm('Delete this product?')) return;
    this.svc.delete(id).subscribe({
      next: () => { this.snack.open('Deleted'); this.load(); },
      error: () => this.snack.open('Delete failed')
    });
  }
}
