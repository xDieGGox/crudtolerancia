import { Component } from '@angular/core';
import { MascotasService } from '../../services/mascotas.service';
import { Mascota } from '../../domain/mascota';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-mascota',
  templateUrl: './mascota.component.html',
  styleUrl: './mascota.component.scss'
})
export class MascotaComponent {
  mascotas: any;
  mascota: Mascota = new Mascota();
  mascotaEliminar: Mascota = new Mascota();
  email = { to: 'diegoloja85@gmail.com', subject: 'NUEVA MASCOTA', text: 'Se registro' };

  constructor(private mascotasService:MascotasService, private emailService:EmailService){}


  ngOnInit(): void {
    this.mascotas = this.mascotasService.getMascotas();
  }

  enviarCorreo(){
    this.emailService.sendEmail(this.email).subscribe(
      response => {
        console.log('Email sent successfully:', response);
      },
      error=>{
        console.error('Error sending email:', error);
      }
    )
  }

  guardarMascota(){
    if (this.mascota.codigo_mascota) {
      this.mascotasService.updateMascota(this.mascota).subscribe(data => {
        this.ngOnInit();
        this.mascota = new Mascota();
      });
    } else {
      this.mascotasService.saveMascota(this.mascota).subscribe(data => {
        this.ngOnInit();
        this.mascota = new Mascota();

      });
    }
  }

  eliminarMascota(mascota: Mascota){
    this.mascotaEliminar=mascota;
    console.log(this.mascotaEliminar);
    if(this.mascotaEliminar.codigo_mascota!=undefined){
      const codigomascota: number = this.mascotaEliminar.codigo_mascota;
      this.mascotasService.deleteMascota(codigomascota).subscribe(data=>{
        this.ngOnInit();
      })
    }
  }

  cargarMascota(mascota: Mascota) {
    this.mascota = { ...mascota };
  }

}
