export const toBase64 = (file: File) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

export const toBase64FilesArray = async (filesArray: File[])=> {
  return await Promise.all(filesArray.map(async (file) => {
    return await toBase64(file)
  }))
}
