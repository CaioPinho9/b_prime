class PrimeCounterApi {
  async countPrimesLessThenNumber(number: Number | string) {
    try {
      const response = await fetch(`http://localhost:8080/prime/${number}`, {
        credentials: "include",
        method: "POST",
        mode: "cors"
      });

      if (response.status !== 200) {
        return "Erro ao contar números primos.";
      }

      return response.json();
    } catch (error) {
      return "Erro ao contar números primos.";
    }
  }

  async getHistory() {
    try {
      const response = await fetch(`http://localhost:8080/prime/history`, {
        credentials: "include",
        mode: "cors"
      });

      if (response.status !== 200) {
        return "Erro ao carregar o histórico.";
      }

      return response.json();
    } catch (error) {
      return "Erro ao carregar o histórico.";
    }
  }
}

export default PrimeCounterApi;
