class Prime {
  static async countPrimesLessThenNumber(number: Number | string) {
    try {
      const response = await fetch(`http://localhost:8080/prime/${number}`);
      console.log(response);
      return response.json();
    } catch (error) {
      return "Erro ao contar números primos.";
    }
  }
}

export default Prime;
