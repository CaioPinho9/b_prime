package com.caiopinho.prime.primecounter.command;

import com.caiopinho.prime.primecounter.dto.PrimeHistoryDto;
import com.caiopinho.prime.common.repository.BaseRepository;
import com.caiopinho.prime.primecounter.model.PrimeHistory;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@SpringBootTest
@Transactional
class PrimeHistoryListByCookieCommandTest {
	@PersistenceContext
	private EntityManager entityManager;

	private PrimeHistoryListByCookieCommand primeHistoryListByCookieCommand;
	private PrimeHistorySaveCommand primeHistorySaveCommand;

	@BeforeEach
	void setUp() {
		BaseRepository repository = new BaseRepository(entityManager);
		primeHistorySaveCommand = new PrimeHistorySaveCommand(repository);
		primeHistoryListByCookieCommand = new PrimeHistoryListByCookieCommand(repository);
	}

	@AfterEach
	void tearDown() {
		entityManager.clear();
	}

	@Test
	void primeHistoryListByCookieCommandIsValid() {
		UUID cookieId = UUID.randomUUID();

		PrimeHistory primeHistory1 = new PrimeHistory(cookieId, 10, 4, 100, "2021-10-10T10:10:10");
		primeHistorySaveCommand.execute(primeHistory1);

		PrimeHistory primeHistory2 = new PrimeHistory(cookieId, 20, 8, 200, "2021-10-10T10:10:10");
		primeHistorySaveCommand.execute(primeHistory2);

		UUID differentCookieId = UUID.randomUUID();
		PrimeHistory primeHistoryDifferent = new PrimeHistory(differentCookieId, 30, 12, 300, "2021-10-10T10:10:10");
		primeHistorySaveCommand.execute(primeHistoryDifferent);

		List<PrimeHistoryDto> result = primeHistoryListByCookieCommand.execute(cookieId);

		assertNotNull(result);
		assertEquals(2, result.size());
	}

}
