package com.caiopinho.prime.primecounter.command;

import com.caiopinho.prime.common.repository.BaseRepository;
import com.caiopinho.prime.primecounter.model.PrimeHistory;

import org.hibernate.PropertyValueException;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@SpringBootTest
@Transactional
class PrimeHistorySaveCommandTest {
	@PersistenceContext
	private EntityManager entityManager;

	@Autowired
	private PrimeHistorySaveCommand primeHistorySaveCommand;

	@BeforeEach
	void setUp() {
		BaseRepository repository = new BaseRepository(entityManager);
		primeHistorySaveCommand = new PrimeHistorySaveCommand(repository);
	}

	@AfterEach
	void tearDown() {
		entityManager.clear();
	}

	@Test
	void primeHistorySaveCommandIsValid() {
		PrimeHistory primeHistory = new PrimeHistory();
		primeHistory.setNumber(10);
		primeHistory.setPrimeCount(4);
		primeHistory.setExecutionTime(100);
		primeHistory.setCookieId(UUID.randomUUID());
		primeHistory.setCreatedAt("2021-10-10T10:10:10");

		primeHistorySaveCommand.execute(primeHistory);

		PrimeHistory savedPrimeHistory = entityManager.find(PrimeHistory.class, primeHistory.getId());
		assertNotNull(savedPrimeHistory);
		assertEquals(primeHistory.getNumber(), savedPrimeHistory.getNumber());
		assertEquals(primeHistory.getPrimeCount(), savedPrimeHistory.getPrimeCount());
		assertEquals(primeHistory.getExecutionTime(), savedPrimeHistory.getExecutionTime());
		assertEquals(primeHistory.getCookieId(), savedPrimeHistory.getCookieId());
		assertEquals(primeHistory.getCreatedAt(), savedPrimeHistory.getCreatedAt());
	}

	@Test
	void primeHistorySaveCommandNullData() {
		PrimeHistory primeHistory = new PrimeHistory();

		assertThrows(PropertyValueException.class, () -> primeHistorySaveCommand.execute(primeHistory));
	}

}
