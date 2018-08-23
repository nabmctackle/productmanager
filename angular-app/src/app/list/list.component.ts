import { Component, OnInit } from '@angular/core';
import { DataService} from "../data.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  productlist: any
  constructor(private _dataService:DataService) { }

  ngOnInit() {
    this.getProducts()
  }
  getProducts(){
    console.log("getProducts is working")
    const tempObservable=this._dataService.getProducts()
    tempObservable.subscribe(
      (allproducts)=>{
        console.log("response",allproducts)
        this.productlist=allproducts
      },
      (err)=>{
        console.log("error",err)
      }
    )

    }
  deleteProduct(id){
    console.log("deleteProduct is working")
    const tempObservable=this._dataService.deleteProduct(id)
    tempObservable.subscribe(
      (success)=>{
        this.getProducts()
      },
      (error)=>{
        console.log("error deleting",error)
      }
      
    )
  }
  }

