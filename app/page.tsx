'use client';

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  Plus, Minus, X, Divide, Calculator as CalcIcon, 
  Trash2, History as HistoryIcon, RotateCcw 
} from 'lucide-react';
import { 
  ComplexNumber, ComplexFormat, Operation, Calculation 
} from '@/types';
import { 
  fromRectangular, fromPolar, add, subtract, multiply, divide, 
  toDegrees, toRadians 
} from '@/lib/complex';

export default function Calculator() {
  // UI State
  const [format, setFormat] = useState<ComplexFormat>('rectangular');
  const [history, setHistory] = useState<Calculation[]>([]);
  
  // Inputs
  const [num1, setNum1] = useState({ v1: '', v2: '' });
  const [num2, setNum2] = useState({ v1: '', v2: '' });
  const [operation, setOperation] = useState<Operation>('add');
  const [result, setResult] = useState<ComplexNumber | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    try {
      setError(null);
      const v1_1 = parseFloat(num1.v1);
      const v2_1 = parseFloat(num1.v2);
      const v1_2 = parseFloat(num2.v1);
      const v2_2 = parseFloat(num2.v2);

      if (isNaN(v1_1) || isNaN(v2_1) || isNaN(v1_2) || isNaN(v2_2)) {
        throw new Error('Please enter valid numbers for both fields.');
      }

      let c1: ComplexNumber;
      let c2: ComplexNumber;

      if (format === 'rectangular') {
        c1 = fromRectangular(v1_1, v2_1);
        c2 = fromRectangular(v1_2, v2_2);
      } else {
        c1 = fromPolar(v1_1, toRadians(v2_1));
        c2 = fromPolar(v1_2, toRadians(v2_2));
      }

      let res: ComplexNumber;
      switch (operation) {
        case 'add': res = add(c1, c2); break;
        case 'subtract': res = subtract(c1, c2); break;
        case 'multiply': res = multiply(c1, c2); break;
        case 'divide': res = divide(c1, c2); break;
        default: throw new Error('Unsupported operation');
      }

      setResult(res);

      const newCalculation: Calculation = {
        id: uuidv4(),
        num1: c1,
        num2: c2,
        operation,
        result: res,
        timestamp: Date.now(),
      };

      setHistory(prev => [newCalculation, ...prev]);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred during calculation.');
      }
    }
  };

  const handleClear = () => {
    setNum1({ v1: '', v2: '' });
    setNum2({ v1: '', v2: '' });
    setResult(null);
    setError(null);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const formatNumber = (num: number) => {
    return Number(num.toFixed(4)).toString();
  };

  const getOpIcon = (op: Operation) => {
    switch (op) {
      case 'add': return <Plus size={20} />;
      case 'subtract': return <Minus size={20} />;
      case 'multiply': return <X size={20} />;
      case 'divide': return <Divide size={20} />;
    }
  };

  const formatResult = (c: ComplexNumber) => {
    const rect = `${formatNumber(c.real)} ${c.imag >= 0 ? '+' : '-'} ${formatNumber(Math.abs(c.imag))}i`;
    const polar = `${formatNumber(c.magnitude)} ∠ ${formatNumber(toDegrees(c.angle))}°`;
    return { rect, polar };
  };

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex items-center gap-3">
          <CalcIcon className="text-blue-600 w-8 h-8" />
          <h1 className="text-2xl font-bold tracking-tight">Complex Number Calculator</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Calculator */}
          <div className="lg:col-span-2 space-y-6 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm">
            
            {/* Format Toggle */}
            <div className="flex bg-gray-100 dark:bg-zinc-800 p-1 rounded-lg w-fit">
              <button 
                onClick={() => setFormat('rectangular')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  format === 'rectangular' 
                    ? 'bg-white dark:bg-zinc-700 shadow-sm text-blue-600 dark:text-blue-400' 
                    : 'text-gray-500 hover:text-gray-700 dark:text-zinc-400'
                }`}
              >
                Rectangular
              </button>
              <button 
                onClick={() => setFormat('polar')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  format === 'polar' 
                    ? 'bg-white dark:bg-zinc-700 shadow-sm text-blue-600 dark:text-blue-400' 
                    : 'text-gray-500 hover:text-gray-700 dark:text-zinc-400'
                }`}
              >
                Polar
              </button>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Number 1 */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-zinc-300">Number 1</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="number"
                      placeholder={format === 'rectangular' ? 'Real (a)' : 'Mag (r)'}
                      className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent"
                      value={num1.v1}
                      onChange={(e) => setNum1({ ...num1, v1: e.target.value })}
                    />
                    <input 
                      type="number"
                      placeholder={format === 'rectangular' ? 'Imag (b)' : 'Angle (θ°)'}
                      className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent"
                      value={num1.v2}
                      onChange={(e) => setNum1({ ...num1, v2: e.target.value })}
                    />
                  </div>
                </div>

                {/* Number 2 */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-zinc-300">Number 2</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="number"
                      placeholder={format === 'rectangular' ? 'Real (a)' : 'Mag (r)'}
                      className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent"
                      value={num2.v1}
                      onChange={(e) => setNum2({ ...num2, v1: e.target.value })}
                    />
                    <input 
                      type="number"
                      placeholder={format === 'rectangular' ? 'Imag (b)' : 'Angle (θ°)'}
                      className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent"
                      value={num2.v2}
                      onChange={(e) => setNum2({ ...num2, v2: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Operations */}
              <div className="flex flex-wrap gap-2">
                {(['add', 'subtract', 'multiply', 'divide'] as Operation[]).map((op) => (
                  <button
                    key={op}
                    onClick={() => setOperation(op)}
                    className={`p-3 rounded-xl border transition-all ${
                      operation === op 
                        ? 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400' 
                        : 'border-gray-200 dark:border-zinc-800 hover:border-blue-200 dark:hover:border-blue-800'
                    }`}
                    title={op}
                  >
                    {getOpIcon(op)}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleCalculate}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-blue-600/20"
                >
                  Calculate
                </button>
                <button
                  onClick={handleClear}
                  className="p-3 border border-gray-200 dark:border-zinc-800 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                  title="Clear Inputs"
                >
                  <RotateCcw size={20} />
                </button>
              </div>

              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-lg text-red-600 dark:text-red-400 text-sm">
                  {error}
                </div>
              )}
            </div>

            {/* Result Area */}
            {result && (
              <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 rounded-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-4">Result</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-xs text-blue-400 dark:text-blue-500 font-medium mb-1">Rectangular</div>
                    <div className="text-2xl font-mono font-bold text-gray-900 dark:text-white">
                      {formatResult(result).rect}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-blue-400 dark:text-blue-500 font-medium mb-1">Polar</div>
                    <div className="text-2xl font-mono font-bold text-gray-900 dark:text-white">
                      {formatResult(result).polar}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* History Section */}
          <div className="space-y-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col h-[600px]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <HistoryIcon className="text-gray-400 w-5 h-5" />
                <h2 className="font-bold">History</h2>
              </div>
              {history.length > 0 && (
                <button 
                  onClick={clearHistory}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  title="Clear History"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
              {history.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-2 italic text-sm">
                  <span>No calculations yet</span>
                </div>
              ) : (
                history.map((calc) => (
                  <div 
                    key={calc.id} 
                    className="p-3 bg-gray-50 dark:bg-zinc-800/50 rounded-xl border border-gray-100 dark:border-zinc-800 text-xs space-y-2"
                  >
                    <div className="flex justify-between text-gray-500 dark:text-zinc-500">
                      <span>{new Date(calc.timestamp).toLocaleTimeString()}</span>
                      <span className="capitalize font-medium">{calc.operation}</span>
                    </div>
                    <div className="font-mono space-y-1">
                      <div className="text-gray-600 dark:text-zinc-400 truncate">
                        {formatResult(calc.num1).rect}
                      </div>
                      <div className="text-blue-500 flex items-center gap-1 py-0.5">
                        {getOpIcon(calc.operation)}
                      </div>
                      <div className="text-gray-600 dark:text-zinc-400 truncate">
                        {formatResult(calc.num2).rect}
                      </div>
                      <div className="border-t border-gray-200 dark:border-zinc-700 my-1 pt-1 font-bold text-gray-900 dark:text-white truncate">
                        = {formatResult(calc.result).rect}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
