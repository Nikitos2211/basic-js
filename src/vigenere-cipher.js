const { NotImplementedError } = require('../extensions/index.js')

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
	constructor(direct = true) {
		this.direct = direct
	}

	encrypt(message, key) {
		if (!message || !key) {
			throw new Error('Incorrect arguments!')
		}

		return this.vigenereCipher(message, key, 'encrypt')
	}

	decrypt(encryptedMessage, key) {
		if (!encryptedMessage || !key) {
			throw new Error('Incorrect arguments!')
		}

		return this.vigenereCipher(encryptedMessage, key, 'decrypt')
	}

	vigenereCipher(text, key, mode) {
		const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		const textUpper = text.toUpperCase()
		const keyUpper = key.toUpperCase()
		let result = ''
		let keyIndex = 0

		for (let i = 0; i < textUpper.length; i++) {
			const char = textUpper[i]
			if (alphabet.includes(char)) {
				const charIndex = alphabet.indexOf(char)
				const keyChar = keyUpper[keyIndex % keyUpper.length]
				const keyIndexValue = alphabet.indexOf(keyChar)

				let newCharIndex
				if (mode === 'encrypt') {
					newCharIndex = (charIndex + keyIndexValue) % alphabet.length
				} else if (mode === 'decrypt') {
					newCharIndex =
						(charIndex - keyIndexValue + alphabet.length) % alphabet.length
				}

				result += alphabet[newCharIndex]
				keyIndex++
			} else {
				result += char
			}
		}

		return this.direct ? result : result.split('').reverse().join('')
	}
}

module.exports = {
	VigenereCipheringMachine,
}
