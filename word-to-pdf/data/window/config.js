'use strict';

var config = {
  options: {
    process: false
  }
};
config.key = localStorage.getItem('user-key') || window.atob('YWY5MGMzODc4ZDU2YTFkZmEzNDNkY2YzZmZkNTNkMjY=');
config.desc = 'Drag DOC and DOCX file-types here or click to browse';
