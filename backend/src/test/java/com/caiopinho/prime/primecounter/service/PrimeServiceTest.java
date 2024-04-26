package com.caiopinho.prime.primecounter.service;

import com.caiopinho.prime.primecounter.command.PrimeHistoryListByCookieCommand;
import com.caiopinho.prime.primecounter.command.PrimeHistorySaveCommand;
import com.caiopinho.prime.primecounter.dto.PrimeDto;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.mockito.Mockito.mock;

import java.util.UUID;

@SpringBootTest
class PrimeServiceTest {

	private PrimeService primeService;
	private final PrimeHistorySaveCommand primeHistorySaveCommand = mock(PrimeHistorySaveCommand.class);
	private final PrimeHistoryListByCookieCommand primeHistoryListByCookieCommand = mock(PrimeHistoryListByCookieCommand.class);

	@BeforeEach
	void setUp() {
		primeService = new PrimeService(primeHistorySaveCommand, primeHistoryListByCookieCommand);
	}

	@Test
	void primeServiceIsValid() {
		PrimeDto response = primeService.countPrimesLessThenNumber(1000000, null);
		assertEquals(78498, response.getPrimeCount());
		assertNotEquals(0, response.getExecutionTime());
	}

	@Test
	void primeServiceWithCookieIdIsValid() {
		UUID cookieId = UUID.randomUUID();
		PrimeDto response = primeService.countPrimesLessThenNumber(1000000, cookieId);
		assertEquals(78498, response.getPrimeCount());
		assertNotEquals(0, response.getExecutionTime());
	}
}
