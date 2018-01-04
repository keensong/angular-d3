import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-multiline',
    templateUrl: './multiline.component.html',
    styleUrls: ['./multiline.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class MultilineComponent implements OnInit {

    @ViewChild('chart') private chartContainer: ElementRef;
    private margin = { top: 40, right: 120, bottom: 30, left: 40 };
    private width: any;
    private height: any;
    private xScale: any;
    private yScale: any;
    private line: any;
    private chart: any;
    private element: any;
    private tipBox: any;
    private tooltip: any;
    private data: any;

    constructor() { }

    ngOnInit() {
        this.element = this.chartContainer.nativeElement;
        this.prepareChart();
        this.renderData();
    }

    prepareChart() {
        this.width = this.element.offsetWidth - this.margin.left - this.margin.right;
        this.height = this.element.offsetHeight - this.margin.top - this.margin.bottom;
        this.xScale = d3.scaleLinear().domain([1910, 2010]).range([0, this.width]);
        this.yScale = d3.scaleLinear().domain([0, 40000000]).range([this.height, 0]);
        this.line = d3.line()
            .x(d => this.xScale(d['year']))
            .y(d => this.yScale(d['population']));

        this.chart = d3.select(this.element)
            .append('svg')
            .attr('width', this.element.offsetWidth)
            .attr('height', this.element.offsetHeight)
            .append('g')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

        // Add the axes and a title
        const xAxis = d3.axisBottom(this.xScale).tickFormat(d3.format('.4'));
        const yAxis = d3.axisLeft(this.yScale).tickFormat(d3.format('.2s'));
        this.chart.append('g')
            .call(yAxis);
        this.chart.append('g')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(xAxis);
        this.chart.append('text')
            .html('State Population Over Time')
            .attr('x', 200);

    }


    renderData() {
        this.data = this.getData();
        this.chart.selectAll()
            .data(this.data).enter()
            .append('path')
            .attr('fill', 'none')
            .attr('stroke', d => d.color)
            .attr('stroke-width', 2)
            .datum(d => d.history)
            .attr('d', this.line);

        this.chart.selectAll()
            .data(this.data).enter()
            .append('text')
            .html(d => d.name)
            .attr('fill', d => d.color)
            .attr('alignment-baseline', 'middle')
            .attr('x', this.width)
            .attr('dx', '.5em')
            .attr('y', d => this.yScale(d.currentPopulation));


        this.tipBox = this.chart.append('rect')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('opacity', 0);

        const tooltip = d3.select('body').append('div').attr('class', 'tooltip');
        const tooltipLine = this.chart.append('line');

        this.tipBox.on('mouseout', function () {
            if (tooltip) {
                tooltip.style('display', 'none');
            }
            if (tooltipLine) {
                tooltipLine.attr('stroke', 'none');
            }
        });
        const self = this;
        this.tipBox.on('mousemove', function () {
            const year = Math.floor((self.xScale.invert(d3.mouse(self.tipBox.node())[0]) + 5) / 10) * 10;
            tooltipLine
                .attr('stroke', 'black')
                .attr('x1', self.xScale(year))
                .attr('x2', self.xScale(year))
                .attr('y1', 0)
                .attr('y2', self.height)
                .attr('class', 'tooltipLine');

            tooltip.html('Year : ' + year)
                .style('display', 'block')
                .style('left', d3.event.pageX + 20 + 'px')
                .style('top', d3.event.pageY - 20 + 'px')
                .selectAll()
                .data(self.data)
                .enter()
                .append('div')
                .style('color', d => d['color'])
                .html(
                d =>
                    d['name'] + ': ' +
                    d['history'].find(h => h.year === year).population
                );
        });
    }

    getData() {
        const data = [
            {
                'name': 'California',
                'show': true,
                'color': 'red',
                'currentPopulation': 37253956,
                'history': [
                    {
                        'year': 1910,
                        'population': 2377549
                    },
                    {
                        'year': 1920,
                        'population': 3426861
                    },
                    {
                        'year': 1930,
                        'population': 5677251
                    },
                    {
                        'year': 1940,
                        'population': 6907387
                    },
                    {
                        'year': 1950,
                        'population': 10586223
                    },
                    {
                        'year': 1960,
                        'population': 15717204
                    },
                    {
                        'year': 1970,
                        'population': 19953134
                    },
                    {
                        'year': 1980,
                        'population': 23667902
                    },
                    {
                        'year': 1990,
                        'population': 29760021
                    },
                    {
                        'year': 2000,
                        'population': 33871648
                    },
                    {
                        'year': 2010,
                        'population': 37253956
                    }
                ]
            },
            {
                'name': 'Michigan',
                'show': true,
                'color': 'blue',
                'currentPopulation': 9883640,
                'history': [
                    {
                        'year': 1910,
                        'population': 2810173
                    },
                    {
                        'year': 1920,
                        'population': 3668412
                    },
                    {
                        'year': 1930,
                        'population': 4842325
                    },
                    {
                        'year': 1940,
                        'population': 5256106
                    },
                    {
                        'year': 1950,
                        'population': 6371766
                    },
                    {
                        'year': 1960,
                        'population': 7823194
                    },
                    {
                        'year': 1970,
                        'population': 8875083
                    },
                    {
                        'year': 1980,
                        'population': 9262078
                    },
                    {
                        'year': 1990,
                        'population': 9295297
                    },
                    {
                        'year': 2000,
                        'population': 9938444
                    },
                    {
                        'year': 2010,
                        'population': 9883640
                    }
                ]
            },
            {
                'name': 'Texas',
                'show': true,
                'color': 'green',
                'currentPopulation': 25145561,
                'history': [
                    {
                        'year': 1910,
                        'population': 3896542
                    },
                    {
                        'year': 1920,
                        'population': 4663228
                    },
                    {
                        'year': 1930,
                        'population': 5824715
                    },
                    {
                        'year': 1940,
                        'population': 6414824
                    },
                    {
                        'year': 1950,
                        'population': 7711194
                    },
                    {
                        'year': 1960,
                        'population': 9579677
                    },
                    {
                        'year': 1970,
                        'population': 11196730
                    },
                    {
                        'year': 1980,
                        'population': 14229191
                    },
                    {
                        'year': 1990,
                        'population': 16986510
                    },
                    {
                        'year': 2000,
                        'population': 20851820
                    },
                    {
                        'year': 2010,
                        'population': 25145561
                    }
                ]
            }
        ];
        return data;
    }
}
