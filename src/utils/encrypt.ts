import CryptoJS from 'crypto-js'

export function MakeHash(text: string | null, key: string): string | null {
  if (text !== null) {
    const textHashed = CryptoJS.AES.encrypt(text, key).toString()
    return textHashed
  } else {
    const textHashed = text
    return textHashed
  }
}
