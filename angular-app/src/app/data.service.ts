import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
    console.log("Data service is running")
  }
  createProduct(obj){
    console.log("createProduct invoked")
    return this.http.post("/createproduct",obj)
  }
  getProducts(){
    console.log("getProducts invoked")
    return this.http.get("/allproducts")
  }
  getProduct(id){
    console.log("getProduct invoked")
    return this.http.get("/oneproduct/"+id)
  }
  editOneProduct(obj){
    console.log("editOneProduct invoked")
    return this.http.put("/editOneProduct", obj)
  }
  deleteProduct(id){
    console.log("deleteproduct invoked")
    return this.http.delete("/deleteProduct/"+id)
  }

}
