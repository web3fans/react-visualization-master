/*
 * @Author: your name
 * @Date: 2017-08-24 23:54:48
 * @LastEditTime: 2020-05-28 17:07:46
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /work/react-relate/react-visualization-master/js/Helper.js
 */
import { scaleBand, scaleLinear } from 'd3-scale';
import { range as d3Range, max as d3Max } from 'd3-array';

const getXScale = (data, width, height, margin) => {
  return scaleBand()
    .domain(d3Range(data.length))
    .range([margin.left, width - margin.right]);
};

const getYScale = (data, width, height, margin) => {
  return scaleLinear()
    .domain([0, d3Max(data)])
    .range([height - margin.bottom, margin.top]);
};

const generateData = (len) => {
  const result = [];

  for (let i = 0; i < len; i++) {
    result.push(Math.floor(1000 * Math.random()));
  }

  return result;
};

export { getXScale, getYScale, generateData };
