import { TestBed } from '@angular/core/testing';

import { FileService } from './file.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('FileService', () => {
  let mockService: FileService;
  let backEnd: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileService],
      imports: [HttpClientTestingModule],
    });
    mockService = TestBed.get(FileService);
    backEnd = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: FileService = TestBed.get(FileService);
    expect(service).toBeTruthy();
  });

  it('should call upload transcript file api correctly', () => {
    const mockFile = new File([''], 'example.pdf', { type: 'application/pdf', lastModified: 1527052033702 });
    const mockFormData: FormData = new FormData();
    mockFormData.append('file', mockFile);

    mockService.uploadFileTranscript(mockFile).subscribe();
    const req = backEnd.expectOne(`${environment.api}files/transcript`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockFormData);
    req.flush({
      tempFileName: '82d09f47-2fe3-4a33-b385-007a6dda8e13.pdf',
      path: 'temp_uploads/82d09f47-2fe3-4a33-b385-007a6dda8e13.pdf',
      fileName: mockFile.name
    });
    backEnd.verify();
  });

  it('should call upload profile picture api correctly', () => {
    const mockFile = new File([''], 'example.png', { type: 'image/png', lastModified: 1527052033702 });
    const mockFormData: FormData = new FormData();
    mockFormData.append('image-profile', mockFile);

    mockService.uploadImageProfile(mockFile).subscribe();
    const req = backEnd.expectOne(`${environment.api}files/image`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockFormData);
    req.flush({
      tempFileName: '82d09f47-2fe3-4a33-b385-007a6dda8e13.pdf',
      path: 'temp_uploads/82d09f47-2fe3-4a33-b385-007a6dda8e13.pdf',
      fileName: mockFile.name
    });
    backEnd.verify();
  });

  it('should call download image profile api correctly', () => {
    sessionStorage.setItem('idUser', '5c0fa703780bf500019a5aea');
    mockService.downloadImageProFile().subscribe();
    const req = backEnd.expectOne(`${environment.api}files/image/${sessionStorage.getItem('idUser')}`);
    expect(req.request.method).toEqual('GET');
    backEnd.verify();
  });

  it('should call download transcript file api correctly', () => {
    sessionStorage.setItem('idUser', '5c0fa703780bf500019a5aea');
    mockService.downloadTranscriptFile().subscribe();
    const req = backEnd.expectOne(`${environment.api}files/transcript/${sessionStorage.getItem('idUser')}`);
    expect(req.request.method).toEqual('GET');
    backEnd.verify();
  });

  it('should call remove transcript api correctly', () => {
    sessionStorage.setItem('idUser', '5c0fa703780bf500019a5aea');
    mockService.removeTranscript().subscribe();
    const req = backEnd.expectOne(`${environment.api}files/transcript/${sessionStorage.getItem('idUser')}`);
    expect(req.request.method).toEqual('DELETE');
    backEnd.verify();
  });

  it('when remove transcript success response should be "Remove transcript success"', () => {
    sessionStorage.setItem('idUser', '5c0fa703780bf500019a5aea');
    mockService.removeTranscript().subscribe((res) => {
      expect(res['message']).toEqual('Remove transcript success');
    });
    const req = backEnd.expectOne(`${environment.api}files/transcript/${sessionStorage.getItem('idUser')}`);
    expect(req.request.method).toEqual('DELETE');
    backEnd.verify();
    req.flush({
      message: 'Remove transcript success'
    });
  });
});
