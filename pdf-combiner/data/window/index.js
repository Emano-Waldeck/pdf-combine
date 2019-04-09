/* globals Sortable, Convert, config */
'use strict';

document.title = chrome.runtime.getManifest().name;
document.querySelector('label').dataset.content = config.desc;

var ul = document.querySelector('#list ul');
Sortable.create(ul, {
  handle: '.drag-handle',
  animation: 150,
  onEnd: () => {
    [...document.querySelectorAll('#list ul span:first-child')]
      .forEach(s => s.classList.add('drag-handle'));
  }
});

var map = new WeakMap();

var onChanged = e => {
  const files = e.target.files || e.dataTransfer.files;
  if (files.length) {
    document.body.dataset.convert = true;
  }
  const li = document.getElementById('li');
  [...files].forEach(file => {
    const clone = document.importNode(li.content, true);
    clone.querySelector('[data-id=name]').textContent = file.name;
    clone.querySelector('[data-id=type]').textContent = file.type || '-';
    clone.querySelector('[data-id=size]').textContent = file.size;

    map.set(clone.querySelector('li'), file);
    ul.appendChild(clone);
  });

  e.target.value = '';
};

document.querySelector('input[type=file]').addEventListener('change', onChanged);

{
  const form = document.querySelector('form');

  // file drag hover
  const dragHover = e => {
    e.stopPropagation();
    e.preventDefault();
    e.target.className = e.type === 'dragover' ? 'hover' : '';
  };

  form.addEventListener('dragover', dragHover);
  form.addEventListener('dragleave', dragHover);
  form.addEventListener('drop', e => {
    e.preventDefault();
    onChanged(e);
  });
}

document.addEventListener('click', e => {
  const {target} = e;
  const cmd = target.dataset.cmd;

  if (cmd === 'remove') {
    e.preventDefault();
    target.closest('li').remove();
  }
});

var convert;
document.addEventListener('submit', async e => {
  e.preventDefault();

  document.body.dataset.disabled = true;

  const info = document.getElementById('info');
  const report = msg => info.textContent = (new Date()).toLocaleString() + ': ' + msg;

  const lis = [...document.querySelectorAll('#list li')];
  convert = new Convert();
  report('Requesting a new conversion');
  try {
    await convert.open(config.options);
  }
  catch (e) {
    return alert(e.message + '\n\n--\nUse can use your own free key to prevent usage limit rate. Go to the options page to set yours.');
  }
  report('Uploading files');
  for (const li of lis) {
    const span = li.querySelector('[data-id=status]');
    span.textContent = 'Uploading';
    await convert.upload(map.get(li));
    span.textContent = 'Uploaded';
  }
  await convert.process();

  const check = () => convert.status().then(r => {
    if (r.status) {
      report(r.status.info);
    }
    if (r.errors.length === 0 && r.output.length !== 0) {
      chrome.downloads.download({
        url: r.output[0].uri
      });
    }
    else if (r.errors.length === 0) {
      window.setTimeout(check, 2000);
    }
  });
  report('Waiting for server');
  check();
});

document.getElementById('reload').addEventListener('click', () => location.reload());
