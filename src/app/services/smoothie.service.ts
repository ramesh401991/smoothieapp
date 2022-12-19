import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Smoothie } from '../common/smoothie';


import { Nutrition } from '../common/nutrition';
import {  map, Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmoothieService implements OnInit {

  private baseUrl = "http://localhost:8080/api/smoothies";
  smoothies: Smoothie[] = [];
  textChange = new Subject<string>();
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
      //Authorization: 'my-auth-token'
    })
  };

  constructor(private httpClient: HttpClient) { }

  
  getSmoothiesList(searchText: string): Observable<Smoothie[]> {
    //console.log("getSmoothiesList");
    //console.log(searchText);
    //TODO: Pass the SearchText to the Server to retrieve the filtered values
    let url = this.baseUrl;
    
    if(searchText != ""){
      url += "/search/findByNameContaining?name="+searchText;
    }
    console.log(url);
    return this.httpClient.get<GetResponse>(url).pipe(
      map(response => response._embedded.smoothies)
    );
  }

  getNutritionValuesOfSmoothie(url: string): Observable<Nutrition>{
    return this.httpClient.get<Nutrition>(url);
  }

  getSmoothie(index: number): Smoothie{
    //console.log(this.smoothies[index-1]);
    return this.smoothies[index - 1];
  }

  getSmoothieByURL(url: string): Observable<Smoothie>{
    return this.httpClient.get<Smoothie>(url);
  }

  //Create Smoothie
  createSmoothie(smoothie: Smoothie): Promise<Smoothie>{
    
    const promise = new Promise<any>((resolve,reject)=>{
      this.addNutrition(smoothie.nutrition).subscribe(data => {
        console.log(data);
        this.addSmoothie(smoothie).subscribe(
          res => {
            console.log(res);
            resolve(null);            
          }
        )

      });
      
      
    });
    return promise;
  }

  /** POST: add a new Smoothie to the database */
  addSmoothie(smoothie: Smoothie): Observable<Smoothie> {
    return this.httpClient.post<Smoothie>(this.baseUrl, smoothie, this.httpOptions)
      .pipe(        
        //catchError(this.handleError('addSmoothie', smoothie))
      );
  }

  addNutrition(nutrition: Nutrition): Observable<Nutrition> {
    let url = "http://localhost:8080/api/nutritions";
    return this.httpClient.post<Nutrition>(url, nutrition, this.httpOptions)
      .pipe(
        //catchError(this.handleError('addSmoothie', smoothie))
      );
  }

  /** PUT: Update Smoothie in the database */
  modifySmoothie(smoothie: Smoothie): Observable<Smoothie> {
    return this.httpClient.put<Smoothie>(smoothie._links.self.href, smoothie, this.httpOptions)
      .pipe(        
        //catchError(this.handleError('addSmoothie', smoothie))
      );
  }

  modifyNutrition(nutrition: Nutrition): Observable<Nutrition> {
    return this.httpClient.put<Nutrition>(nutrition._links.self.href, nutrition, this.httpOptions)
      .pipe(        
        //catchError(this.handleError('addSmoothie', smoothie))
      );
  }

  /** DELETE: delete Smoothie from the database */
  deleteSmoothie(smoothie: Smoothie): Observable<unknown> {
    return this.httpClient.delete(smoothie._links.self.href, this.httpOptions)
      .pipe(        
        //catchError(this.handleError('addSmoothie', smoothie))
      );
  }

  //Update Smoothie
  updateSmoothie(smoothie: Smoothie){
    //Make Http Put Request
    const promise = new Promise<any>((resolve,reject)=>{
      this.modifySmoothie(smoothie).subscribe((data)=>{
        console.log(data);
        this.getNutritionValuesOfSmoothie(smoothie._links.nutrition.href).subscribe((res)=>{
          console.log(res);
          smoothie.nutrition._links = res._links;
          this.modifyNutrition(smoothie.nutrition).subscribe((res2)=>{
            console.log(res2);
            resolve(null);
          })
        })
      })      
  });

  return promise;
  }

  //Delete Smoothie
  removeSmoothie(smoothie: Smoothie){
    //Make Http delete Request
    const promise = new Promise<any>((resolve,reject)=>{
      this.deleteSmoothie(smoothie).subscribe((data)=>{
        console.log(data);
        resolve(null);
      });        
    });

    return promise;
  }

  ngOnInit(): void {
    
  }

  listSmoothies(searchText: string): Promise<any>{
    const promise = new Promise<any>((resolve,reject)=>{
      this.getSmoothiesList(searchText).subscribe(
        data => {
          this.smoothies = data;
          resolve(null);
        }
      )
    });
    return promise;
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}

interface GetResponse{
  _embedded: {
    smoothies: Smoothie[];
  }
}
