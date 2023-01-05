/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import DecoupledEditorBase from '@ckeditor/ckeditor5-editor-decoupled/src/decouplededitor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';

import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';

import List from '@ckeditor/ckeditor5-list/src/list';
import TodoList from '@ckeditor/ckeditor5-list/src/todolist';

import FontSize from '@ckeditor/ckeditor5-font/src/fontsize';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor';

import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat';

import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';

import Link from '@ckeditor/ckeditor5-link/src/link';
import AutoLink from '@ckeditor/ckeditor5-link/src/autolink';

import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import ImageUploadAdapter from './objecturluploadadapter';

import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';

import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import FindAndReplace from '@ckeditor/ckeditor5-find-and-replace/src/findandreplace';

export default class DecoupledEditor extends DecoupledEditorBase { }

// Plugins to include in the build.
DecoupledEditor.builtinPlugins = [
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Superscript,
  Subscript,
  List,
  TodoList,
  FontSize,
  FontColor,
  FontBackgroundColor,
  Autoformat,
  TextTransformation,
  RemoveFormat,
  Indent,
  IndentBlock,
  Alignment,
  Link,
  AutoLink,
  Image,
  ImageStyle,
  ImageResize,
  ImageToolbar,
  ImageUpload,
  ImageUploadAdapter,
  Table,
  TableToolbar,
  MediaEmbed,
  FindAndReplace,
];

// Editor configuration.
DecoupledEditor.defaultConfig = {
  toolbar: {
    items: [
      'bold',
      'underline',
      'fontsize',
      'fontColor',
      'fontBackgroundColor',
      'alignment',
      'strikethrough',
      'italic',
      'RemoveFormat',
      '|',
      'uploadImage',
      'link',
      '|',
      'bulletedList',
      'numberedList',
      'todoList',
      '|',
      'outdent',
      'indent',
      '|',
      'undo',
      'redo',
    ]
  },
  image: {
    toolbar: [
      'imageStyle:inline',
      'imageStyle:wrapText',
      'imageStyle:breakText',
    ]
  },
  // This value must be kept in sync with the language defined in webpack.config.js.
  language: 'en'
};
