import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {
  itemsList: any = []
  categoriesList: any = []
  loading = true
  category: any
  itemName: any
  itemDesc: any
  itemPrice: any
  uploadedFile: any = new FormData()
  uploadedFileEdit: any = new FormData()
  creatingItem: any = false;
  editingCategory: any = false;

  editItemName: any
  editItemDesc: any
  editItemPrice: any
  editCategoryFile: any
  editItemCategorySno: any
  editItemSno: any

  constructor(private http: HttpClient) { }
  ngOnInit() {
    if (window.localStorage.getItem("outlet") == null || window.localStorage.getItem("outlet") == undefined) {
      window.location.pathname = '/sign-in'
    }

    this.http.post<any>('https://6eir4x970g.execute-api.us-east-1.amazonaws.com/dev/menu/items',
      { outlet: 'akra' }).subscribe(data => {

        this.itemsList = data.data.items;

        this.loading = false
      })


    this.http.post<any>('https://6eir4x970g.execute-api.us-east-1.amazonaws.com/dev/menu/subcategories',
      { outlet: 'akra' }).subscribe(data => {

        this.categoriesList = data.data.subcategories;
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
    body.append("itempic", document.getElementById("create-item-pic")?.files[0])

    // this.uploadedFile.append('categorypic', this.uploadedFile)
    body.append('name', this.itemName)
    body.append('desc', this.itemDesc ? this.itemDesc : "")
    body.append('categorySno', this.category)
    body.append('price', this.itemPrice)
    body.append('outlet', 'akra')

    this.creatingItem = true
    this.http.post<any>('https://6eir4x970g.execute-api.us-east-1.amazonaws.com/dev/menu/item/create',
      body).subscribe(data => {
        console.log(data);
        this.creatingItem = false;
        // window.location.reload()
      }, err => {
        window.alert(err.message)
      })

  }

  handleDeleteItem(item: any) {
    console.log(item.iSno)

    if (confirm("Are you sure you want to delete the category") == true) {
      this.loading = true
      console.log("deleting")
      this.http.post<any>('https://6eir4x970g.execute-api.us-east-1.amazonaws.com/dev/menu/item/delete',
        { itemSno: item.iSno, outlet: 'akra' }).subscribe(data => {
          console.log(data);
          this.creatingItem = false;
          window.location.reload()
        })
    }
  }

  editItemClicked(item: any) {
    this.editItemName = item.cName
    this.editItemDesc = item.cDesc
    this.editItemCategorySno = item.iCategoryPK
    this.editItemSno = item.iSno
    this.editItemPrice = item.cPrice
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
      this.editItemName = e.target.value
    }
    else if (inputType == 'desc') {
      this.editItemDesc = e.target.value
    }
    else if (inputType == 'price') {
      this.editItemPrice = e.target.value
    }
    console.log(e.target.value, inputType)
  }

  changeCategoryEdit(e: any) {
    console.log(e, e.target.value)
    this.editItemCategorySno = Number(e.target.value)
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
      body.append("itempic", document.getElementById("edit-item-pic")?.files[0])
      body.append("newpic", "true")
    }
    else {
      body.append("newpic", "false")
    }

    // this.uploadedFile.append('categorypic', this.uploadedFile)
    body.append('name', this.editItemName)
    body.append('desc', this.editItemDesc ? this.editItemDesc : "")
    body.append('categorySno', this.editItemCategorySno)
    body.append('outlet', 'akra')
    body.append('itemSno', this.editItemSno)
    body.append('price', this.editItemPrice)


    this.editingCategory = true
    this.http.post<any>('https://6eir4x970g.execute-api.us-east-1.amazonaws.com/dev/menu/item/edit',
      body).subscribe(data => {
        console.log(data);
        this.editingCategory = false;
        window.location.reload()
      })

  }

}
