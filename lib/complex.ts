import { ComplexNumber } from '@/types';

/**
 * Creates a ComplexNumber object from rectangular components.
 */
export function fromRectangular(real: number, imag: number): ComplexNumber {
  const magnitude = Math.sqrt(real * real + imag * imag);
  const angle = Math.atan2(imag, real); // Radians
  return { real, imag, magnitude, angle };
}

/**
 * Creates a ComplexNumber object from polar components.
 */
export function fromPolar(magnitude: number, angle: number): ComplexNumber {
  const real = magnitude * Math.cos(angle);
  const imag = magnitude * Math.sin(angle);
  return { real, imag, magnitude, angle };
}

export function add(c1: ComplexNumber, c2: ComplexNumber): ComplexNumber {
  return fromRectangular(c1.real + c2.real, c1.imag + c2.imag);
}

export function subtract(c1: ComplexNumber, c2: ComplexNumber): ComplexNumber {
  return fromRectangular(c1.real - c2.real, c1.imag - c2.imag);
}

export function multiply(c1: ComplexNumber, c2: ComplexNumber): ComplexNumber {
  // Multiply magnitudes and add angles
  const magnitude = c1.magnitude * c2.magnitude;
  const angle = c1.angle + c2.angle;
  return fromPolar(magnitude, angle);
}

export function divide(c1: ComplexNumber, c2: ComplexNumber): ComplexNumber {
  if (c2.magnitude === 0) {
    throw new Error('Division by zero is not allowed.');
  }
  // Divide magnitudes and subtract angles
  const magnitude = c1.magnitude / c2.magnitude;
  const angle = c1.angle - c2.angle;
  return fromPolar(magnitude, angle);
}

/**
 * Utility to convert radians to degrees for display.
 */
export function toDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

/**
 * Utility to convert degrees to radians for calculation.
 */
export function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}
