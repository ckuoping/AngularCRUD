import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  categories:any[]=[
    {value:'fruits',viewValue:'Fruits'},
    {value:'vegetables',viewValue:'Vegetables'},
    {value:'electronics',viewValue:'Electronic'},
  ]

  freshnessList=['Brand New','Second Hand','Refurinshed']

  productform!:FormGroup

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.productform = this.formBuilder.group({
      productName:['',Validators.required],
      category:['',Validators.required],
      freshness:['',Validators.required],
      price:['',Validators.required],
      comment:['',Validators.required],
      date:['',Validators.required],
    })
  }

  addProduct(){
    console.log(this.productform.value)
  }

}
