import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent implements OnInit {

  constructor(private us:UserService,private rr:Router) { }
  userslist:any =[];
  ngOnInit(): void {
    this.us.fun3().subscribe(
      res=>{
        console.log(res)
        this.userslist=res.message
        console.log(this.userslist)
      },
      err=>{
        console.log(err.message)
      }
    )

  }
  fun(username:string){
    console.log(username)
    localStorage.setItem("curruser",username)
    this.rr.navigateByUrl('/'+username)
  }

}
