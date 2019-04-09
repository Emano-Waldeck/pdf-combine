'use strict';

var info = document.getElementById('info');

// reset
document.getElementById('reset').addEventListener('click', e => {
  if (e.detail === 1) {
    info.textContent = 'Double-click to reset!';
    window.setTimeout(() => info.textContent = '', 750);
  }
  else {
    localStorage.clear();
    chrome.storage.local.clear(() => {
      chrome.runtime.reload();
      window.close();
    });
  }
});
// support
document.getElementById('support').addEventListener('click', () => chrome.tabs.create({
  url: chrome.runtime.getManifest().homepage_url + '?rd=donate'
}));

document.getElementById('user-key').value = localStorage.getItem('user-key') || '';

document.getElementById('save').addEventListener('click', () => {
  localStorage.setItem('user-key', document.getElementById('user-key').value || '');
  info.textContent = 'Option saved.';
  window.setTimeout(() => info.textContent = '', 750);
});
