import { Component, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as Chartist from 'chartist';
import { DataService } from './data.service';

const LABELS = ['-50%', '-25%', '-15%', '-10%', '-8%', '-6%', '-4%', '-2%', '2%', '4%', '6%', '8%', '10%', '15%', '25%', '50%'];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  drawerOpened = window.innerWidth >= 600 ? true : false;
  formGroup: FormGroup;
  constructor(fb: FormBuilder, private _dataService: DataService) {
    this.formGroup = fb.group({
      data: [null]
    });
  }
  onToggleDrawer() {
    this.drawerOpened = !this.drawerOpened;
  }
  ngAfterViewInit() {
    this._dataService.fetchChartData().subscribe((data: string[][]) => {
      const series = data[0];
      series.shift();
      series.shift();
      const chart = new Chartist.Line('.ct-chart', {
        labels: LABELS,
        series: [series]
      }, {
        showArea: true,
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0.2
        })
      });
    });
  }
}
