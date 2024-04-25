package com.caiopinho.prime.primecounter.service;

import org.springframework.stereotype.Service;

import com.caiopinho.prime.primecounter.dto.PrimeDTO;
import com.caiopinho.prime.common.util.MathUtils;

@Service
public class PrimeService {
	public PrimeDTO countPrimesLessThenNumber(int number) {
		long startTime = System.currentTimeMillis();
		int count = MathUtils.sieveOfEratosthenes(number);
		long executionTime = System.currentTimeMillis() - startTime;

		return new PrimeDTO(count, (int) executionTime);
	}
}
