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
  atob('NmEyN2RmY2YyMjMxOWYwNTkwMzEzZWQ2OTM3ZDVkMDg='),
  atob('NTAyMzQxYmE1ZWZkOGJkMjI1ZWNhZGZlZmMxYjhiMTA='),
  atob('ZWZlMTI5NTUzMmIyYTk3OWFiOTZhMDJkMjUwYTlhYzk=')
][Math.floor(Math.random() * 3)];

config.desc = 'Drag document, PDF, or image file types here or click to browse';
