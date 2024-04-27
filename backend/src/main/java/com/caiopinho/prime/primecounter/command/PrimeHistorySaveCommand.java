package com.caiopinho.prime.primecounter.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.caiopinho.prime.common.repository.BaseRepository;
import com.caiopinho.prime.primecounter.model.PrimeHistory;

import jakarta.transaction.Transactional;

@Component
@Transactional
public class PrimeHistorySaveCommand {
	private final BaseRepository repository;

	@Autowired
	public PrimeHistorySaveCommand(BaseRepository repository) {
		this.repository = repository;
	}

	public void execute(PrimeHistory primeHistory) {
		this.repository.save(primeHistory);
	};
}
