import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Calculator as CalcIcon, Activity, IndianRupee, Percent, Calendar, Clock, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

export default function Calculator() {
  // Inputs state
  const [principal, setPrincipal] = useState<number>(100000);
  const [rate, setRate] = useState<number>(5.0);
  const [years, setYears] = useState<number>(10);
  const [frequency, setFrequency] = useState<number>(12); // 12 = Monthly

  // Calculation Logic
  const data = useMemo(() => {
    const result = [];
    const P = principal || 0;
    const r = (rate || 0) / 100;
    const t = years || 0;
    const n = frequency || 1;

    for (let i = 0; i <= t; i++) {
      const simple = P * (1 + r * i);
      const compound = P * Math.pow(1 + r / n, n * i);
      result.push({
        year: i,
        simple: Math.round(simple * 100) / 100,
        compound: Math.round(compound * 100) / 100,
        difference: Math.round((compound - simple) * 100) / 100
      });
    }
    return result;
  }, [principal, rate, years, frequency]);

  // Summary Metrics
  const finalData = data[data.length - 1] || { simple: principal, compound: principal };
  const totalSimpleInterest = Math.max(0, finalData.simple - (principal || 0));
  const totalCompoundInterest = Math.max(0, finalData.compound - (principal || 0));
  const compoundingBonus = Math.max(0, finalData.compound - finalData.simple);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatYAxis = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    if (value >= 1000) return `₹${(value / 1000).toFixed(0)}k`;
    return `₹${value}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 shadow-xl rounded-lg">
          <p className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Year {label}</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between gap-6 items-center">
              <span className="text-zinc-900 dark:text-zinc-100 font-medium flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-zinc-950 dark:bg-white" />
                Compound
              </span>
              <span className="font-mono text-zinc-900 dark:text-zinc-100">{formatCurrency(payload[0].value)}</span>
            </div>
            <div className="flex justify-between gap-6 items-center">
              <span className="text-zinc-500 dark:text-zinc-400 font-medium flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                Simple
              </span>
              <span className="font-mono text-zinc-500 dark:text-zinc-400">{formatCurrency(payload[1].value)}</span>
            </div>
            <div className="pt-3 mt-3 border-t border-zinc-100 dark:border-zinc-800 flex justify-between gap-6 items-center font-medium">
              <span className="text-zinc-900 dark:text-zinc-100">Difference</span>
              <span className="font-mono text-zinc-900 dark:text-zinc-100">
                +{formatCurrency(payload[0].value - payload[1].value)}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        
        {/* Left Panel: Input Dashboard */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sm:p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-6 flex items-center gap-2">
              <CalcIcon className="w-4 h-4" />
              Parameters
            </h2>

            <div className="space-y-6">
              {/* Principal */}
              <div className="space-y-3">
                <label className="flex items-center justify-between text-sm font-medium">
                  <span className="flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-zinc-400" />
                    Principal Amount
                  </span>
                  <span className="font-mono text-xs bg-zinc-200 dark:bg-zinc-800 px-2 py-1 rounded">
                    {formatCurrency(principal || 0)}
                  </span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={principal === 0 ? '' : principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-shadow"
                  placeholder="100000"
                />
              </div>

              {/* Interest Rate */}
              <div className="space-y-3">
                <label className="flex items-center justify-between text-sm font-medium">
                  <span className="flex items-center gap-2">
                    <Percent className="w-4 h-4 text-zinc-400" />
                    Annual Interest Rate
                  </span>
                  <span className="font-mono text-xs bg-zinc-200 dark:bg-zinc-800 px-2 py-1 rounded">
                    {rate}%
                  </span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={rate === 0 ? '' : rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-shadow"
                  placeholder="5.0"
                />
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full accent-zinc-900 dark:accent-zinc-100"
                />
              </div>

              {/* Time Period */}
              <div className="space-y-3">
                <label className="flex items-center justify-between text-sm font-medium">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-zinc-400" />
                    Time Period (Years)
                  </span>
                  <span className="font-mono text-xs bg-zinc-200 dark:bg-zinc-800 px-2 py-1 rounded">
                    {years} yrs
                  </span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={years === 0 ? '' : years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-shadow"
                  placeholder="10"
                />
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full accent-zinc-900 dark:accent-zinc-100"
                />
              </div>

              {/* Compounding Frequency */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Clock className="w-4 h-4 text-zinc-400" />
                  Compounding Frequency
                </label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(Number(e.target.value))}
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-shadow appearance-none"
                >
                  <option value={1}>Annually (1/yr)</option>
                  <option value={2}>Semi-Annually (2/yr)</option>
                  <option value={4}>Quarterly (4/yr)</option>
                  <option value={12}>Monthly (12/yr)</option>
                  <option value={365}>Daily (365/yr)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Visualization & Metrics */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Chart Area */}
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sm:p-6 h-[300px] sm:h-[400px] flex flex-col">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-6 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Trajectory Analysis
            </h2>
            <div className="flex-1 w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-zinc-200 dark:text-zinc-800" />
                  <XAxis 
                    dataKey="year" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'currentColor', fontSize: 12 }}
                    className="text-zinc-500 dark:text-zinc-400"
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'currentColor', fontSize: 12 }}
                    className="text-zinc-500 dark:text-zinc-400"
                    tickFormatter={formatYAxis}
                    dx={-10}
                    width={60}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'currentColor', strokeWidth: 1, strokeDasharray: '4 4' }} />
                  <Legend 
                    iconType="circle" 
                    wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}
                  />
                  <Line 
                    name="Compound Interest"
                    type="monotone" 
                    dataKey="compound" 
                    stroke="currentColor" 
                    className="text-zinc-950 dark:text-white"
                    strokeWidth={2} 
                    dot={false}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                  <Line 
                    name="Simple Interest"
                    type="monotone" 
                    dataKey="simple" 
                    stroke="currentColor" 
                    className="text-zinc-500 dark:text-zinc-400"
                    strokeWidth={2} 
                    strokeDasharray="5 5"
                    dot={false}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Summary Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sm:p-5">
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">Total Principal</p>
              <p className="text-xl font-semibold font-mono tracking-tight">{formatCurrency(principal || 0)}</p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sm:p-5">
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">Simple Interest</p>
              <p className="text-xl font-semibold font-mono tracking-tight">{formatCurrency(totalSimpleInterest)}</p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sm:p-5">
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">Compound Interest</p>
              <p className="text-xl font-semibold font-mono tracking-tight">{formatCurrency(totalCompoundInterest)}</p>
            </div>
            <div className={`rounded-xl p-4 sm:p-5 shadow-lg relative overflow-hidden ${compoundingBonus >= 0 ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <TrendingUp className="w-12 h-12" />
              </div>
              <p className="text-xs font-medium text-white/80 mb-1 relative z-10">Compounding Bonus</p>
              <p className="text-xl font-semibold font-mono tracking-tight relative z-10">+{formatCurrency(compoundingBonus)}</p>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
