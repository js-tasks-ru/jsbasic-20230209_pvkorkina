function getMinMax(str) {
  let arr = str.split(' ').filter(item => isFinite(item));
  
  return {
    min: Math.min(...arr),
    max: Math.max(...arr)
  }
}
