'use strict';

var config = {
  options: {
    category: 'image',
    target: 'jpg',
    process: false
  }
};
config.key = localStorage.getItem('user-key') || window.atob('ZWZlMTI5NTUzMmIyYTk3OWFiOTZhMDJkMjUwYTlhYzk=');
config.desc = 'Drag PDF documents here or click to browse';
