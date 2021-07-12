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
  chattedusers:any =[];
  status:boolean = false;
  setstatus1(){
    this.status=false;
  }
  setstatus2(){
    this.status=true
  }
  userslist:any =[];
  ngOnInit(): void {
    this.us.fun3().subscribe(
      res=>{
        this.userslist=res.message
      },
      err=>{
        console.log(err.message)
      }
    )
    let k=localStorage.getItem('username')
    this.us.getfriends(k).subscribe(
      res=>{
        if (res.message=="Connect with friends"){

        }
        else{
          this.chattedusers=res.message
          console.log(res)
        }
      }
    )

  }
  fun(username:string){
    console.log(username)
    localStorage.setItem("curruser",username)
    this.rr.navigateByUrl('/'+username)
  }

}
