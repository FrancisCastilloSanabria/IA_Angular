import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from './api.service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  traducciones: any[] = []; // Variable para almacenar las traducciones
  horaActual: string = '';
  fechaActual: string = '';
  palabraATraducir: string = '';
  palabraTraducida: string = '';

  constructor(private apiService: ApiServiceService) {}

  ngOnInit(): void {
    this.obtenerTraducciones(); // Llama al método para obtener las traducciones cuando se inicializa el componente
    this.actualizarFechaYHora(); // Inicia el proceso para actualizar la fecha y la hora
  }

  obtenerTraducciones() {
    this.apiService.getTraducciones().subscribe(
      (data: any[]) => {
        this.traducciones = data.map((item) => ({
          id: item.id, // Suponiendo que el ID se llama "id", cámbialo si es diferente
          palabraIngresada: item.palabraIngresada,
          palabraTraducida: item.palabraTraducida
        }));
      },
      error => {
        console.error('Error al obtener traducciones:', error);
      }
    );
  }

  eliminarTraduccion(id: number) {
    this.apiService.eliminarTraduccion(id).subscribe(
      (response) => {
        console.log('Traducción eliminada:', response);
        // Volver a cargar las traducciones después de eliminar una
        this.obtenerTraducciones();
      },
      error => {
        console.error('Error al eliminar traducción:', error);
      }
    );
  }
  

  actualizarFechaYHora() {
    setInterval(() => {
      const ahora = new Date();
      const diaSemana = this.obtenerNombreDiaSemana(ahora.getDay());
      const dia = ahora.getDate();
      const mes = this.obtenerNombreMes(ahora.getMonth());
      const año = ahora.getFullYear();
      const hora = ahora.toLocaleTimeString();
      this.horaActual = hora;
      this.fechaActual = `${diaSemana} ${dia} de ${mes} de ${año}`;
    }, 1000); // Actualiza la fecha y la hora cada segundo
  }

  obtenerNombreDiaSemana(dia: number): string {
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return diasSemana[dia];
  }

  obtenerNombreMes(mes: number): string {
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    return meses[mes];
  }

  traducirPalabra() {
    this.apiService.traducirPalabra(this.palabraATraducir).subscribe(
      (response: any) => {
        this.palabraTraducida = response[0].translations[0].text;
        // Guardar la palabra original y la traducción
        this.apiService.guardarTraduccion(this.palabraATraducir, this.palabraTraducida).subscribe(
          (data: any) => {
            console.log('Traducción guardada:', data);
            this.obtenerTraducciones();
          },
          error => {
            console.error('Error al guardar la traducción:', error);
          }
        );
      },
      error => {
        console.error('Error al traducir la palabra:', error);
      }
    );
  }
}