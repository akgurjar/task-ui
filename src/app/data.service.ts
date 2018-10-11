import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private _http: HttpClient) {
    this.fetchChartData();
  }
  fetchChartData(): Observable<string[][]> {
    return this._http.get('/assets/task/lossgaingraph.csv', {responseType: 'text'}).pipe(map(data => {
      const lines = data.split('\n');
      lines.shift();
      return lines.map(line => line.split(','));
    }));
  }
}
