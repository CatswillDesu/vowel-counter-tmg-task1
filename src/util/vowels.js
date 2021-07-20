// array based vowel values of 10 different languages represented in api service

const vowels = {
  langs: {
    ru: ['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я'],
    da: ['a', 'e', 'i', 'o', 'u', 'y', 'æ', 'ø', 'å'],
    kv: ['а', 'е', 'ё', 'и', 'і', 'ы', 'о', 'ӧ', 'у', 'э', 'ю', 'я'],
    en: ['a', 'e', 'i', 'o', 'u', 'y'],
    no: ['a', 'å', 'e', 'æ', 'i', 'o', 'ø', 'u', 'y'],
    es: ['a', 'е', 'i', 'о', 'u'],
    it: ['a', 'e', 'i', 'o', 'u'],
    fr: ['a', 'â', 'à', 'æ', 'e', 'é', 'ê', 'ë', 'i', 'î', 'ï', 'o', 'ô', 'œ', 'u', 'û', 'ù', 'ü', 'y', 'ÿ'],
    is: ['a', 'á', 'e', 'é', 'æ', 'i', 'o', 'ó', 'ö', 'u', 'ú', 'i', 'í', 'y', 'ý'],
    de: ['a', 'ä', 'e', 'i', 'o', 'ö', 'u', 'ü']
  },
  getCompleteSet() {
    const vowels = Object.values(this.langs).reduce((vowels, langSet) => {
      return vowels.concat(langSet)
    }, []) // get every letter from language vowels set
    return [...new Set(vowels)] // filter repeated characters
  }
}

export const getVowelsCount = (string) => {
  return string.toLowerCase().split('').filter(char => vowels.getCompleteSet().includes(char)).length // exclude non-vowel characters and get result count
}

export const getWordsCount = (string) => {
  const nonLetterChars = [' ', ',', '.', ':', '-', ';', '\'', '—']
  return string.split(' ').filter(word => !nonLetterChars.includes(word)).length
}

export default vowels

// languages list: russian, danish, komi, english, norwegian, spanish, italian, french, icelandic, german