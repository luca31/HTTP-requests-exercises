let copy = (e) => {
  {
    const str = e.innerHTML;
    const tmp = document.createElement('textarea');
    tmp.value = str;
    document.body.appendChild(tmp);
    tmp.select();
    document.execCommand('copy');
    document.body.removeChild(tmp);
    e.classList.add('done');
    setTimeout(() => {e.classList.remove('done');}, 2000);
  }
}