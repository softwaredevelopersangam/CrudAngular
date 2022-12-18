import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ipost } from '../../model/post';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.scss']
})
export class DeletePostComponent implements OnInit{
  title!:string;

  constructor(
    @Inject(MAT_DIALOG_DATA) post:Ipost,
    private  dialogRef :MatDialogRef<DeletePostComponent>
  ){
    this.title = post.title
  }

  clouse(){
    this.dialogRef.close();
  }
  delete(){
    const deletePost = true;
    this.dialogRef.close(deletePost)
  }
  ngOnInit(): void {
    
  }
}
