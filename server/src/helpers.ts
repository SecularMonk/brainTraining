export function pickNumberFromDistribution({ mean, standardDeviation }: { mean: number; standardDeviation: number }): number {
   let u = 0,
      v = 0;
   while (u === 0) u = Math.random();
   while (v === 0) v = Math.random();
   return mean + standardDeviation * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

export function bindNumberToRange({ number, min, max }): number {
   if (number < min) return min;
   if (number > max) return max;
   return number;
}
