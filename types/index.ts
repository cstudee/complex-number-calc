export type ComplexFormat = 'rectangular' | 'polar';

export interface ComplexNumber {
  real: number; // 'a' in a + bi
  imag: number; // 'b' in a + bi
  magnitude: number; // 'r' in r ∠ θ
  angle: number; // 'θ' in r ∠ θ (in radians)
}

export type Operation = 'add' | 'subtract' | 'multiply' | 'divide';

export interface Calculation {
  id: string;
  num1: ComplexNumber;
  num2: ComplexNumber;
  operation: Operation;
  result: ComplexNumber;
  timestamp: number;
}
