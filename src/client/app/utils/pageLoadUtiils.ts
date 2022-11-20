export const waitFor = async (selector: () => boolean, timeout: number = 30): Promise<any> => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      const result = selector()
      // @ts-ignore
      if (!!result) {
        clearInterval(interval);
        resolve(result);
      }
    }, 5);
    setTimeout(() => {
      console.debug('Cannot wait anymore!')
      reject()
      clearInterval(interval);
    }, timeout * 1000)
  });
};
