import { Component, OnInit } from '@angular/core';

import { BlogService } from '../../shared/blog.service';
import { Blog } from '../../shared/blog.model';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  blogList: Blog[];

  constructor(private blogService: BlogService) { }

  ngOnInit() {
  	var x = this.blogService.getBlogs();

  	x.snapshotChanges().subscribe(item => {
  		this.blogList = [];
  		item.map(element => {
  			var y = element.payload.toJSON();
  			y["$key"] = element.key;
  			this.blogList.push(y as Blog);
  		});
  	});
  }

  onItemClick(b: Blog){
  	this.blogService.selectedBlog = Object.assign({}, b);
  }

}
