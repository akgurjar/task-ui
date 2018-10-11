import { Component, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as Chartist from 'chartist';
import { DataService, LABELS } from './data.service';

declare const Math;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  drawerOpened = window.innerWidth >= 600 ? true : false;
  formGroup: FormGroup;
  topCompanies: any[] = [];
  chart = null;
  constructor(fb: FormBuilder, private _dataService: DataService) {
    this.formGroup = fb.group({
      data: [null]
    });
  }
  onToggleDrawer() {
    this.drawerOpened = !this.drawerOpened;
  }
  ngAfterViewInit() {
    this._dataService.fetchChartData().subscribe((companies: any[]) => {
      this.topCompanies = companies.sort((a, b) => Math.abs(b.change) - Math.abs(a.change)).slice(0, 9);
      this.createChart(this.topCompanies[0]);
    });
  }
  createChart(company: any) {
    this.chart = new Chartist.Line('.ct-chart', {
      labels: LABELS,
      series: [company.data]
    }, {
      showArea: true,
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0.2
      })
    });
  }
  isGain(change: any): boolean {
    return Math.abs(change) === change;
  }
  onButtonClick(company) {
    this.chart.update({series: [company.data]});
  }
}
