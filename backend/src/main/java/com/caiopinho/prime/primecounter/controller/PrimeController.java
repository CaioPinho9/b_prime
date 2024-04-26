package com.caiopinho.prime.primecounter.controller;

import java.util.UUID;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.caiopinho.prime.primecounter.dto.PrimeDto;
import com.caiopinho.prime.primecounter.service.PrimeService;

@CrossOrigin
@RestController
@RequiredArgsConstructor
public class PrimeController {
	@Autowired
	PrimeService primeService;

	public PrimeController(PrimeService primeService) {
		this.primeService = primeService;
	}

	@GetMapping("/prime/{number}")
	public ResponseEntity<?> countPrimesLessThenNumber(@PathVariable int number, @CookieValue(name = "session-id", required = false) UUID cookieId) {
		if (number < 0 || number > 2_000_000_000) {
			return new ResponseEntity<>("Number must be between 0 and 2.000.000.000", HttpStatus.BAD_REQUEST);
		}

		PrimeDto primeDto = primeService.countPrimesLessThenNumber(number, cookieId);
		return new ResponseEntity<>(primeDto, HttpStatus.OK);
	}

	@GetMapping("/prime/history")
	public ResponseEntity<?> getPrimeHistory(@CookieValue(name="session-id") UUID cookieId) {
		if (cookieId == null) {
			return new ResponseEntity<>("session-id is required", HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(primeService.getPrimeHistory(cookieId), HttpStatus.OK);
	}
}
