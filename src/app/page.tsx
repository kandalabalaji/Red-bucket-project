'use client';

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

type DataPoint = {
  time: string;
  price: number;
  rsi: number;
};

export default function Page() {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString();
      setData((prevData) => [
        ...prevData.slice(-19),
        {
          time: now,
          price: Math.random() * 100,
          rsi: Math.random() * 100,
        },
      ]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Crypto Price and RSI Dashboard</h1>
      <LineChart width={800} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis yAxisId="left" domain={[0, 100]} label={{ value: 'Price', angle: -90, position: 'insideLeft' }} />
        <YAxis yAxisId="right" orientation="right" domain={[0, 100]} label={{ value: 'RSI', angle: 90, position: 'insideRight' }} />
        <Tooltip />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="price" stroke="#8884d8" />
        <Line yAxisId="right" type="monotone" dataKey="rsi" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
}
