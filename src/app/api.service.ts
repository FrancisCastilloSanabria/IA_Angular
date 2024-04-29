import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://wqqmeoqsimjodihxysqs.supabase.co/rest/v1/traduccionesGuardadas'; // URL de tu API
  private apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxcW1lb3FzaW1qb2RpaHh5c3FzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQyNjgzOTIsImV4cCI6MjAyOTg0NDM5Mn0.Hv51BuiUKsUQI0l0PZzbFTKc4K2D6SkN_ga5ts9w544'; // Clave API

  constructor(private http: HttpClient) { }

  getTraducciones(): Observable<any> {
    // Configurar los encabezados de la solicitud para incluir la clave API
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'apikey': this.apiKey
      })
    };

    // Realizar la solicitud GET con los encabezados configurados
    return this.http.get<any>(this.apiUrl, httpOptions);
  }
}
