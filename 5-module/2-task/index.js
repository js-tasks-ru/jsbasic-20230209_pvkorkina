function toggleText() {
  const btn = document.querySelector('button');
  const text = document.querySelector('#text');
  
  btn.addEventListener('click', event => {
    text.hidden = !text.hidden;
  });
}
