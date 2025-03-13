import { formatNumber } from './numbers';

describe('numbers', () => {
  describe('formatNumber', () => {
    it('should format number as integer', () => {
      const result = formatNumber(1000.0);

      expect(result).toBe('1,000');
    });

    it('should format number as decimal', () => {
      const result = formatNumber(1000.0, { maximumFractionDigits: 1, minimumFractionDigits: 1 });

      expect(result).toBe('1,000.0');
    });
  });
});
