async function fetchJSON(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Request failed');
  }
  return response.json();
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString();
}

async function loadQuestions() {
  const [questions, stats] = await Promise.all([
    fetchJSON('/api/questions'),
    fetchJSON('/api/questions/stats'),
  ]);

  const statsEl = document.getElementById('stats');
  const { totals, byTopic } = stats;
  statsEl.innerHTML = `
    <span class="chip">Total: ${totals.total}</span>
    <span class="chip">Easy: ${totals.Easy}</span>
    <span class="chip">Medium: ${totals.Medium}</span>
    <span class="chip">Hard: ${totals.Hard}</span>
    ${Object.entries(byTopic).map(([topic, count]) => `<span class="chip">${topic}: ${count}</span>`).join('')}
  `;

  document.getElementById('questionsList').innerHTML = questions.map((q) => `
    <div class="list-item">
      <strong>${q.title}</strong> (${q.difficulty}) - ${q.topic}<br>
      ${q.platform} • ${formatDate(q.solvedAt)}
      ${q.url ? `<br><a href="${q.url}" target="_blank">Open question</a>` : ''}
      ${q.notes ? `<br><small>${q.notes}</small>` : ''}
    </div>
  `).join('') || '<p>No solved questions yet.</p>';
}

async function loadNotes() {
  const notes = await fetchJSON('/api/notes');
  document.getElementById('notesList').innerHTML = notes.map((n) => `
    <div class="list-item">
      <strong>${n.title}</strong> • ${formatDate(n.uploadedAt)}<br>
      <a href="${n.filePath}" target="_blank">Read PDF</a>
    </div>
  `).join('') || '<p>No notes uploaded yet.</p>';
}

document.getElementById('questionForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.target;
  const data = Object.fromEntries(new FormData(form).entries());
  if (!data.solvedAt) delete data.solvedAt;

  try {
    await fetchJSON('/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    form.reset();
    await loadQuestions();
  } catch (error) {
    alert(`Question save failed: ${error.message}`);
  }
});

document.getElementById('noteForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.target;
  const payload = new FormData(form);

  try {
    await fetch('/api/notes', { method: 'POST', body: payload });
    form.reset();
    await loadNotes();
  } catch (error) {
    alert(`PDF upload failed: ${error.message}`);
  }
});

loadQuestions().catch((error) => {
  document.getElementById('questionsList').innerHTML = `<p>Backend not running: ${error.message}</p>`;
});

loadNotes().catch((error) => {
  document.getElementById('notesList').innerHTML = `<p>Backend not running: ${error.message}</p>`;
});
