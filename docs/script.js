const copyBtn = document.getElementById('copyCmd');
copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('npx git-tork');
    copyBtn.classList.add('copied');
    setTimeout(() => copyBtn.classList.remove('copied'), 1500);
  } catch (_) {}
});

const rows = [...document.querySelectorAll('.sidebar .row')];
const viewGraph = document.getElementById('viewGraph');
const viewChanges = document.getElementById('viewChanges');
const statusMsg = document.getElementById('statusMsg');
const keyHint = document.getElementById('keyHint');
const typedMsg = document.getElementById('typedMsg');
const stagedFile = document.getElementById('stagedFile');
const unstagedFile = document.getElementById('unstagedFile');
const sidebarPane = document.querySelector('.sidebar');
const mainPane = document.querySelector('.main-pane');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function select(i) {
  rows.forEach((r) => r.classList.remove('sel'));
  if (rows[i]) rows[i].classList.add('sel');
}

function focus(pane) {
  sidebarPane.classList.toggle('focused', pane === 'sidebar');
  mainPane.classList.toggle('focused', pane === 'main');
}

async function typeText(el, text, speed = 55) {
  el.textContent = '';
  for (const ch of text) {
    el.textContent += ch;
    await sleep(speed);
  }
}

async function demoLoop() {
  while (true) {
    focus('sidebar');
    viewGraph.classList.remove('hidden');
    viewChanges.classList.add('hidden');
    statusMsg.textContent = '';
    typedMsg.textContent = '';
    stagedFile.style.display = 'none';
    unstagedFile.style.display = '';
    unstagedFile.innerHTML = '&nbsp;&nbsp;<span class="yellow">M src/git.ts</span>';
    keyHint.textContent = '↑↓ navigate · Enter select';

    select(1);
    await sleep(1600);
    select(4);
    await sleep(900);
    select(5);
    await sleep(900);
    select(0);
    keyHint.textContent = 'Enter → open Changes view';
    await sleep(1100);

    viewGraph.classList.add('hidden');
    viewChanges.classList.remove('hidden');
    focus('main');
    keyHint.textContent = 's stage · c commit';
    await sleep(1400);

    stagedFile.style.display = '';
    unstagedFile.innerHTML = '&nbsp;&nbsp;<span class="green">M src/git.ts</span>';
    statusMsg.textContent = 'Staged src/git.ts';
    keyHint.textContent = 'c → write commit message';
    await sleep(1300);

    statusMsg.textContent = '';
    await typeText(typedMsg, 'fix: push to tracked upstream branch');
    await sleep(700);

    statusMsg.textContent = 'Committed ✓';
    typedMsg.textContent = '';
    keyHint.textContent = 'p → push';
    await sleep(1300);

    statusMsg.textContent = 'Pushing...';
    await sleep(1100);
    statusMsg.textContent = 'Push successful ✓';
    await sleep(2200);
  }
}

demoLoop();
