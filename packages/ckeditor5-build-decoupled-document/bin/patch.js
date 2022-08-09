const fs = require('fs');

const replaceMatchedLine = (fpath, actionObjs) => {
  const text = fs.readFileSync(fpath, 'utf-8');
  const lines = text.split('\n');

  const outs = [];
  for (const line of lines) {
    let didMatch = false;
    for (const actionObj of actionObjs) {
      const { match, repmt } = actionObj;
      if (line === match) {
        outs.push(repmt);
        didMatch = true;
        break;
      }
    }
    if (didMatch) continue;

    outs.push(line);
  }

  fs.writeFileSync(fpath, outs.join('\n'));
};

const patchButtonView = () => {
  const fpath = 'node_modules/@ckeditor/ckeditor5-ui/src/button/buttonview.js';
  const matches = [
    '		template.on.mousedown = bind.to( evt => {',
    '			evt.preventDefault();',
    '		} );',
    '',
  ];

  const text = fs.readFileSync(fpath, 'utf-8');
  const lines = text.split('\n');

  const outs = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (i === 177 && line !== matches[0]) {
      outs.push(...matches);
    }

    outs.push(line);
  }

  fs.writeFileSync(fpath, outs.join('\n'));
};

const patchDropdownView = () => {
  const fpath = 'node_modules/@ckeditor/ckeditor5-ui/src/dropdown/dropdownview.js';

  let match = '				this.focus();';
  let repmt = '				//this.focus();';
  replaceMatchedLine(fpath, [{ match, repmt }]);

  match = '			this.panelView.focus();';
  repmt = '			//this.panelView.focus();';
  replaceMatchedLine(fpath, [{ match, repmt }]);
};

const patchDropdownUtils = () => {
  const fpath = 'node_modules/@ckeditor/ckeditor5-ui/src/dropdown/utils.js';
  const match = '		if ( !dropdownView.isOpen ) {';
  const repmt = '		return;';

  const text = fs.readFileSync(fpath, 'utf-8');
  const lines = text.split('\n');

  const outs = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (i === 264 && line === match) {
      outs.push(repmt);
      i = 289;
      continue;
    }

    outs.push(line);
  }

  fs.writeFileSync(fpath, outs.join('\n'));
};

patchButtonView();
patchDropdownView();
patchDropdownUtils();
