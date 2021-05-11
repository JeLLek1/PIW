import md5 from 'md5';

const randomHash = () => {
  let cryptoObj = window.crypto || window.msCrypto;
  if (!cryptoObj) {
    return false;
  }
  const randomPassowrd = new Uint8Array(20);
  return md5(cryptoObj.getRandomValues(randomPassowrd));
};

export default randomHash;
