const initials = [...'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'];
const alphabet = document.querySelector('#alphabet');
const search = document.querySelector('#q');
const results = document.querySelector('#results');
const clear = document.querySelector('#clear');
let selected = '전체';

function firstConsonant(term) {
  const offset = term.charCodeAt(0) - 0xac00;
  return offset >= 0 && offset <= 11171 ? initials[Math.floor(offset / 588)] : '기타';
}

const entries = terms.map(([term, desc]) => ({ term, desc, letter: firstConsonant(term) }))
  .sort((a, b) => a.term.localeCompare(b.term, 'ko'));
const letters = [...new Set([...('ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ'), ...entries.map(x => x.letter)])]
  .sort((a, b) => a.localeCompare(b, 'ko'));

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function highlight(node, text, query) {
  const start = text.toLowerCase().indexOf(query.toLowerCase());
  if (!query || start < 0) {
    node.textContent = text;
    return;
  }
  const end = start + query.length;
  node.append(text.slice(0, start), element('mark', '', text.slice(start, end)), text.slice(end));
}

function render() {
  const query = search.value.trim();
  clear.hidden = !query;
  for (const button of alphabet.children) {
    button.setAttribute('aria-pressed', String(button.textContent === selected));
  }
  const matched = entries.filter(({term, desc, letter}) =>
    (selected === '전체' || letter === selected) &&
    (term + ' ' + desc).toLowerCase().includes(query.toLowerCase())
  );
  document.querySelector('#count').replaceChildren(
    '전체 ' + entries.length + '개 중 ', element('b', '', matched.length + '개'), ' 용어 표시'
  );
  results.replaceChildren();
  if (!matched.length) {
    const empty = element('div', 'empty');
    empty.append(element('div', 'big', '⌕'), element('strong', '', '검색 결과가 없어요.'),
      element('span', '', '다른 단어로 검색하거나 필터를 초기화해 보세요.'));
    results.append(empty);
    return;
  }
  let previous = '';
  for (const {term, desc, letter} of matched) {
    if (letter !== previous) results.append(element('div', 'groupTitle', letter));
    previous = letter;
    const row = element('div', 'entry');
    const name = element('div', 'term');
    const explanation = element('div', 'desc');
    highlight(name, term, query);
    highlight(explanation, desc, query);
    row.append(name, explanation);
    results.append(row);
  }
}

for (const letter of ['전체', ...letters]) {
  const button = element('button', 'alpha', letter);
  button.type = 'button';
  button.addEventListener('click', () => { selected = letter; render(); });
  alphabet.append(button);
}
search.addEventListener('input', render);
function clearSearch() {
  search.value = '';
  render();
  search.focus();
}
clear.addEventListener('click', clearSearch);
document.querySelector('#reset').addEventListener('click', () => {
  selected = '전체';
  clearSearch();
});
document.querySelector('#backtop').addEventListener('click', () =>
  window.scrollTo({top: 0, behavior: 'smooth'})
);
render();
