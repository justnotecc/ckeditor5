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
    if (window.JustnoteReactWebApp) {
      window.JustnoteReactWebApp.updateIsUploading(true);
    }
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('update:isUploading:true');
    }

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
              resolve({ default: objectUrl });
              return;
            }

            if (window.ReactNativeWebView) {
              const reader = new FileReader();
              reader.onerror = e => reject(e);
              reader.onload = () => {
                const SEP = '_jUSTnOTE-sEpArAtOr_';
                const content = reader.result;
                window.ReactNativeWebView.postMessage(
                  'add:objectUrlFiles:' + objectUrl + SEP + file.name + SEP + content
                );
                resolve({ default: objectUrl });
              };
              reader.readAsDataURL(blob);
              return;
            }
          }, file.type);
        } catch (e) {
          if (window.JustnoteReactWebApp) {
            window.JustnoteReactWebApp.updateIsUploading(false);
          }
          if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage('update:isUploading:false');
          }
          reject(e);
        }
      }).catch(e => {
        if (window.JustnoteReactWebApp) {
          window.JustnoteReactWebApp.updateIsUploading(false);
        }
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage('update:isUploading:false');
        }
        reject(e);
      });
    })).catch(e => {
      if (window.JustnoteReactWebApp) {
        window.JustnoteReactWebApp.updateIsUploading(false);
      }
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage('update:isUploading:false');
      }
    });
  }

  abort() { }
}
