import { Component, OnInit } from '@angular/core';
import { Ipost } from '../../model/post';
import { ApiService } from '../../service/-api.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeletePostComponent } from '../delete-post/delete-post.component';
import { DialogRef } from '@angular/cdk/dialog';
import { AppPostComponent } from '../app-post/app-post.component';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  allPost!:Ipost[]

  constructor(
    private api:ApiService,
    private dialog : MatDialog,
    private _snackBar: MatSnackBar 
  ){}

  ngOnInit(): void {
    this.getAllPost();
  }
  getAllPost(){
    this.api.getAllPost()
      .subscribe((res:Ipost[]) =>{
        this.allPost = res
        console.log(res);
        
      })
  }
  onClickDelete(post:Ipost){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title : 'Delete Post',
    };

    const diaLogRef = this.dialog.open(DeletePostComponent, dialogConfig);

    diaLogRef.afterClosed().subscribe(res =>{
      if(res){
        this.api.deletePost(post.id)
          .subscribe(res =>{
            this.allPost = this.allPost.filter(ele => ele.id !== post.id);
          });
        this.openSnackBar('Post Remove/Delete is Successfully', 'OK');
      };
    });
  }
  onClickEditPost(post:Ipost){
    if(post.title == null || post.id == null){
      return;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = post
    dialogConfig.data.namePost = 'Edit Post';
    dialogConfig.data.btnCancel = 'Close'
    dialogConfig.data.btnCreatePost = 'Update Post'


    const dialogRef = this.dialog.open(AppPostComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data =>{
      if(data){
        this.api.updatePost(post.id, data)
          .subscribe(res =>{
            this.allPost.forEach(ele =>{
              if(ele.id === post.id){
                ele.title = res.title;
                ele.body = res.body;
              }
            })
            console.log(res);            
          })
        this.openSnackBar('Post Update is Successfull', 'OK');
      }
    })
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  
}
