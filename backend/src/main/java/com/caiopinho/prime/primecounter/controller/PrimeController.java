package com.caiopinho.prime.primecounter.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.caiopinho.prime.primecounter.service.PrimeService;

@RestController public class PrimeController {
	@Autowired PrimeService primeService;

	@GetMapping("/prime/{number}") public ResponseEntity<?> countPrimesLessThenNumber(@PathVariable int number) {
		if (number < 0 || number > 2_000_000_000) {
			return new ResponseEntity<>("Number must be between 0 and 2.000.000.000", HttpStatus.BAD_REQUEST);
		}

		int primes = primeService.countPrimesLessThenNumber(number);
		return new ResponseEntity<>(primes, HttpStatus.OK);
	}
}
