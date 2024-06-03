const fs = require('fs');

const patchButtonView = () => {
  const fpath = 'node_modules/@ckeditor/ckeditor5-ui/src/button/buttonview.js';
  const matches = [
    '        template.on.mousedown = bind.to(evt => {',
    '            evt.preventDefault();',
    '        });',
  ];

  const text = fs.readFileSync(fpath, 'utf-8');
  const lines = text.split('\n');

  const outs = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (i === 114 && line !== matches[0]) {
      outs.push(...matches);
      i = 126;
      continue;
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

    if (i === 286 && line === match1) {
      outs.push(repmt1);
      i = 309;
      continue;
    }

    if (line === match2) {
      outs.push(repmt2);
      continue;
    }

    if (i > 400 && line === match3) {
      outs.push(repmt3);
      continue;
    }

    outs.push(line);
  }

  fs.writeFileSync(fpath, outs.join('\n'));
};

const patchFontColorUi = () => {
  // Normally, dropdown will have close on execute (ckeditor-ui/dropdown/utils/closeDropdownOnExecute) e.g., alignment dropdown will close after execute
  // But color dropdown won't because color table is added to the dropdown and execute is on the color table instead!
  const fpath = 'node_modules/@ckeditor/ckeditor5-font/src/ui/colorui.js';

  const match1 = '                    editor.editing.view.focus();';
  const repmt1 = '                    dropdownView.isOpen = false;';

  const match2 = '                editor.editing.view.focus();';
  const repmt2 = '                dropdownView.isOpen = false;';

  const text = fs.readFileSync(fpath, 'utf-8');
  const lines = text.split('\n');

  const outs = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line === match1) {
      const nextLine = lines[i + 1];
      if (nextLine !== repmt1) {
        outs.push(line);
        outs.push(repmt1);
        continue;
      }
    }

    if (line === match2) {
      const nextLine = lines[i + 1];
      if (nextLine !== repmt2) {
        outs.push(line);
        outs.push(repmt2);
        continue;
      }
    }

    outs.push(line);
  }

  fs.writeFileSync(fpath, outs.join('\n'));
};

const patchViewToPlainText = () => {
  const fpath = 'node_modules/@ckeditor/ckeditor5-clipboard/src/utils/viewtoplaintext.js';

  const match1 = "        return '\\n\\n';";
  const repmt1 = "        return '\\n';";

  const match2 = "    return '\\n\\n';";
  const repmt2 = "    return '\\n';";

  const text = fs.readFileSync(fpath, 'utf-8');
  const lines = text.split('\n');

  const outs = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line === match1) {
      outs.push(repmt1);
      continue;
    }
    if (line === match2) {
      outs.push(repmt2);
      continue;
    }

    outs.push(line);
  }

  fs.writeFileSync(fpath, outs.join('\n'));
};

patchButtonView();
patchDropdownUtils();
patchFontColorUi();
patchViewToPlainText();
