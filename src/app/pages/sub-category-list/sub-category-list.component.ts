import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sub-category-list',
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.scss']
})
export class SubCategoryListComponent implements OnInit {
  itemsList: any = []
  categoriesList: any = []
  loading = true
  category: any
  itemName: any
  itemDesc: any
  itemPrice: any
  uploadedFile: any = new FormData()
  uploadedFileEdit: any = new FormData()
  creatingSubCategory: any = false;
  editingSubCategory: any = false;

  editSubCategoryName: any
  editSubCategoryDesc: any
  // editItemPrice: any
  editSubCategoryFile: any
  editSubCatCategorySno: any
  editSubCategorySno: any

  constructor(private http: HttpClient) { }
  ngOnInit() {
    if (window.localStorage.getItem("outlet") == null || window.localStorage.getItem("outlet") == undefined) {
      window.location.pathname = '/sign-in'
    }

    this.http.post<any>('https://6eir4x970g.execute-api.us-east-1.amazonaws.com/dev/menu/subcategories',
      { outlet: 'akra' }).subscribe(data => {

        this.itemsList = data.data.subcategories;

        this.loading = false
      })


    this.http.post<any>('https://6eir4x970g.execute-api.us-east-1.amazonaws.com/dev/menu/categories',
      { outlet: 'akra' }).subscribe(data => {

        this.categoriesList = data.data.categories;
      })

  }

  handleItemCreateInput(e: any, inputType: any) {
    if (inputType == 'name') {
      this.itemName = e.target.value
    }
    else if (inputType == 'desc') {
      this.itemDesc = e.target.value
    }
    else if (inputType == 'price') {
      this.itemPrice = e.target.value
    }
    console.log(e.target.value, inputType)
  }

  uploadFile(event: any) {
    console.log(event)
    const file: File = event.target.files[0];
    console.log(file)

    if (file) {
      this.uploadedFile.append("itempic", file);
      console.log(this.uploadedFile)
    }
  }

  changeCategory(e: any) {
    console.log(e, e.target.value)
    this.category = Number(e.target.value)
  }

  getImageURL(url: any) {
    return String(url)
  }

  async submitItem() {

    console.log(this.itemName, this.itemDesc)
    console.log(this.uploadedFile)
    const body = new FormData()

    // @ts-ignore
    if (document.getElementById("create-item-pic")?.files[0].size > 300000) {
      window.alert("File size of image should be less than 300kb");
      return;
    }

    // @ts-ignore
    body.append("subcategorypic", document.getElementById("create-item-pic")?.files[0])

    // this.uploadedFile.append('categorypic', this.uploadedFile)
    body.append('name', this.itemName)
    body.append('desc', this.itemDesc ? this.itemDesc : "")
    body.append('categorySno', this.category)
    // body.append('price', this.itemPrice)
    body.append('outlet', 'akra')

    this.creatingSubCategory = true
    this.http.post<any>('https://6eir4x970g.execute-api.us-east-1.amazonaws.com/dev/menu/subcategory/create',
      body).subscribe(data => {
        console.log(data);
        this.creatingSubCategory = false;
        window.location.reload()
      }, err => {
        window.alert(err.message)
      })

  }

  handleDeleteItem(item: any) {
    console.log(item.iSno)

    if (confirm("Are you sure you want to delete the category") == true) {
      this.loading = true
      console.log("deleting")
      this.http.post<any>('https://6eir4x970g.execute-api.us-east-1.amazonaws.com/dev/menu/subcategory/delete',
        { subCategorySno: item.iSno, outlet: 'akra' }).subscribe(data => {
          console.log(data);
          this.creatingSubCategory = false;
          window.location.reload()
        })
    }
  }

  editItemClicked(item: any) {
    this.editSubCategoryName = item.cName
    this.editSubCategoryDesc = item.cDesc
    this.editSubCatCategorySno = item.iCategoryPK
    this.editSubCategorySno = item.iSno
    // this.editItemPrice = item.cPrice
    console.log(item)
  }

  uploadFileEdit(event: any) {
    const file: File = event.target.files[0];
    console.log(file)

    if (file) {
      this.uploadedFileEdit.append("categorypic", file);
      console.log(this.uploadedFileEdit)
    }
  }


  handleItemEditInput(e: any, inputType: any) {
    if (inputType == 'name') {
      this.editSubCategoryName = e.target.value
    }
    else if (inputType == 'desc') {
      this.editSubCategoryDesc = e.target.value
    }
    // else if (inputType == 'price') {
    //   this.editItemPrice = e.target.value
    // }
    console.log(e.target.value, inputType)
  }

  changeCategoryEdit(e: any) {
    console.log(e, e.target.value)
    this.editSubCatCategorySno = Number(e.target.value)
  }


  handleSubmitEditItem() {
    const body = new FormData()

    // @ts-ignore
    if (document.getElementById("edit-item-pic")?.files.length > 0) {

      // @ts-ignore
      if (document.getElementById("edit-item-pic")?.files[0].size > 300000) {
        window.alert("File size of image should be less than 300kb");
        return;
      }

      // @ts-ignore
      body.append("subcategorypic", document.getElementById("edit-item-pic")?.files[0])
      body.append("newpic", "true")
    }
    else {
      body.append("newpic", "false")
    }

    // this.uploadedFile.append('categorypic', this.uploadedFile)
    body.append('name', this.editSubCategoryName)
    body.append('desc', this.editSubCategoryDesc ? this.editSubCategoryDesc : "")
    body.append('categorySno', this.editSubCatCategorySno)
    body.append('outlet', 'akra')
    body.append('subCategorySno', this.editSubCategorySno)
    // body.append('price', this.editItemPrice)


    this.editingSubCategory = true
    this.http.post<any>('https://6eir4x970g.execute-api.us-east-1.amazonaws.com/dev/menu/subcategory/edit',
      body).subscribe(data => {
        console.log(data);
        this.editingSubCategory = false;
        window.location.reload()
      })

  }

}
