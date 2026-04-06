// COPY BUTTON
function copyText() {
  navigator.clipboard.writeText("Sachin Sharma | DSA Dashboard 🚀");
  alert("Copied!");
}

// COUNTER ANIMATION
function animate(id, value) {
  let count = 0;
  let interval = setInterval(() => {
    count++;
    document.getElementById(id).innerText = count;
    if (count >= value) clearInterval(interval);
  }, 40);
}

// FETCH LOCAL DATA
fetch("data/progress.json")
  .then(res => res.json())
  .then(data => {

    animate("arrays-count", data.arrays);
    animate("trees-count", data.trees);
    animate("graphs-count", data.graphs);

    document.getElementById("arrays-bar").style.width = data.arrays * 2 + "%";
    document.getElementById("trees-bar").style.width = data.trees * 2 + "%";
    document.getElementById("graphs-bar").style.width = data.graphs * 2 + "%";
  });

// GITHUB API
fetch("https://api.github.com/users/sach344")
  .then(res => res.json())
  .then(data => {
    document.getElementById("repoCount").innerText = data.public_repos;
  });