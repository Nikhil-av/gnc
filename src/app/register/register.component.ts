import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  pass: string="";
  user: string="";
  emai: string="";
  constructor(private us:UserService) { }

  ngOnInit(): void {
  }
  fun(){
    let userObj={password:this.pass,username:this.user,email:this.emai}
    this.us.fun(userObj).subscribe(
      res=>{
        console.log(res.message)
      },
      err=>{
        console.log(err)
      }
    )
    }
  

}
