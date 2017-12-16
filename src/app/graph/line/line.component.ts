import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-line',
    templateUrl: './line.component.html',
    styleUrls: ['line.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class LineComponent implements OnInit {

    @ViewChild('chart') private chartContainer: ElementRef;
    private data: any;
    private margin: any = { top: 20, bottom: 20, left: 20, right: 20 };
    private chart: any;
    private width: number;
    private height: number;
    private xScale: any;
    private yScale: any;
    private element: any;

    constructor() { }

    ngOnInit() {
        this.element = this.chartContainer.nativeElement;
        this.data = this.getData();
        this.createChart();
        this.createLineChart();
    }

    getData() {
        const data = [
            { date: '1-May-07', close: 99.47 },
            { date: '2-May-07', close: 100.39 },
            { date: '3-May-07', close: 100.40 },
            { date: '4-May-07', close: 100.81 },
            { date: '7-May-07', close: 103.92 },
            { date: '8-May-07', close: 105.06 },
            { date: '9-May-07', close: 106.88 },
            { date: '10-May-07', close: 107.34 },
            { date: '11-May-07', close: 108.74 },
            { date: '14-May-07', close: 109.36 },
            { date: '15-May-07', close: 107.52 },
            { date: '16-May-07', close: 107.34 },
            { date: '17-May-07', close: 109.44 },
            { date: '18-May-07', close: 110.02 },
            { date: '21-May-07', close: 111.98 },
            { date: '22-May-07', close: 113.54 },
            { date: '23-May-07', close: 112.89 },
            { date: '24-May-07', close: 110.69 },
            { date: '25-May-07', close: 113.62 }
        ];

        return data;
    }

    createChart() {
        const svg = d3.select(this.element).append('svg')
            .attr('width', this.element.offsetWidth)
            .attr('height', this.element.offsetHeight);
        this.width = +svg.attr('width') - this.margin.left - this.margin.right,
            this.height = +svg.attr('height') - this.margin.top - this.margin.bottom;
        this.chart = svg.append('g')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
        this.xScale = d3.scaleTime()
            .rangeRound([0, this.width]);

        this.yScale = d3.scaleLinear()
            .rangeRound([this.height, 0]);

    }
    createLineChart() {
        const self = this;
        const parseTime = d3.timeParse('%d-%b-%y');
        const formatTime = d3.timeFormat('%e %B');
        this.data.forEach(function (d) {
            d.date = parseTime(d.date);
            d.close = +d.close;
        });

        const line = d3.line()
            .x(function (d) { return self.xScale(d['date']); })
            .y(function (d) { return self.yScale(d['close']); });

        this.xScale.domain(d3.extent(this.data, function (d) { return d['date']; }));
        this.yScale.domain(d3.extent(this.data, function (d) { return d['close']; }));

        this.chart.append('path')
            .attr('class', 'line')
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round')
            .attr('stroke-width', 1.5)
            .attr('d', line(this.data));

        this.chart.append('g')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(d3.axisBottom(this.xScale))
            .select('.domain')
            .remove();

        this.chart.append('g')
            .call(d3.axisLeft(this.yScale))
            .append('text')
            .attr('fill', '#000')
            .attr('transform', 'rotate(90)')
            .attr('y', 10)
            .attr('dy', '0.71em')
            .attr('text-anchor', 'end')
            .text('Price ($)');

        const dots = this.chart.selectAll('dot')
            .data(this.data)
            .enter().append('circle')
            .attr('r', 3)
            .attr('class', 'dots')
            .attr('cx', function (d) { return self.xScale(d.date); })
            .attr('cy', function (d) { return self.yScale(d.close); });

        const tooltip = d3.select('body').append('div')
            .attr('class', 'tooltip');

        dots.on('mouseover', function (d) {
            tooltip.transition()
                .duration(300);
            tooltip
                .style('left', (d3.event.pageX + 6) + 'px')
                .style('top', (d3.event.pageY - 28) + 'px')
                .style('display', 'inline-block')
                .html(formatTime(d.date) + '<br/>' + d.close);
        });
        dots.on('mouseout', function (d) {
            tooltip.transition()
                .duration(500)
                .style('display', 'none');
        });
    }
}
