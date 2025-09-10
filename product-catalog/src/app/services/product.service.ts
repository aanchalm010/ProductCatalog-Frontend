import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Product, CreateProductDto, UpdateProductDto } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private base = `${environment.apiBaseUrl}/products`;

  constructor(private http: HttpClient) {}

  

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.base);
  }

  getById(id: number) {
    return this.http.get<Product>(`${this.base}/${id}`);
  }

  create(dto: CreateProductDto) {
    return this.http.post<Product>(this.base, dto);
  }

  update(id: number, dto: UpdateProductDto) {
    return this.http.put<void>(`${this.base}/${id}`, dto);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  uploadImage(id: number, file: File): Observable<HttpEvent<any>> {
    const form = new FormData();
    form.append('file', file, file.name);
    const req = new HttpRequest('POST', `${this.base}/${id}/image`, form, {
      reportProgress: true,
    });
    return this.http.request(req);
  }
}
