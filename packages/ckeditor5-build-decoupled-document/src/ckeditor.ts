/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import {
  DecoupledEditor as DecoupledEditorBase,
} from '@ckeditor/ckeditor5-editor-decoupled';

import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';

import {
  Bold, Italic, Underline, Strikethrough, Superscript, Subscript,
} from '@ckeditor/ckeditor5-basic-styles';
import { List, TodoList } from '@ckeditor/ckeditor5-list';
import { FontSize, FontColor, FontBackgroundColor } from '@ckeditor/ckeditor5-font';

import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { RemoveFormat } from '@ckeditor/ckeditor5-remove-format';

import { Indent, IndentBlock } from '@ckeditor/ckeditor5-indent';
import { Alignment } from '@ckeditor/ckeditor5-alignment';

import { Link, AutoLink } from '@ckeditor/ckeditor5-link';

import {
  Image, ImageStyle, ImageResize, ImageToolbar, ImageUpload,
} from '@ckeditor/ckeditor5-image';
import ImageUploadAdapter from './objecturluploadadapter';

import { Table, TableToolbar } from '@ckeditor/ckeditor5-table';

import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { FindAndReplace } from '@ckeditor/ckeditor5-find-and-replace';

export default class DecoupledEditor extends DecoupledEditorBase {

  public static override builtinPlugins = [
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

  public static override defaultConfig = {
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
}
