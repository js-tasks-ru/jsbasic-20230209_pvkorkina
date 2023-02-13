function checkSpam(str) {
  const stopWords = ['1xBet', 'XXX'];

  for (let word of stopWords) {
    if ( str.toLowerCase().includes( word.toLowerCase() ) ) return true;
  }

  return false;
}
