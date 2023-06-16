import CryptoJS from 'crypto-js'

export function Decrypt(hash: string, key: string): string | null {
  try {
    const bytes = CryptoJS.AES.decrypt(hash, key)
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8)
    return decryptedText
  } catch (error) {
    return null
  }
}
