import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const LABELS = ['-50%', '-25%', '-15%', '-10%', '-8%', '-6%', '-4%', '-2%', '2%', '4%', '6%', '8%', '10%', '15%', '25%', '50%'];

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private _http: HttpClient) {
    this.fetchChartData();
  }
  fetchChartData(): Observable<any[]> {
    return this._http.get('/assets/task/lossgaingraph.csv', {responseType: 'text'}).pipe(map(data => {
      const companies = data.split('\n');
      companies.shift(); // remove label line
      return companies.map(companyData => {
        const company = companyData.split(','),
          ticker = company.shift(),
          name = company.shift();
        return {
          ticker,
          name,
          data: company.map(parseFloat).filter(value => !isNaN(value)),
          get change() {
            const sum = this.data.reduce((total, value) => total + value, 0);
            return Math.round(this.data.reduce((total, value, i) => total + value * parseInt(LABELS[i], 10), 0) * 100 / sum) / 100;
          }
        };
      });
    }));
  }
}
