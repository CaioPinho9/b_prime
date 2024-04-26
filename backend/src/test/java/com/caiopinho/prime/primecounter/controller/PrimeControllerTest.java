package com.caiopinho.prime.primecounter.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.caiopinho.prime.primecounter.dto.PrimeDto;
import com.caiopinho.prime.primecounter.dto.PrimeHistoryDto;
import com.caiopinho.prime.primecounter.service.PrimeService;

@SpringBootTest
class PrimeControllerTest {
	private final PrimeService primeService = mock(PrimeService.class);

	private PrimeController primeController;

	@BeforeEach
	void setUp() {
		primeController = new PrimeController(primeService);
	}

	@Test
	void primeControllerPrimesNegativeNumber() {
		ResponseEntity<?> response = primeController.countPrimesLessThenNumber(-1, null);
		assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
	}

	@Test
	void primeControllerPrimesAboveMaxValue() {
		ResponseEntity<?> response = primeController.countPrimesLessThenNumber(2_000_000_001, null);
		assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
	}

	@Test
	void primeControllerPrimesIsValid() {
		when(primeService.countPrimesLessThenNumber(10, null)).thenReturn(new PrimeDto(10, 4));
		ResponseEntity<?> response = primeController.countPrimesLessThenNumber(10, null);
		assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@Test
	void primeControllerPrimesWithCookieId() {
		UUID cookieId = UUID.randomUUID();
		when(primeService.countPrimesLessThenNumber(10, cookieId)).thenReturn(new PrimeDto(10, 4));
		ResponseEntity<?> response = primeController.countPrimesLessThenNumber(10, cookieId);
		assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@Test
	void primeControllerPrimeHistoryIsValid() {
		UUID cookieId = UUID.randomUUID();
		List<PrimeHistoryDto> list = List.of(
				new PrimeHistoryDto(10, 4, 100),
				new PrimeHistoryDto(20, 8, 200)
		);
		when(primeService.getPrimeHistory(cookieId)).thenReturn(list);
		ResponseEntity<?> response = primeController.getPrimeHistory(cookieId);
		assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@Test
	void primeControllerPrimeHistoryNullCookie() {
		ResponseEntity<?> response = primeController.getPrimeHistory(null);
		assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
	}
}
