async function waitForContract(contractKey: string) {
  return new Promise<any>((resolve) => {
    const contract = window[contractKey as any];
    if (contract) {
      return resolve(contract);
    }

    const interval = setInterval(() => {
      const contract = window[contractKey as any];
      if (contract) {
        clearInterval(interval);

        return resolve(contract);
      }
    }, 50);
  });
}

export default waitForContract;
