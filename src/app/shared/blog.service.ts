import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Blog } from './blog.model';

@Injectable()
export class BlogService {

  selectedBlog: Blog = new Blog();

  blogList: AngularFireList<any>;

  constructor(private fb: AngularFireDatabase) { }

  getBlogs(){
  	this.blogList = this.fb.list('blogs');
  	return this.blogList;
  }

  addBlog(blog: Blog){
  	this.blogList.push({
  		title: blog.title,
  		topic: blog.topic,
  		shortDesc: blog.shortDesc,
  		content: blog.content,
  		timestamp: blog.timestamp
  	});
  }

  updateBlog(blog: Blog){
  	this.blogList.update(blog.$key, {
  		title: blog.title,
  		topic: blog.topic,
  		shortDesc: blog.shortDesc,
  		content: blog.content,
  		timestamp: blog.timestamp
  	});
  }

  deleteBlog(blog: Blog){
  	this.blogList.remove(blog.$key);
  }

}
