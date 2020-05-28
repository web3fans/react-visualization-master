import React, { Component } from "react";
import { range as d3Range } from "d3-array";
import { getXScale, getYScale } from "./Helper";
import { select, selectAll } from "d3-selection";

const fill="#F00078";
const margin ={ top: 10, right: 10, bottom: 30, left: 40 };

class BarChart extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    const { width, height, data } = this.props;
    const xScale = getXScale(data, width, height, margin);
    const yScale = getYScale(data, width, height, margin);
    const container = this.refs.container;
    const chart = select(container)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    chart.append("g").classed("x-axis", true);
    chart.append("g").classed("y-axis", true);
    chart.append("g").classed("bars", true);

    this.chart = chart;
    this.renderBars(xScale, yScale);
    this.renderXAxis(xScale, yScale);
    this.renderYAxis(xScale, yScale);
  }

  componentDidUpdate() {
    const { width, height, data } = this.props;
    const xScale = getXScale(data, width, height, margin);
    const yScale = getYScale(data, width, height, margin);

    this.renderBars(xScale, yScale);
    this.renderXAxis(xScale, yScale);
    this.renderYAxis(xScale, yScale);
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.remove();
      this.chart = null;
    }
  }

  renderXAxis(xScale, yScale) {
    const xAxis = this.chart.select(".x-axis");
    const ticks = xScale
      .domain()
      .map((entry, index) => ({ x: xScale(index), value: index }));
    const bandwidth = xScale.bandwidth();
    const xRange = xScale.range();
    const yRange = yScale.range();

    // axis line
    const axisLine = [
      {
        x1: xRange[0],
        x2: xRange[xRange.length - 1],
        y1: yRange[0],
        y2: yRange[0],
      },
    ];
    const axisLineGroup = xAxis.selectAll(".axis-line").data(axisLine);
    axisLineGroup
      .enter()
      .append("line")
      .classed("axis-line", true)
      .attr("x1", (d) => d.x1)
      .attr("x2", (d) => d.x2)
      .attr("y1", (d) => d.y1)
      .attr("y2", (d) => d.y2)
      .attr("stroke", "black");
    axisLineGroup
      .attr("x1", (d) => d.x1)
      .attr("x2", (d) => d.x2)
      .attr("y1", (d) => d.y1)
      .attr("y2", (d) => d.y2);

    // ticks
    const tickGroups = xAxis.selectAll(".tick").data(ticks);
    const enterTick = tickGroups.enter().append("g").classed("tick", true);
    enterTick
      .append("text")
      .attr("x", (d) => d.x + bandwidth / 2)
      .attr("y", yRange[0] + 8)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "hanging")
      .text((d) => d.value);

    enterTick
      .append("line")
      .attr("x1", (d) => d.x + bandwidth / 2)
      .attr("x2", (d) => d.x + bandwidth / 2)
      .attr("y1", yRange[0])
      .attr("y2", yRange[0] + 6)
      .attr("stroke", "black");

    tickGroups
      .select("text")
      .attr("x", (d) => d.x + bandwidth / 2)
      .attr("y", yRange[0] + 8)
      .text((d) => d.value);
    tickGroups
      .select("line")
      .attr("x1", (d) => d.x + bandwidth / 2)
      .attr("x2", (d) => d.x + bandwidth / 2)
      .attr("y1", yRange[0])
      .attr("y2", yRange[0] + 6);

    tickGroups.exit().remove();
  }

  renderYAxis(xScale, yScale) {
    const yAxis = this.chart.select(".y-axis");
    const ticks = yScale
      .ticks(5)
      .map((entry, index) => ({ y: yScale(entry), value: entry }));
    const xRange = xScale.range();
    const yRange = yScale.range();
    // axis line
    const axisLine = [
      {
        x1: xRange[0],
        x2: xRange[0],
        y1: yRange[0],
        y2: yRange[1],
      },
    ];
    const axisLineGroup = yAxis.selectAll(".axis-line").data(axisLine);
    axisLineGroup
      .enter()
      .append("line")
      .classed("axis-line", true)
      .attr("x1", (d) => d.x1)
      .attr("x2", (d) => d.x2)
      .attr("y1", (d) => d.y1)
      .attr("y2", (d) => d.y2)
      .attr("stroke", "black");
    axisLineGroup
      .attr("x1", (d) => d.x1)
      .attr("x2", (d) => d.x2)
      .attr("y1", (d) => d.y1)
      .attr("y2", (d) => d.y2);

    const tickGroups = yAxis.selectAll(".tick").data(ticks);
    const enterTick = tickGroups.enter().append("g").classed("tick", true);

    enterTick
      .append("text")
      .attr("x", (d) => xRange[0] - 8)
      .attr("y", (d) => d.y)
      .attr("text-anchor", "end")
      .attr("dominant-baseline", "central")
      .text((d) => d.value);

    enterTick
      .append("line")
      .attr("x1", xRange[0] - 6)
      .attr("x2", xRange[0])
      .attr("y1", (d) => d.y)
      .attr("y2", (d) => d.y)
      .attr("stroke", "black");

    tickGroups
      .select("text")
      .attr("x", (d) => xRange[0] - 8)
      .attr("y", (d) => d.y)
      .text((d) => d.value);

    tickGroups
      .select("line")
      .attr("x1", xRange[0] - 6)
      .attr("x2", xRange[0])
      .attr("y1", (d) => d.y)
      .attr("y2", (d) => d.y);

    tickGroups.exit().remove();
  }

  renderBars(xScale, yScale) {
    const { data, height } = this.props;
    const barWidth = xScale.bandwidth();
    const yRange = yScale.range();
    const bars = this.chart.select(".bars").selectAll(".bar").data(data);

    bars
      .enter()
      .append("g")
      .classed("bar", true)
      .attr(
        "transform",
        (d, i) => `translate(${margin.left + i * barWidth}, 0)`
      )
      .append("rect")
      .attr("y", (d) => yScale(d))
      .attr("height", (d) => yRange[0] - yScale(d))
      .attr("width", (d) => barWidth - 1)
      .attr("fill", fill);

    bars
      .attr(
        "transform",
        (d, i) => `translate(${margin.left + i * barWidth}, 0)`
      )
      .select("rect")
      .attr("y", (d) => yScale(d))
      .attr("height", (d) => yRange[0] - yScale(d))
      .attr("width", (d) => barWidth - 1)
      .attr("fill", fill);

    bars.exit().remove();
  }

  render() {
    return <div className="bar-chart" ref="container"></div>;
  }
}

export default BarChart;
