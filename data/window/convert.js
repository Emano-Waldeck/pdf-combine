'use strict';

var Convert = function() {};

Convert.prototype.fetch = (url, {body, method = 'POST', headers = {}}) => fetch(url, {
  method,
  cache: 'no-cache',
  headers: Object.assign({
    'x-oc-api-key': window.atob('NmEyN2RmY2YyMjMxOWYwNTkwMzEzZWQ2OTM3ZDVkMDg='),
  }, headers),
  body
}).then(r => {
  const ok = r.ok;
  return r.json().then(r => {
    if (ok) {
      return r;
    }
    else {
      console.error(r);
      if (r.error) {
        throw Error(r.error_code + ' ' + r.error);
      }
      if (r.errors) {
        throw Error(r.errors.joni(', '));
      }
      if (r.message) {
        throw Error(r.message);
      }
      throw Error('unknown error');
    }
  });
});

Convert.prototype.open = function({category = 'document', target = 'pdf', process = true, options = {}}) {
  return this.fetch('https://api2.online-convert.com/jobs', {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      conversion: [{
        category,
        target,
        options
      }],
      process,
    })
  }).then(r => {
    this.r = r;

    return r;
  });
};

Convert.prototype.upload = function(file) {
  const body = new FormData();
  body.append('file', file);

  const {server, id} = this.r;
  const url = server + '/upload-file/' + id;
  return this.fetch(url, {
    body
  });
};

Convert.prototype.process = function() {
  return this.fetch('https://api2.online-convert.com/jobs/' + this.r.id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      process: true
    })
  });
};

Convert.prototype.status = function() {
  return this.fetch('https://api2.online-convert.com/jobs/' + this.r.id, {
    method: 'GET'
  });
};
