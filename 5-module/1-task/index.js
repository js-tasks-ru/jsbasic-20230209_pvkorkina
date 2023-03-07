function hideSelf() {
  const btn = document.querySelector('button');

  btn.addEventListener('click', event => {
    event.target.hidden = true;
  });
}
