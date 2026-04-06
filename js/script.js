<script>
function copyPrompt(btn, id) {
  const text = document.getElementById(id).textContent;
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = 'COPIED ✓';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'COPY';
      btn.classList.remove('copied');
    }, 2000);
  });
}
</script>

fetch("data/progress.json")
  .then(res => res.json())
  .then(data => {
    console.log(data); // just test for now
  });