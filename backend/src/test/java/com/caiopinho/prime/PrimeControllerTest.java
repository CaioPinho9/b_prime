package com.caiopinho.prime;

import com.caiopinho.prime.primecounter.controller.PrimeController;
import com.caiopinho.prime.primecounter.dto.PrimeDTO;
import com.caiopinho.prime.primecounter.service.PrimeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class PrimeControllerTest {

    private PrimeController primeController;
    private PrimeService primeService;

    @BeforeEach
    void setUp() {
        primeService = mock(PrimeService.class);
        primeController = new PrimeController(primeService);
    }

    @Test
    void countPrimesLessThenNumberNegativeNumber() {
        ResponseEntity<?> response = primeController.countPrimesLessThenNumber(-1);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    void countPrimesLessThenNumberAboveMaxValue() {
        ResponseEntity<?> response = primeController.countPrimesLessThenNumber(2_000_000_001);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    void countPrimesLessThenNumberIsValid() {
        when(primeService.countPrimesLessThenNumber(10)).thenReturn(new PrimeDTO(10, 4));
        ResponseEntity<?> response = primeController.countPrimesLessThenNumber(10);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }
}
