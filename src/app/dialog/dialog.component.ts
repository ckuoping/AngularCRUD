import { ApiService } from './../services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { inject } from '@angular/core/testing';

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

  action:string = 'Save'

  constructor(private formBuilder:FormBuilder,
              private api: ApiService,
              @Inject(MAT_DIALOG_DATA) public editData:any,
              private dialogRef:MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productform = this.formBuilder.group({
      productName:['',Validators.required],
      category:['',Validators.required],
      freshness:['',Validators.required],
      price:['',Validators.required],
      comment:['',Validators.required],
      date:['',Validators.required],
    })

    console.log(this.editData)
    if(this.editData){
      this.action='Update'
      this.productform.controls['productName'].setValue(this.editData.productName)
      this.productform.controls['category'].setValue(this.editData.category)
      this.productform.controls['freshness'].setValue(this.editData.freshness)
      this.productform.controls['price'].setValue(this.editData.price)
      this.productform.controls['comment'].setValue(this.editData.comment)
      this.productform.controls['date'].setValue(this.editData.date)
    }
  }

  addProduct(){
    if(!this.editData){
      if(this.productform.valid){
        this.api.postProduct(this.productform.value)
        .subscribe({
          next:(res)=>{
            alert('Product added successfully')
            this.productform.reset()
            this.dialogRef.close('save')
          },
          error:()=>{
            alert('EError  while adding a product')
          }
        })
      }
    }else{
      this.updateProduct()
    }

  }

  updateProduct(){
    this.api.putProduct(this.productform.value, this.editData.id)
    .subscribe({
      next:(res)=>{
            alert('Product updated successfully')
            this.productform.reset()
            this.dialogRef.close('update')
      },
                error:()=>{
            alert('Error while updating a product')
          }
    },
    )
  }

}
