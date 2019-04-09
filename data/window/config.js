'use strict';

var config = {
  options: {
    process: false,
    options: {
      merge: true
    }
  }
};

config.key = localStorage.getItem('user-key') || [
  window.atob('NmEyN2RmY2YyMjMxOWYwNTkwMzEzZWQ2OTM3ZDVkMDg='),
  window.atob('NTAyMzQxYmE1ZWZkOGJkMjI1ZWNhZGZlZmMxYjhiMTA=')
][Math.floor(Math.random() * 2)];

config.desc = 'Drag document, PDF, or image file types here or click to browse';
