function sum_to_n_a(n: number): number {
  // your code here
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

function sum_to_n_b(n: number): number {
  // your code here
  if (n <= 1) return n;
  return n + sum_to_n_a(n - 1);
}

function sum_to_n_c(n: number): number {
  // your code here
  return (n * (n + 1)) / 2;
}
