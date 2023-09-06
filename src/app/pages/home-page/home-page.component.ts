import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  categoryList: any = []
  loading = true
  mainMenu: any
  categoryName: any
  categoryDesc: any
  uploadedFile: any = new FormData()
  uploadedFileEdit: any = new FormData()
  creatingCategory: any = false;
  editingCategory: any = false;

  editCategoryName: any
  editCategoryDesc: any
  editCategoryFile: any
  editCategoryMenu: any
  editCategorySno: any

  constructor(private http: HttpClient) { }
  ngOnInit() {

    this.http.post<any>('https://6eir4x970g.execute-api.us-east-1.amazonaws.com/dev/virtual/menu/categories',
      { outlet: 'akra', mainMenuSno: 1 }).subscribe(data => {
        // console.log(data);
        data.data.categories.map((category: any) => {
          this.categoryList.push({ ...category, mainMenuName: data.data.menuData[0].cName, mainMenuSno: data.data.menuData[0].iSno })
        })
        // console.log(this.categoryList)
        this.loading = false
      })

    this.http.post<any>('https://6eir4x970g.execute-api.us-east-1.amazonaws.com/dev/virtual/menu/categories',
      { outlet: 'akra', mainMenuSno: 2 }).subscribe(data => {
        // console.log(data);
        data.data.categories.map((category: any) => {
          this.categoryList.push({ ...category, mainMenuName: data.data.menuData[0].cName, mainMenuSno: data.data.menuData[0].iSno })
        })
        // console.log(this.categoryList)
        this.loading = false
      })

    if (window.localStorage.getItem("outlet") == null || window.localStorage.getItem("outlet") == undefined) {
      window.location.pathname = '/sign-in'
    }

  }

  handleCategoryCreateInput(e: any, inputType: any) {
    if (inputType == 'name') {
      this.categoryName = e.target.value
    }
    else if (inputType == 'desc') {
      this.categoryDesc = e.target.value
    }
    console.log(e.target.value, inputType)
  }

  uploadFile(event: any) {
    console.log(event)
    const file: File = event.target.files[0];
    console.log(file)

    if (file) {
      this.uploadedFile.append("categorypic", file);
      console.log(this.uploadedFile)
    }
  }

  changeMainMenu(e: any) {
    console.log(e, e.target.value)
    this.mainMenu = Number(e.target.value)
  }


  getImageURL(url: any) {
    return String(url)
  }


  async submitCategory() {

    console.log(this.categoryName, this.categoryDesc)
    console.log(this.uploadedFile)
    const body = new FormData()

    // @ts-ignore
    if (document.getElementById("create-category-pic")?.files[0].size > 300000) {
      window.alert("File size of image should be less than 300kb");
      return;
    }

    // @ts-ignore
    body.append("categorypic", document.getElementById("create-category-pic")?.files[0])

    // this.uploadedFile.append('categorypic', this.uploadedFile)
    body.append('name', this.categoryName)
    body.append('desc', this.categoryDesc ? this.categoryDesc : "")
    body.append('mainMenuSno', this.mainMenu)
    body.append('outlet', 'akra')

    this.creatingCategory = true
    this.http.post<any>('https://6eir4x970g.execute-api.us-east-1.amazonaws.com/dev/menu/category/create',
      body).subscribe(data => {
        console.log(data);
        this.creatingCategory = false;
        window.location.reload()
      }, err => {
        window.alert(err.message) 
      })

  }

  handleDeleteCategory(category: any) {
    console.log(category.iSno)
    this.loading = true
    if (confirm("Are you sure you want to delete the category") == true) {
      console.log("deleting")
      this.http.post<any>('https://6eir4x970g.execute-api.us-east-1.amazonaws.com/dev/menu/category/delete',
        { categorySno: category.iSno, outlet: 'akra' }).subscribe(data => {
          console.log(data);
          this.creatingCategory = false;
          window.location.reload()
        })
    }
  }

  editCategoryClicked(category: any) {
    this.editCategoryName = category.cName
    this.editCategoryDesc = category.cDesc
    this.editCategoryMenu = category.iMainMenuPK
    this.editCategorySno = category.iSno
    console.log(category)
  }

  uploadFileEdit(event: any) {
    const file: File = event.target.files[0];
    console.log(file)

    if (file) {
      this.uploadedFileEdit.append("categorypic", file);
      console.log(this.uploadedFileEdit)
    }
  }


  handleCategoryEditInput(e: any, inputType: any) {
    if (inputType == 'name') {
      this.editCategoryName = e.target.value
    }
    else if (inputType == 'desc') {
      this.editCategoryDesc = e.target.value
    }
    console.log(e.target.value, inputType)
  }

  changeMainMenuEdit(e: any) {
    console.log(e, e.target.value)
    this.editCategoryMenu = Number(e.target.value)
  }


  handleSubmitEditCategory() {
    const body = new FormData()

    // @ts-ignore
    if (document.getElementById("edit-category-pic")?.files.length > 0) {

      // @ts-ignore
      if (document.getElementById("edit-category-pic")?.files[0].size > 300000) {
        window.alert("File size of image should be less than 300kb");
        return;
      }

      // @ts-ignore
      body.append("categorypic", document.getElementById("edit-category-pic")?.files[0])
      body.append("newpic", "true")
    }
    else {
      body.append("newpic", "false")
    }

    // this.uploadedFile.append('categorypic', this.uploadedFile)
    body.append('name', this.editCategoryName)
    body.append('desc', this.editCategoryDesc ? this.editCategoryDesc : "")
    body.append('mainMenuSno', this.editCategoryMenu)
    body.append('outlet', 'akra')
    body.append('categorySno', this.editCategorySno)


    this.editingCategory = true
    this.http.post<any>('https://6eir4x970g.execute-api.us-east-1.amazonaws.com/dev/menu/category/edit',
      body).subscribe(data => {
        console.log(data);
        this.editingCategory = false;
        window.location.reload()
      })

  }

}
