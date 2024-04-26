package com.caiopinho.prime.primecounter.model;

import java.io.Serializable;
import java.util.UUID;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "tb_prime_history")
public class PrimeHistory implements Serializable {
	public PrimeHistory(UUID cookieId, int number, int primeCount, int executionTime, String createdAt) {
		this.cookieId = cookieId;
		this.number = number;
		this.primeCount = primeCount;
		this.executionTime = executionTime;
		this.createdAt = createdAt;
	}

	@Id
  	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator = "prime_history_id_seq")
	@Column(name = "co_seq_prime_history", nullable = false)
	private int id;

	@Column(name = "uuid_cookie")
	private UUID cookieId;

	@Column(name = "nu_number", nullable = false)
	private int number;

	@Column(name = "nu_prime_count", nullable = false)
	private int primeCount;

	@Column(name = "nu_execution_time", nullable = false)
	private int executionTime;

	@Column(name = "dt_created_at", nullable = false)
	private String createdAt;
}
