import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-chatscreen',
  templateUrl: './chatscreen.component.html',
  styleUrls: ['./chatscreen.component.css']
})
export class ChatscreenComponent implements OnInit {

  constructor(private us:UserService) { }
  text: string="";
  user:any=localStorage.getItem('username')
  other:any=localStorage.getItem('curruser')


  messages:any=[]
  ngOnInit(): void {
    let use1=localStorage.getItem('username')
    let use2=localStorage.getItem('curruser')
    let obj={user1:use1,user2:use2}
    this.us.getmessage().subscribe(
      res=>{
        this.messages=res.message;
      },

    )
  }
  send(){
    let use1=localStorage.getItem('username')
    let use2=localStorage.getItem('curruser')
    let obj={user1:use1,user2:use2,message:[{test:this.text,author:use1}]}
    console.log(obj)
    this.us.postmessage(obj).subscribe(
      res=>{
        console.log("suceess")
        this.us.updateDataObservable(res.latest)
        this.us.dataobservable.subscribe(
          mess=>{
            this.messages=mess;
          }
        )
      },
      err=>{
        alert(err.message)
      }
    )

  }

}