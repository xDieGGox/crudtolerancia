import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroments';
import { Mascota } from '../domain/mascota';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  constructor(private http: HttpClient) { }

  getMascotas(){
    let url = enviroment.WS_PATH+"/mascotas/list";
    return this.http.get<any>(url);
  }

  saveMascota(mascota: Mascota){
    let url = enviroment.WS_PATH+"/mascotas";
    return this.http.post<any>(url, mascota);
  }

  deleteMascota(codigo: number){
    let url = enviroment.WS_PATH+"/mascotas?id="+codigo;
    return this.http.delete<any>(url); 
  }

  updateMascota(mascota: Mascota) {
    let url = enviroment.WS_PATH + "/mascotas";
    return this.http.put<any>(url, mascota);
  }
}
