import { Component, OnInit } from '@angular/core';
import { DataService} from "../data.service";
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editproduct:any
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _dataService:DataService
  ) { }

  ngOnInit() {
    this._route.params
    .subscribe((params: Params) =>{
      // console.log(`The id is: ${params['_id']}`)
      console.log("@@@@@@@@@@@@@@@@ ", params)
      this.getProduct(params['id'])
    }
    )
  }
  getProduct(id){
    console.log("getProduct is working")
    const tempObservable=this._dataService.getProduct(id)
    tempObservable.subscribe(
      (res)=>{
        console.log("response",res)
        this.editproduct=res['product']
      },
      (err)=>{
        console.log("error getting the product id",err)
        console.log("the id was",id)
      }
    )
    
  }
  editOneProduct(){
    console.log("editOneProduct is working")
    const tempObservable=this._dataService.editOneProduct(this.editproduct)
    tempObservable.subscribe(
      (res)=>{
        this.getProduct(this.editproduct)
      },
      (err)=>{ console.log("error",err)}
    )
  }

}
