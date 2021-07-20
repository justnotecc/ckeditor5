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
      try {
        const objectUrl = URL.createObjectURL(file);

        if (!window.CKEditorUploadedObjectUrls) window.CKEditorUploadedObjectUrls = {};
        window.CKEditorUploadedObjectUrls[objectUrl] = file;

        resolve({ default: objectUrl });
      } catch (e) {
        reject(e);
      }
    }));
  }

  abort() { }
}
