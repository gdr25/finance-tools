'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Calculator, DollarSign, Percent } from 'lucide-react';

const calculateEMI = (principal: number, annualRate: number, tenureYears: number) => {
  const monthlyRate = annualRate / 12 / 100;
  const totalMonths = tenureYears * 12;
  const monthlyEMI = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
  const totalPayment = monthlyEMI * totalMonths;
  const totalInterest = totalPayment - principal;
  return { monthlyEMI: Math.round(monthlyEMI || 0), totalInterest: Math.round(totalInterest || 0), totalPayment: Math.round(totalPayment || 0) };
};

export default function FinanceHub() {
  const [loanAmount, setLoanAmount] = useState<number>(5000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenure, setTenure] = useState<number>(20);
  const [currentSalary, setCurrentSalary] = useState<number>(600000);
  const [newSalary, setNewSalary] = useState<number>(850000);

  const emiResults = useMemo(() => calculateEMI(loanAmount, interestRate, tenure), [loanAmount, interestRate, tenure]);
  const emiPieData = [{ name: 'Principal Base', value: loanAmount, color: '#6366f1' }, { name: 'Total Interest', value: emiResults.totalInterest, color: '#10b981' }];
  const hikeMetrics = useMemo(() => {
    const difference = newSalary - currentSalary;
    return { difference, percentage: currentSalary > 0 ? ((difference / currentSalary) * 100).toFixed(1) : '0' };
  }, [currentSalary, newSalary]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans p-6 md:p-12 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.12)_0%,transparent_50%)]">
      <nav className="max-w-7xl mx-auto flex justify-between items-center mb-12 border-b border-zinc-900 pb-4">
        <div className="flex items-center gap-2 font-bold text-xl bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
          <Calculator className="text-indigo-500 w-6 h-6" /> NEXUS.FINANCE
        </div>
      </nav>
      <main className="max-w-7xl mx-auto grid grid-cols-1 gap-12">
        <section className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl">
          <h2 className="text-xl font-bold mb-6 text-indigo-400">01 / EMI Calculator</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col gap-6">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Loan Amount: ${loanAmount.toLocaleString()}</label>
                <input type="range" min="100000" max="10000000" step="50000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full accent-indigo-500" />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Interest Rate: {interestRate}%</label>
                <input type="range" min="1" max="20" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full accent-emerald-500" />
              </div>
            </div>
            <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800 flex flex-col justify-between">
              <div>
                <p className="text-xs text-zinc-500 uppercase">Expected Monthly EMI</p>
                <p className="text-3xl font-extrabold text-indigo-400 font-mono">${emiResults.monthlyEMI.toLocaleString()}</p>
              </div>
              <div className="h-32 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={emiPieData} cx="50%" cy="50%" innerRadius={40} outerRadius={50} paddingAngle={4} dataKey="value">
                      {emiPieData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl">
          <h2 className="text-xl font-bold mb-6 text-emerald-400">02 / Salary Hike Calculator</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Current Annual Salary ($)</label>
              <input type="number" value={currentSalary} onChange={(e) => setCurrentSalary(Number(e.target.value))} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white font-mono" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-2">New Proposed Salary ($)</label>
              <input type="number" value={newSalary} onChange={(e) => setNewSalary(Number(e.target.value))} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white font-mono" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl">
              <p className="text-xs text-zinc-500 uppercase">Hike Percentage</p>
              <p className="text-2xl font-bold font-mono text-emerald-400">{hikeMetrics.percentage}%</p>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl">
              <p className="text-xs text-zinc-500 uppercase">Total Raise Amount</p>
              <p className="text-2xl font-bold font-mono text-indigo-400">${hikeMetrics.difference.toLocaleString()}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
