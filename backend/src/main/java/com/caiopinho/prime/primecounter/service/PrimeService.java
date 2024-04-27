package com.caiopinho.prime.primecounter.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.caiopinho.prime.primecounter.command.PrimeHistoryListByCookieCommand;
import com.caiopinho.prime.primecounter.command.PrimeHistorySaveCommand;
import com.caiopinho.prime.primecounter.dto.PrimeDto;
import com.caiopinho.prime.common.util.MathUtils;
import com.caiopinho.prime.primecounter.dto.PrimeHistoryDto;
import com.caiopinho.prime.primecounter.model.PrimeHistory;

@Service
@Component
public class PrimeService {
	private final PrimeHistorySaveCommand primeHistorySaveCommand;
	private final PrimeHistoryListByCookieCommand primeHistoryListByCookieCommand;

	@Autowired
	public PrimeService(PrimeHistorySaveCommand primeHistorySaveCommand, PrimeHistoryListByCookieCommand primeHistoryListByCookieCommand) {
		this.primeHistorySaveCommand = primeHistorySaveCommand;
		this.primeHistoryListByCookieCommand = primeHistoryListByCookieCommand;
	}

	public PrimeDto countPrimesLessThenNumber(int number, UUID cookieId) {
		long startTime = System.currentTimeMillis();
		int count = MathUtils.sieveOfEratosthenes(number);
		int executionTime = (int) (System.currentTimeMillis() - startTime);

		PrimeHistory primeHistory = new PrimeHistory(cookieId, number, count, executionTime, LocalDateTime.now().toString());
		primeHistorySaveCommand.execute(primeHistory);

		return new PrimeDto(count, executionTime);
	}

	public List<PrimeHistoryDto> getPrimeHistory(UUID cookieId) {
		return primeHistoryListByCookieCommand.execute(cookieId);
	}
}
