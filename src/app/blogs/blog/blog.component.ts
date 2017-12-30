import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../shared/blog.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(private blogService: BlogService) { }

  ngOnInit() {
  	this.resetForm();
  }

  onSubmit(form: NgForm){
    if(form.value.$key == null)
  	  this.blogService.addBlog(form.value);
    else
      this.blogService.updateBlog(form.value);
    this.resetForm(form);
  }

  resetForm(form? : NgForm){
  	if(form != null)
  		form.reset();
  	this.blogService.selectedBlog = {
  		$key: null,
  		title: '',
  		topic: '',
      shortDesc: '',
  		content: '',
  		timestamp: ''
  	}
  }

  onDelete(form: NgForm){
    if(confirm("Are you sure you want to delete this blog post?") == true){
      this.blogService.deleteBlog(form.value);
      this.resetForm(form);  
    }
  }

  
}

