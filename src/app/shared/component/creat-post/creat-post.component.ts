import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AppPostComponent } from '../app-post/app-post.component';

@Component({
  selector: 'app-creat-post',
  templateUrl: './creat-post.component.html',
  styleUrls: ['./creat-post.component.scss']
})
export class CreatPostComponent implements OnInit{

  constructor(
    private api : ApiService,
    private _snackBar:MatSnackBar,
    private dialog : MatDialog
  ){}

  ngOnInit(): void {
    
  }

  onClickAddPost(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      namePost : 'Create Posts',
      btnCancel : 'Cancel',
      btnCreatePost:'Create Post'
    }

    const dialogref = this.dialog.open(AppPostComponent, dialogConfig)

    dialogref.afterClosed().subscribe(data =>{
      if(data){
        this.openSnackBar('Create Post is Successfull', 'OK');
      }
    })
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
