import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';
import loadImage from 'blueimp-load-image';

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
      loadImage(
        file,
        { maxWidth: 1688, maxHeight: 1688, orientation: true, meta: true, canvas: true }
      ).then(data => {
        try {
          data.image.toBlob((blob) => {
            const objectUrl = URL.createObjectURL(blob);

            if (window.JustnoteReactWebApp) {
              window.JustnoteReactWebApp.addObjectUrlFiles(objectUrl, file.name, blob);
            }

            if (window.ReactNativeWebView) {
              const SEP = '_jUSTnOTE-sEpArAtOr_';

              const content = data.image.toDataURL();
              window.ReactNativeWebView.postMessage(
                'add:objectUrlFiles:' + objectUrl + SEP + file.name + SEP + content
              );
            }

            resolve({ default: objectUrl });
          }, file.type);
        } catch (e) {
          reject(e);
        }
      }).catch(e => {
        reject(e);
      });
    }));
  }

  abort() { }
}
