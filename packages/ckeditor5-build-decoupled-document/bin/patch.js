const fs = require('fs');

const patchButtonView = () => {
  const fpath = 'node_modules/@ckeditor/ckeditor5-ui/src/button/buttonview.js';
  const matches = [
    '        template.on.mousedown = bind.to( evt => {',
    '                evt.preventDefault();',
    '        });',
  ];

  const text = fs.readFileSync(fpath, 'utf-8');
  const lines = text.split('\n');

  const outs = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (i === 147 && line !== matches[0]) {
      outs.push(...matches);
    }

    outs.push(line);
  }

  fs.writeFileSync(fpath, outs.join('\n'));
};

const patchDropdownUtils = () => {
  const fpath = 'node_modules/@ckeditor/ckeditor5-ui/src/dropdown/utils.js';

  const match1 = '        if (!dropdownView.isOpen) {';
  const repmt1 = '        return;';

  const match2 = '            dropdownView.buttonView.focus();';
  const repmt2 = '';

  const match3 = '        dropdownView.panelView.focus();';
  const repmt3 = '';

  const text = fs.readFileSync(fpath, 'utf-8');
  const lines = text.split('\n');

  const outs = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (i === 241 && line === match1) {
      outs.push(repmt1);
      i = 264;
      continue;
    }

    if (line === match2) {
      outs.push(repmt2);
      continue;
    }

    if (i > 330 && line === match3) {
      outs.push(repmt3);
      continue;
    }

    outs.push(line);
  }

  fs.writeFileSync(fpath, outs.join('\n'));
};

patchButtonView();
patchDropdownUtils();
