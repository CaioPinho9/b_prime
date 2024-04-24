package com.caiopinho.prime.primecounter.service;

import org.springframework.stereotype.Service;

import com.caiopinho.prime.primecounter.util.MathUtils;

@Service
public class PrimeService {
	public int countPrimesLessThenNumber(int number) {
		return MathUtils.sieveOfEratosthenes(number);
	}
}
