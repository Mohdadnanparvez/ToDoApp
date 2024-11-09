import { Component, Input, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { LoginService } from '../services/loginService';
import { ActivatedRoute, Router } from '@angular/router';
import { ToDo } from '../model/todo';
import { NgToastService } from 'ng-angular-popup';
import { AddtodoComponent } from '../addtodo/addtodo.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewDialogComponent } from '../view-dialog/view-dialog.component';
@Component({
  selector: 'app-viewtodo',
  templateUrl: './viewtodo.component.html',
  styleUrls: ['./viewtodo.component.css'],
})
export class ViewtodoComponent implements OnInit {
  p:any;
  showMessage: boolean = false;
  panelOpenState = false;
  allToDO: ToDo[] = [];
  name: any;

  // value: boolean = false;
  // isVisible() {
  //   this.value = !this.value;
  // }

  constructor(
    private toDoService: TodoService,
    private userService: LoginService,
    private router: Router,
    private ar: ActivatedRoute,
    private toast: NgToastService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
 // this.dialogRef.updatePosition({ top: '25px', left: '25px', right:'25px', bottom:'25px' });

    this.toDoService
      .getCurrentUser()
      .subscribe((data) => console.log(data.lastName));
    //called getAllToDo() method
    this.getAllToDo();
  }

  page: number = 1;
  count: number = 0;
  cardSize: number = 6;
  cardSizes: any = [6, 3, 9];

  //create category wise priority method
  isHighPriority = (allToDO: any): boolean => allToDO.priority === 'high';
  isMediumPriority = (allToDO: any): boolean => allToDO.priority === 'medium';
  isLowPriority = (allToDO: any): boolean => allToDO.priority === 'low';

  onCardDataChange(event: any) {
    this.page = event;
    this.allToDO;
  }

  onCardSizeChange(event: any): void {
    this.cardSize = event.target.value;
    this.page = 1;
    this.allToDO;
  }
  deleteTaskById(title: any) {
    this.toDoService.deleteToDoByTitle(title).subscribe({
      next: (data) => {
        this.getAllToDo();
        window.location.reload();
        this.toast.success({
          detail: 'ToDo Deleted successfully',
          summary: 'DELETED',
          duration: 4000,
        });
      },
      error: (err) =>
        this.toast.error({
          detail: 'Due to the network issue toDo is not deleted',
          summary: 'ERROR',
          duration: 4000,
        }),
    });
  }

  addToDo() {
    this.router.navigateByUrl('home/addToDo/');
  }
  // let result = data.filter(obj => 
  //   searchFields.some(s => 
  //   obj[s] != undefined && obj[s].toLowerCase() === term
  // ));
  search(title: string) {
    if (title === '' || !title) {
      this.getAllToDo();
    } else {
      // console.log("current value");
      // console.log(this.allToDO);
     
      // this.allToDO = this.allToDO;
      
      // this.allToDO = this.allToDO.filter(
      //   (data) =>
        
      //     data.title?.toLocaleLowerCase().includes(title) || data.description?.toLocaleLowerCase().includes(title)
      // );
      this.toDoService.getAllToDo().subscribe(data=>{
      this.allToDO =  data.filter(
          (data: { title: string; description: string; }) =>
          
            data.title?.toLocaleLowerCase().includes(title) || data.description?.toLocaleLowerCase().includes(title)
        );
      })
      // console.log(title);
      // console.log("new value");
      // console.log(this.allToDO);
    }
  }
  // toDoByDates:ToDo[]=[];
  // toDoByDate(dueDate:string){
  //   if (dueDate == '') {
  //     this.getAllToDo();
  //   } else {
      
  //   this.toDoService.getToDOByDate(dueDate).subscribe(data=>
  //     this.allToDO =data )
  //   }

  // }

  filter(priority: string) {
    if (priority == '') {
      this.getAllToDo();
    } else {
      this.toDoService
        .getAllListByPriority(priority)
        .subscribe((data) => (this.allToDO = data));
    }
  }

  completionStatus(isCompleted: boolean) {
    this.toDoService.getToDOByCompletedStatus(isCompleted).subscribe((data) => {
      this.allToDO = data;
    });
  }

  //created getAllToDo()
  getAllToDo() {
    this.toDoService.getAllToDo().subscribe((data) => {
     
      this.allToDO = data.filter( (a: {
        archive: boolean; completed: boolean; 
}) => a.completed == false && a.archive==false);
      if (!(this.allToDO == null || this.allToDO.length == 0)) {
        this.showMessage = false;
      } else {
        this.showMessage = true;
      }
      console.log('get all todolist');
      console.table(this.allToDO); 
           
    });
  }

  //created updateTaskArchiveStatus()
  updateTaskArchiveStatus(card: any) {
    this.toDoService.updateTaskArchiveStatus(card).subscribe({
      next: (data) => { 
           
        location.reload()
        this.toast.success({
          
          detail: 'Archive ToDo Is Added',
          summary: 'Added',
          duration: 4000,
        });
      },
      error: (err) => {
        this.toast.success({
          detail: 'due to the network issues',
          summary: 'Error',
          duration: 4000,
        });
      },
    });
  }

  //created updateTaskAsCompletedTask()
  updateTaskAsCompletedTask(card: any) {
    this.toDoService.updateTaskAsCompletedTask(card).subscribe({
      next: () => {
        this.getAllToDo();
        // location.reload()  
        this.toast.success({
          detail: 'Completed ToDo Is Added',
          summary: 'Added',
          duration: 4000,
        });
      },
      error: (err) => {
        this.toast.success({
          detail: 'due to the network issues',
          summary: 'Error',
          duration: 4000,
        });
      },
    });
  }

  //created updateToDoAsImportantTask()
  updateToDoAsImportantTask(card: any) {
    this.toDoService.updateToDoAsImportantTask(card).subscribe({
      next: () => {
        this.toast.success({
          detail: 'Important ToDo Is Added',
          summary: 'Added',
          duration: 4000,
        });
      },
      error: (err) => {
        this.toast.success({
          detail: 'due to the network issues',
          summary: 'Error',
          duration: 4000,
        });
      },
    });
  }



  openDialog(): void {
    const dialogRef = this.dialog.open(ViewDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
//       howMessage:boolean=false
  // toDoByDates:ToDo[]=[];
  // toDoByDate(dueDate:string){
  //   if (!(this.toDoByDates == null || this.toDoByDates.length == 0)) {
  //     this.showMessage = false;
  //   } else {
  //     this.showMessage = true;
  //   }
      
  //   this.toDoService.getToDOByDate(dueDate).subscribe(data=>
  //     this.toDoByDates =data )
  //   }
  
  }
  
  
