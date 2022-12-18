import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ipost } from '../../model/post';
import { ApiService } from '../../service/-api.service';

@Component({
  selector: 'app-app-post',
  templateUrl: './app-post.component.html',
  styleUrls: ['./app-post.component.scss']
})
export class AppPostComponent implements OnInit{

  postForm!:FormGroup;
  namePost!:Ipost;
  title!:string;
  body!:string;
  id!:number;
  btnCancel!:Ipost;
  btnCreatePost!:Ipost;


  // allPost!:Ipost[]

  constructor(
    private fb : FormBuilder,
    @Inject(MAT_DIALOG_DATA) data:Ipost,
    private dialogRef : MatDialogRef<AppPostComponent>,
    private api:ApiService
  ){
    this.namePost = data.namePost
    this.title = data.title;
    this.body = data.body;
    this.id = data.id,
    this.btnCancel = data.btnCancel
    this.btnCreatePost = data.btnCreatePost
  }

  ngOnInit(): void {
    this.createPostForm();
    this.id= Math.floor(Math.random()*10);
  }
  createPostForm(){
    this.postForm = this.fb.group({
      title : [this.title, Validators.required],
      body : [this.body, Validators.required],
      id : [this.id]
    })
  }
  onClickAddPost(){
    this.dialogRef.close(this.postForm.value)
    this.api.getCreatePost(this.postForm.value)
          .subscribe(res=>{
            // this.allPost.push(res)
          })
    
  }
  onClickCancel(){
    this.dialogRef.close();
  }

}
