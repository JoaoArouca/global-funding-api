import CryptoJS from 'crypto-js'

export function MakeHash(text: string | null): string | null {
  if (text !== null) {
    const textHashed = CryptoJS.AES.encrypt(text, 'senha').toString()
    return textHashed
  } else {
    const textHashed = text
    return textHashed
  }
}
