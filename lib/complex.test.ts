import { fromRectangular, fromPolar, add, subtract, multiply, divide, toDegrees, toRadians } from './complex';

describe('Complex Math Logic', () => {
  test('Rectangular to Polar conversion', () => {
    const c = fromRectangular(3, 4);
    expect(c.magnitude).toBeCloseTo(5);
    expect(c.angle).toBeCloseTo(Math.atan2(4, 3));
  });

  test('Polar to Rectangular conversion', () => {
    const c = fromPolar(5, Math.atan2(4, 3));
    expect(c.real).toBeCloseTo(3);
    expect(c.imag).toBeCloseTo(4);
  });

  test('Addition', () => {
    const c1 = fromRectangular(1, 2);
    const c2 = fromRectangular(3, 4);
    const res = add(c1, c2);
    expect(res.real).toBe(4);
    expect(res.imag).toBe(6);
  });

  test('Subtraction', () => {
    const c1 = fromRectangular(5, 5);
    const c2 = fromRectangular(2, 3);
    const res = subtract(c1, c2);
    expect(res.real).toBe(3);
    expect(res.imag).toBe(2);
  });

  test('Multiplication', () => {
    const c1 = fromRectangular(1, 1); // 1.414 ∠ 45°
    const c2 = fromRectangular(1, 1); // 1.414 ∠ 45°
    const res = multiply(c1, c2);
    expect(res.real).toBeCloseTo(0);
    expect(res.imag).toBeCloseTo(2);
  });

  test('Division', () => {
    const c1 = fromRectangular(0, 2); // 2 ∠ 90°
    const c2 = fromRectangular(2, 0); // 2 ∠ 0°
    const res = divide(c1, c2);
    expect(res.real).toBeCloseTo(0);
    expect(res.imag).toBeCloseTo(1);
  });

  test('Degrees and Radians conversion', () => {
    expect(toDegrees(Math.PI)).toBe(180);
    expect(toRadians(180)).toBe(Math.PI);
  });
});
