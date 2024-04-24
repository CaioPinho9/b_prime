package com.caiopinho.prime.primecounter.util;

public class MathUtils {
	public static int sieveOfEratosthenes(int n) {
		boolean[] prime = new boolean[n + 1];
		for (int i = 0; i <= n; i++) {
			prime[i] = true;
		}

		for (int p = 2; p * p <= n; p++) {
			if (prime[p]) {
				for (int i = p * p; i <= n; i += p) {
					prime[i] = false;
				}
			}
		}

		int primeCount = 0;
		for (int i = 2; i < n; i++) {
			if (prime[i]) {
				primeCount++;
			}
		}

		return primeCount;
	}
}
