package com.caiopinho.prime.primecounter.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PrimeDTO {
	private int primeCount;
	private int executionTime;
}
