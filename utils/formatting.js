export function formatDate(string) {
  let stringArray = string.split('-')

  return `${stringArray[2]}/${stringArray[1]}/${stringArray[0]}`;
}

export function formatSubject(string) {

  let words = string.split(' ')

  let result = [];

  for (const word of words) {
    if (word.length > 4) {
      result.push(word[0] + word.substring(1).toLowerCase())
    } else {
      result.push(word.toLowerCase())
    }
  }

  return result.join(' ')
}

export function formatInitials(string) {

  let subjectString = formatSubject(string)

  let result = '';

  for (const letter of subjectString) {
    if (letter != ' ' && letter == letter.toUpperCase() || typeof letter == 'numeric') {
      result += letter;
    }
  }

  return result;
}