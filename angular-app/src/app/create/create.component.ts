import { Component, OnInit } from '@angular/core';
import { DataService} from "../data.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  product: any
  constructor(private _dataService: DataService) {
    
   }

  ngOnInit() {
    this.product={name:"",price:0,image:""}
  }
  createProduct(){
    console.log("createProduct is working")
    const tempObservable=this._dataService.createProduct(this.product)
    tempObservable.subscribe(
      (productCreated)=>{
        console.log("response", productCreated)
        this.product={name:"",price:0,image:""}
      },
      (err)=>{
        console.log("err",err)
      }
    )
  }
}
