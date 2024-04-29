import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private apiUrl = 'https://wqqmeoqsimjodihxysqs.supabase.co/rest/v1/traduccionesGuardadas'; // URL de tu API
  private apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxcW1lb3FzaW1qb2RpaHh5c3FzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQyNjgzOTIsImV4cCI6MjAyOTg0NDM5Mn0.Hv51BuiUKsUQI0l0PZzbFTKc4K2D6SkN_ga5ts9w544'; // Clave API de Supabase
  private translationApiUrl = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=en&to=es'; // URL de la API de traducción
  private translationApiKey = 'b328c314264746f885a937ada7680e72'; // Clave API de Azure Cognitive Services
  private translationLocation = 'eastus'; // Ubicación de Azure Cognitive Services

  constructor(private http: HttpClient) { }

  getTraducciones(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'apikey': this.apiKey
      })
    };
    return this.http.get<any>(this.apiUrl, httpOptions);
  }

  traducirPalabra(palabra: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Ocp-Apim-Subscription-Key', this.translationApiKey)
      .set('Ocp-Apim-Subscription-Region', this.translationLocation) // Agregar el parámetro de ubicación
      .set('Content-Type', 'application/json');

    const body = [{ 'Text': palabra }];

    return this.http.post<any>(this.translationApiUrl, body, { headers });
  }

  guardarTraduccion(palabraOriginal: string, palabraTraducida: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'apikey': this.apiKey
      })
    };
    const body = { palabraIngresada: palabraOriginal, palabraTraducida };
    console.log('Solicitud a enviar:', body); // Imprimir la solicitud antes de enviarla
    return this.http.post<any>(this.apiUrl, body, httpOptions);
  }

  eliminarTraduccion(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'apikey': this.apiKey
      })
    };
    return this.http.delete<any>(`${this.apiUrl}?id=eq.${id}`, httpOptions);
  }
  
}