import { Component, AfterViewInit, OnDestroy, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


declare var tinymce: any;

@Component({
  selector: 'app-editor',
  template: `<textarea id="{{elementId}}"></textarea>`,
  providers: [
   { 
     provide: NG_VALUE_ACCESSOR,
     multi: true,
     useExisting: forwardRef(() => EditorComponent)
   }
  ]
})


export class EditorComponent implements AfterViewInit, OnDestroy, ControlValueAccessor {

  private onTouch: Function;
  private onModelChange: Function;

  registerOnTouched(fn) {
    this.onTouch = fn;
  }
  registerOnChange(fn) {
    this.onModelChange = fn;
  }

  writeValue(value) {
    this.editorContent = value;
  }

  @Input() elementId: String;
  @Output() onEditorKeyup = new EventEmitter<any>();
  
  editor;
  editorContent: string = null;

  ngAfterViewInit() {
	tinymce.init({
	  selector: '#' + this.elementId,
	  plugins: ['link', 'paste', 'table'],
	  skin_url: 'assets/skins/lightgray',
	  schema: 'html5',
	  setup: editor => {
	    this.editor = editor;
	    editor.on('keyup change', () => {
	      const content = editor.getContent();
	      this.editorContent = content;
	      this.onEditorKeyup.emit(content);
	      this.onModelChange(content);
	      this.onTouch();
	    });
	  },
	});
	}

  ngOnDestroy() {
	tinymce.remove(this.editor);
	}



  // private innerValue: any;
  // private changed = new Array<(value: any) => void>();
  // private touched = new Array<() => void>();


  // get value(): any {
  //   return this.innerValue;
  // }


  // set value(value: any) {
  //   if (this.innerValue !== value) {
  //     this.innerValue = value;
  //     this.changed.forEach(f => f(value));
  //   }
  // }


  // touch() {
  //   this.touched.forEach(f => f());
  // }


  // writeValue(value: any) {
  //   this.innerValue = value;
  // }


  // registerOnChange(fn: (value: any) => void) {
  //   this.changed.push(fn);
  // }


  // registerOnTouched(fn: () => void) {
  //   this.touched.push(fn);
  // }



  
	
}
