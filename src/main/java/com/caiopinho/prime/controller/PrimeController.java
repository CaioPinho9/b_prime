package com.caiopinho.prime.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.caiopinho.prime.service.PrimeService;

@RestController
public class PrimeController {
	@Autowired
	PrimeService primeService;

	@GetMapping("/prime/{number}")
	public ResponseEntity<List<Integer>> getPrimesLessThanNumber(@PathVariable int number) {
 		if (number <= 1) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        List<Integer> primes = primeService.getPrimesLessThanNumber(number);
        return new ResponseEntity<>(primes, HttpStatus.OK);
    }
}
