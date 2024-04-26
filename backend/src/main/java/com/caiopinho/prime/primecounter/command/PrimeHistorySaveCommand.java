package com.caiopinho.prime.primecounter.command;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.caiopinho.prime.common.repository.BaseRepository;
import com.caiopinho.prime.primecounter.model.PrimeHistory;

import jakarta.transaction.Transactional;

@Component
@RequiredArgsConstructor
@Transactional
public class PrimeHistorySaveCommand {
	@Autowired
	private final BaseRepository repository;

	public void execute(PrimeHistory primeHistory) {
		this.repository.save(primeHistory);
	};
}
