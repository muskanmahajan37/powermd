import { AfterViewInit, Component, ElementRef, forwardRef, OnInit, ViewChild } from '@angular/core';
import { MarkdownTaskModel } from '../model/markdown.model';
import { MarkdownTaskItemService } from '../markdown-task-item/markdown-task-item.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import RadarChart from './RadarChart.js';
import d3 from 'd3';
import MarkdownHelper from '../utils/markdown.helper';

@Component({
  selector: 'component-markdown-radar-chart',
  templateUrl: './markdown-radar-chart.component.html',
  styleUrls: ['./markdown-radar-chart.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MarkdownRadarChartComponent),
      multi: true
    }
  ]
})
export class MarkdownRadarChartComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  @ViewChild('baseElement', {}) baseElement: ElementRef;
  items: MarkdownTaskModel[];
  data: any[] = [];
  private value: any;
  private disabled: boolean;

  constructor(private markdownTaskItemService: MarkdownTaskItemService) {
  }

  ngOnInit() {
  }


  onChange(value: any) {
  }

  onTouched() {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: any): void {
    this.value = obj;
    if (!this.value) {
      return;
    }

    this.items = this.value;
    this.render();
  }

  ngAfterViewInit(): void {

  }

  private taskToData(tasks: any[]) {
    const data: any[] = [];
    for (const task of tasks) {
      data.push(
        {
          axis: task.item.text,
          value: 3
        }
      );
    }

    return data;
  }

  /* tslint:disable */
  render() {
    if (!this.items) {
      return;
    }
    this.data = this.taskToData(this.items);

    const w = 500;
    const h = 500;

    let colorscale = d3.scale.category10();

    let LegendOptions = ['Smartphone', 'Tablet'];
    let data = [this.data];

    // Options for the Radar chart, other than default
    let mycfg = {
      width: w,
      height: h,
      maxValue: 5,
      levels: 5,
      ExtraWidthX: 300
    };

    RadarChart.draw('#chart', data, mycfg);

    let svg = d3.select('#body')
      .selectAll('svg')
      .append('svg')
      .attr('width', w + 300)
      .attr('height', h);

    let legend = svg.append('g')
      .attr('class', 'legend')
      .attr('height', 100)
      .attr('width', 200)
      .attr('transform', 'translate(90,20)')
    ;

    legend.selectAll('rect')
      .data(LegendOptions)
      .enter()
      .append('rect')
      .attr('x', w - 65)
      .attr('y', (d, i) => i * 20)
      .attr('width', 10)
      .attr('height', 10)
      .style('fill', function(d, i) {
        return colorscale(i.toString());
      })
    ;

    legend.selectAll('text')
      .data(LegendOptions)
      .enter()
      .append('text')
      .attr('x', w - 52)
      .attr('y', function(d, i) {
        return i * 20 + 9;
      })
      .attr('font-size', '11px')
      .attr('fill', '#737373')
      .text(function(d) {
        return d;
      })
    ;
  }
}
