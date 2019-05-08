import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  uploadFileTranscript(file): Observable<object> {
    const payload = new FormData();
    payload.append('file', file);
    return this.http.post<object>(`${environment.api}files/transcript`, payload, {
      headers: new HttpHeaders({
        Authorization: sessionStorage.getItem('token')
      })
    }
    );
  }

  uploadDegreeCertificate(file): Observable<object> {
    const payload = new FormData();
    payload.append('file', file);
    return this.http.post<object>(`${environment.api}files/degreecertificate`, payload, {
      headers: new HttpHeaders({
        Authorization: sessionStorage.getItem('token')
      })
    }
    );
  }

  uploadImageProfile(file): Observable<object> {
    const payload = new FormData();
    payload.append('image-profile', file);
    return this.http.post<object>(`${environment.api}files/image`, payload, {
      headers: new HttpHeaders({
        Authorization: sessionStorage.getItem('token')
      })
    }
    );
  }

  downloadImageProFile(): Observable<Blob> {
    if (sessionStorage.getItem('idUser')) {
      return this.http.get(`${environment.api}files/image/${sessionStorage.getItem('idUser')}`, {
        headers: new HttpHeaders({
          Authorization: sessionStorage.getItem('token')
        }),
        responseType: 'blob'
      });
    }
  }

  downloadTranscriptFile(): Observable<Blob> {
    if (sessionStorage.getItem('idUser')) {
      return this.http.get(`${environment.api}files/transcript/${sessionStorage.getItem('idUser')}`, {
        headers: new HttpHeaders({
          Authorization: sessionStorage.getItem('token')
        }),
        responseType: 'blob'
      });
    }
  }

  removeTranscript(): Observable<object> {
    if (sessionStorage.getItem('idUser')) {
      return this.http.delete(`${environment.api}files/transcript/${sessionStorage.getItem('idUser')}`, {
        headers: new HttpHeaders({
          Authorization: sessionStorage.getItem('token')
        })
      });
    }
  }

  removeImage(): Observable<object> {
    if (sessionStorage.getItem('idUser')) {
      return this.http.delete(`${environment.api}files/image/${sessionStorage.getItem('idUser')}`, {
        headers: new HttpHeaders({
          Authorization: sessionStorage.getItem('token')
        })
      });
    }
  }


}
