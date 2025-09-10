import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.css'],
  standalone: true,   // ✅ standalone component
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule   // ✅ import Angular Material snack bar
  ]
})
export class ProductFormComponent implements OnInit {
  form: FormGroup;
  id?: number;

  constructor(
    private fb: FormBuilder,
    private svc: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : undefined;

    if (this.id) {
      this.svc.getById(this.id).subscribe({
        next: p => this.form.patchValue({ name: p.name, price: p.price }),
        error: () => this.snack.open('Failed to load product', 'Close', { duration: 3000 })
      });
    }
  }

  save(): void {
    if (this.form.invalid) {
      this.snack.open('Please fix validation', 'Close', { duration: 2000 });
      return;
    }

    const dto = this.form.value;

    if (this.id) {
      this.svc.update(this.id, dto).subscribe({
        next: () => {
          this.snack.open('Updated', 'Close', { duration: 2000 });
          this.router.navigate(['/']);
        },
        error: () => this.snack.open('Update failed', 'Close', { duration: 3000 })
      });
    } else {
      this.svc.create(dto).subscribe({
        next: () => {
          this.snack.open('Created', 'Close', { duration: 2000 });
          this.router.navigate(['/']);
        },
        error: () => this.snack.open('Create failed', 'Close', { duration: 3000 })
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/']);  // ✅ clean cancel method
  }
}
