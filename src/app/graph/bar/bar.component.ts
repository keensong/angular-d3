import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-bar',
    templateUrl: './bar.component.html',
    styleUrls: ['./bar.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class BarComponent implements OnInit {

    @ViewChild('chart') private chartContainer: ElementRef;
    private data: any;
    private margin: any = { top: 20, bottom: 20, left: 20, right: 20 };
    private chart: any;
    private width: number;
    private height: number;
    private xScale: any;
    private yScale: any;
    private colors: any;
    private xAxis: any;
    private yAxis: any;
    private element: any;


    ngOnInit() {
        this.element = this.chartContainer.nativeElement;
        this.generateData();
        this.createChart();
        this.updateChart();
    }

    generateData() {
        this.data = [];
        for (let i = 0; i < (8 + Math.floor(Math.random() * 10)); i++) {
            this.data.push([`Index ${i}`, Math.floor(Math.random() * 100)]);
        }
    }

    createChart() {
        const element = this.element;
        this.width = element.offsetWidth - this.margin.left - this.margin.right;
        this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
        const svg = d3.select(element).append('svg')
            .attr('width', element.offsetWidth)
            .attr('height', element.offsetHeight);
        // chart plot area
        this.chart = svg.append('g')
            .attr('class', 'bars')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
        // define X & Y domains
        const xDomain = this.data.map(d => d[0]);
        const yDomain = [0, d3.max(this.data, d => d[1])];
        // create scale
        this.xScale = d3.scaleBand()
            .padding(0.1)
            .domain(xDomain)
            .rangeRound([0, this.width]);
        this.yScale = d3.scaleLinear()
            .domain(<any[]>yDomain)
            .range([this.height, 0]);
        // bar colors
        this.colors = d3.scaleLinear()
            .domain([0, this.data.length])
            .range(<any[]>['red', 'blue']);
        // x & y axis
        this.xAxis = svg.append('g')
            .attr('class', 'axis axis-x')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
            .call(d3.axisBottom(this.xScale));
        this.yAxis = svg.append('g')
            .attr('class', 'axis axis-y')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
            .call(d3.axisLeft(this.yScale));
    }

    updateChart() {

        // update scales & axis
        this.xScale.domain(this.data.map(d => d[0]));
        this.yScale.domain([0, d3.max(this.data, d => d[1])]);
        this.colors.domain([0, this.data.length]);
        this.xAxis.transition().call(d3.axisBottom(this.xScale));
        this.yAxis.transition().call(d3.axisLeft(this.yScale));
        const update = this.chart.selectAll('.bar').data(this.data);
        // remove exiting bars
        update.exit().remove();
        // update existing bars
        this.chart.selectAll('.bar')
            .transition()
            .attr('x', d => this.xScale(d[0]))
            .attr('y', d => this.yScale(d[1]))
            .attr('width', d => this.xScale.bandwidth())
            .attr('height', d => this.height - this.yScale(d[1]))
            .style('fill', (d, i) => this.colors(i));
        // add new bars
        const bars = update.enter().append('rect')
            .attr('class', 'bar')
            .attr('x', d => this.xScale(d[0]))
            .attr('y', d => this.yScale(0))
            .attr('width', this.xScale.bandwidth())
            .attr('height', 0)
            .style('fill', (d, i) => this.colors(i))
            .attr('y', d => this.yScale(d[1]))
            .attr('height', d => this.height - this.yScale(d[1]));

        bars.transition().delay((d, i) => i * 10);

        const tooltip = d3.select('body').append('div').attr('class', 'toolTip');
        bars.on('mousemove', function (d) {
            tooltip
                .style('left', d3.event.pageX - 50 + 'px')
                .style('top', d3.event.pageY - 70 + 'px')
                .style('display', 'inline-block')
                .html('Name : ' + (d[0]) + '<br>' + 'Price : $' + (d[1]));
        });
        bars.on('mouseout', function (d) {
            tooltip.style('display', 'none');
        });
    }

}
