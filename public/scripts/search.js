const pageSize = 5;
const button = document.getElementById("search-control");
const dialog = document.getElementById("search-dialog");
const closeButton = document.getElementById("search-close");
const form = document.getElementById("site-search-form");
const input = document.getElementById("site-search-input");
const clearButton = document.getElementById("site-search-clear");
const searchStatus = document.getElementById("site-search-status");
const resultsList = document.getElementById("site-search-results");
const moreButton = document.getElementById("site-search-more");

let pagefindPromise;
let results = [];
let visibleResults = pageSize;
let searchId = 0;
let searchTimer;

function loadSearch() {
  pagefindPromise ??= (async () => {
    const bundlePath = dialog?.dataset.bundlePath ?? "/pagefind/";
    const pagefind = await import(`${bundlePath}pagefind.js`);
    await pagefind.options({ noWorker: true });
    await pagefind.init();
    return pagefind;
  })();
  return pagefindPromise;
}

function setStatus(message = "") {
  if (!searchStatus) return;
  searchStatus.textContent = message;
  searchStatus.hidden = !message;
}

function clearResults() {
  results = [];
  visibleResults = pageSize;
  if (resultsList) resultsList.innerHTML = "";
  if (moreButton) moreButton.hidden = true;
}

async function renderResults() {
  if (!resultsList) return;
  resultsList.innerHTML = "";
  const entries = await Promise.all(results.slice(0, visibleResults).map((result) => result.data()));
  entries.forEach((data) => {
    const item = document.createElement("li");
    const link = document.createElement("a");
    const title = document.createElement("span");
    const excerpt = document.createElement("p");
    link.href = data.url;
    link.className = "site-search-result-link";
    title.className = "site-search-result-title";
    title.textContent = data.meta?.title ?? data.title ?? "未命名文章";
    excerpt.className = "site-search-result-excerpt";
    excerpt.innerHTML = data.excerpt;
    link.append(title, excerpt);
    item.append(link);
    resultsList.append(item);
  });
  if (moreButton) moreButton.hidden = results.length <= visibleResults;
}

async function executeSearch(query, requestId) {
  setStatus("正在搜索…");
  try {
    const pagefind = await loadSearch();
    const response = await pagefind.search(query);
    if (requestId !== searchId || !response) return;
    results = response.results;
    visibleResults = pageSize;
    setStatus(results.length ? `找到 ${results.length} 个结果` : `未找到与“${query}”相关的文章`);
    await renderResults();
  } catch (error) {
    console.error("Pagefind failed to initialize", error);
    if (requestId === searchId) setStatus("搜索暂时不可用，请稍后重试");
  }
}

function search(term) {
  const query = term.trim();
  if (clearButton) clearButton.hidden = !query;
  if (searchTimer) clearTimeout(searchTimer);
  if (!query) {
    searchId += 1;
    clearResults();
    setStatus();
    return;
  }
  const requestId = ++searchId;
  setStatus("正在搜索…");
  searchTimer = setTimeout(() => void executeSearch(query, requestId), 180);
}

function openSearch() {
  if (!dialog?.open) dialog?.showModal();
  button?.setAttribute("aria-expanded", "true");
  requestAnimationFrame(() => input?.focus());
}

function closeSearch() {
  dialog?.close();
}

button?.addEventListener("click", openSearch);
closeButton?.addEventListener("click", closeSearch);
clearButton?.addEventListener("click", () => {
  if (input) input.value = "";
  search("");
  input?.focus();
});
input?.addEventListener("input", () => search(input.value));
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  search(input?.value ?? "");
});
moreButton?.addEventListener("click", () => {
  visibleResults += pageSize;
  void renderResults();
});
dialog?.addEventListener("close", () => button?.setAttribute("aria-expanded", "false"));
dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) closeSearch();
});
document.addEventListener("keydown", (event) => {
  const target = event.target;
  const isEditable = target?.matches?.("input, textarea, select, [contenteditable=true]");
  if (!isEditable && (event.key === "/" || ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k"))) {
    event.preventDefault();
    openSearch();
  }
});
