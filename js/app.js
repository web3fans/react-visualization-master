/*
 * @Author: your name
 * @Date: 2017-08-24 23:54:48
 * @LastEditTime: 2020-05-28 17:12:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /work/react-relate/react-visualization-master/js/app.js
 */
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import LineChart from './LineChart';
import BarChart from './BarChart';
import { generateData } from './Helper';
// import '../css/style.scss';

const App = () => {
  const [data, setData] = useState(generateData(Math.floor(8 + 8 * Math.random())))

  const handleClick = () => {
    setData(generateData(Math.floor(8 + 8 * Math.random())))
  };

  return (
      <div>
        <a className="action" onClick={handleClick} >Click to Update data</a>
        <div>
          <BarChart data={data} width={400} height={300} />
        </div>

        <div>
          <LineChart data={data} width={400} height={300}/>
        </div>
      </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
