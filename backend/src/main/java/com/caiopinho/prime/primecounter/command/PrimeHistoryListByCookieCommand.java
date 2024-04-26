package com.caiopinho.prime.primecounter.command;

import static com.caiopinho.prime.primecounter.model.QPrimeHistory.primeHistory;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.caiopinho.prime.common.repository.BaseRepository;
import com.caiopinho.prime.primecounter.dto.PrimeHistoryDto;
import com.querydsl.core.Tuple;

import jakarta.transaction.Transactional;

@Component
@RequiredArgsConstructor
@Transactional
public class PrimeHistoryListByCookieCommand {
	@Autowired
	private final BaseRepository repository;

	public List<PrimeHistoryDto> execute(UUID cookieId) {
		List<Tuple> results = this.repository.jpaQueryFactory()
				.select(primeHistory.number, primeHistory.primeCount, primeHistory.executionTime)
				.from(primeHistory)
				.where(primeHistory.cookieId.eq(cookieId))
				.fetch();

		return results.stream()
				.map(tuple -> new PrimeHistoryDto(tuple.get(0, Integer.class), tuple.get(1, Integer.class), tuple.get(2, Integer.class)))
				.collect(Collectors.toList());
	}
}
