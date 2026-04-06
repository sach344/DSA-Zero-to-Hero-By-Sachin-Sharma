// COPY BUTTON
function copyText() {
  const text = "SDE Journey by Sachin Sharma";
  
  navigator.clipboard.writeText(text).then(() => {
    alert("Copied!");
  });
}

// FETCH LOCAL DATA (DSA progress)
fetch("data/progress.json")
  .then(res => res.json())
  .then(data => {
    document.getElementById("arrays-count").innerText = data.arrays;
    document.getElementById("trees-count").innerText = data.trees;
    document.getElementById("graphs-count").innerText = data.graphs;
  });

// FETCH GITHUB DATA
fetch("https://api.github.com/users/sach344")
  .then(res => res.json())
  .then(data => {
    document.getElementById("repoCount").innerText = data.public_repos;
  });