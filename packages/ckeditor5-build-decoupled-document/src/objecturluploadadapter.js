import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';

export default class ObjectUrlUploadAdapter extends Plugin {

  static get requires() {
    return [FileRepository];
  }

  static get pluginName() {
    return 'ObjectUrlUploadAdapter';
  }

  init() {
    this.editor.plugins.get(FileRepository).createUploadAdapter = loader => new Adapter(loader);
  }
}

class Adapter {

  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(file => new Promise((resolve, reject) => {
      const reader = this.reader = new window.FileReader();

      reader.addEventListener('load', () => {
        try {
          const objectUrl = URL.createObjectURL(file);

          if (!window.CKEditorObjectUrlContents) window.CKEditorObjectUrlContents = {};
          window.CKEditorObjectUrlContents[objectUrl] = {
            fname: file.name, content: reader.result
          };

          resolve({ default: objectUrl });
        } catch (e) {
          reject(e);
        }
      });

      reader.addEventListener('error', err => {
        reject(err);
      });

      reader.addEventListener('abort', () => {
        reject();
      });

      reader.readAsDataURL(file);
    }));
  }

  abort() {
    if (this.reader) this.reader.abort();
  }
}
