package com.caiopinho.prime.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.caiopinho.prime.helpers.MathHelper;

@Service
public class PrimeService {
	public List<Integer> getPrimesLessThanNumber(int number) {
		return MathHelper.sieveOfEratosthenes(number);
	}
}
