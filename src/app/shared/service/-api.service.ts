import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { Ipost } from '../model/post';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl:string = environment.baseUrl;


  constructor(private _http:HttpClient) { }

  getAllPost():Observable<Ipost[]>{
    {Headers : new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      'authrised' : 'jwt Token'
    })}
    return this._http.get<Ipost[]>(this.baseUrl);
  };
  getCreatePost(post:Ipost):Observable<Ipost>{
    return this._http.post<Ipost>(this.baseUrl, post)
  }
  deletePost(id:number):Observable<any>{
    let deleteUrl = `${this.baseUrl}/${id}`;
    return this._http.delete<any>(deleteUrl)
  };
  updatePost(id:number, obj:Ipost):Observable<Ipost>{
    let updateUrl = `${this.baseUrl}/${id}`;
    return this._http.put<Ipost>(updateUrl, obj);
  };
  
}
