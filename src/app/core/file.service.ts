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
    return this.http.post<object>(`${environment.api}v1/files/transcript`, payload, {
      headers: new HttpHeaders({
        Authorization: sessionStorage.getItem('token')
      })
    }
    );
  }

  uploadDegreeCertificate(file): Observable<object> {
    const payload = new FormData();
    payload.append('file', file);
    return this.http.post<object>(`${environment.api}v1/files/degreecertificate`, payload, {
      headers: new HttpHeaders({
        Authorization: sessionStorage.getItem('token')
      })
    }
    );
  }

  uploadIdCard(file): Observable<object> {
    const payload = new FormData();
    payload.append('file', file);
    return this.http.post<object>(`${environment.api}v1/files/idcard`, payload, {
      headers: new HttpHeaders({
        Authorization: sessionStorage.getItem('token')
      })
    }
    );
  }

  uploadImageProfile(file): Observable<object> {
    const payload = new FormData();
    payload.append('image-profile', file);
    return this.http.post<object>(`${environment.api}v1/files/image`, payload, {
      headers: new HttpHeaders({
        Authorization: sessionStorage.getItem('token')
      })
    }
    );
  }

  downloadImageProFile(userId?: string): Observable<Blob> {
    const id = userId || sessionStorage.getItem('idUser');
    if (id) {
      return this.http.get(`${environment.api}v1/files/image/${id}`, {
        headers: new HttpHeaders({
          Authorization: sessionStorage.getItem('token')
        }),
        responseType: 'blob'
      });
    }
  }

  downloadTranscriptFile(userId?: string): Observable<Blob> {
    const id = userId || sessionStorage.getItem('idUser');
    if (id) {
      return this.http.get(`${environment.api}v1/files/transcript/${id}`, {
        headers: new HttpHeaders({
          Authorization: sessionStorage.getItem('token')
        }),
        responseType: 'blob'
      });
    }
  }

  downloadDegreeCertificateFile(userId?: string): Observable<Blob> {
    const id = userId || sessionStorage.getItem('idUser');
    if (id) {
      return this.http.get(`${environment.api}v1/files/degreecertificate/${id}`, {
        headers: new HttpHeaders({
          Authorization: sessionStorage.getItem('token')
        }),
        responseType: 'blob'
      });
    }
  }

  downloadIdCardFile(userId?: string): Observable<Blob> {
    const id = userId || sessionStorage.getItem('idUser');
    if (id) {
      return this.http.get(`${environment.api}v1/files/idcard/${id}`, {
        headers: new HttpHeaders({
          Authorization: sessionStorage.getItem('token')
        }),
        responseType: 'blob'
      });
    }
  }

  removeTranscript(): Observable<object> {
    if (sessionStorage.getItem('idUser')) {
      return this.http.delete(`${environment.api}v1/files/transcript/${sessionStorage.getItem('idUser')}`, {
        headers: new HttpHeaders({
          Authorization: sessionStorage.getItem('token')
        })
      });
    }
  }

  removeImage(): Observable<object> {
    if (sessionStorage.getItem('idUser')) {
      return this.http.delete(`${environment.api}v1/files/image/${sessionStorage.getItem('idUser')}`, {
        headers: new HttpHeaders({
          Authorization: sessionStorage.getItem('token')
        })
      });
    }
  }

  removeDegreeCertificate(): Observable<object> {
    if (sessionStorage.getItem('idUser')) {
      return this.http.delete(`${environment.api}v1/files/degreecertificate/${sessionStorage.getItem('idUser')}`, {
        headers: new HttpHeaders({
          Authorization: sessionStorage.getItem('token')
        })
      });
    }
  }

  removeIdCard(): Observable<object> {
    if (sessionStorage.getItem('idUser')) {
      return this.http.delete(`${environment.api}v1/files/idcard/${sessionStorage.getItem('idUser')}`, {
        headers: new HttpHeaders({
          Authorization: sessionStorage.getItem('token')
        })
      });
    }
  }

}
