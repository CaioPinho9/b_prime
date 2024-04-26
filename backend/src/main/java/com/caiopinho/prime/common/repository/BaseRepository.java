package com.caiopinho.prime.common.repository;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Repository;

import com.caiopinho.prime.primecounter.model.PrimeHistory;
import com.querydsl.jpa.impl.JPAQueryFactory;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
@AllArgsConstructor
@Transactional
public class BaseRepository{
	@PersistenceContext
	protected EntityManager entityManager;

	public JPAQueryFactory jpaQueryFactory() {
		return new JPAQueryFactory(this.entityManager);
	}

	public void save(PrimeHistory primeHistory) {
		this.entityManager.persist(primeHistory);
	}
}
