import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private baseUrl: string = 'http://localhost:8080/images/';

  constructor(private http: HttpClient) { }

  getImageUrl(imageName: string): Observable<string> {
    return this.http.get<{ url: string }>(`${this.baseUrl}${imageName}`).pipe(
      map(response => response.url)
    );
  }
}
