import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Catalog } from 'src/app/shared/models/catalog';
import { CatalogService } from 'src/app/shared/services/catalog.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  @ViewChild('myModal') myModal: any;
  CatalogList: Catalog[] = [

  ];

  myForm: FormGroup;
  onEdit:boolean = false;

  constructor(private route: ActivatedRoute,private fb: FormBuilder,private catalogService: CatalogService,public dialog: MatDialog) {
    this.myForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required]
    });
    this.route.data.subscribe(res => {
      this.CatalogList = [...this.CatalogList, ...res['CatalogList']];
      this.populateCatalogListWithImages();
    });

   }

   populateCatalogListWithImages(): void {
    this.CatalogList.forEach(item => {
      item.imageUrl = this.generateRandomImage();
    });
  }

   generateRandomImage(): string {
    const width = 300; // Adjust width as needed
    const height = 200; // Adjust height as needed
    const randomImageId = Math.floor(Math.random() * 1000); // Generate random image ID
    return `https://source.unsplash.com/random/${width}x${height}?car=${randomImageId}`;
  }

  patchValue(catalog: Catalog) {
    if(catalog){
      this.myForm.patchValue({
        id: catalog.id,
        name: catalog.name,
        description: catalog.description,
        category: catalog.category
      });
      this.onEdit = true;
    }
  }


  onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);

      let newCatalog: Catalog = {
        name: this.myForm.value.name,
        description: this.myForm.value.description,
        category: this.myForm.value.category
      };
      this.catalogService.post(newCatalog).subscribe(res => {
        if(res){
          this.CatalogList.push(res);
          this.populateCatalogListWithImages();
          this.myForm.reset();
        }
      });
    }
  }

  onSubmitEdit() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);

      let newCatalog: Catalog = {
        id: this.myForm.value.id,
        name: this.myForm.value.name,
        description: this.myForm.value.description,
        category: this.myForm.value.category
      };
      this.catalogService.put(newCatalog).subscribe(res => {
        if(res){
          const index = this.CatalogList.findIndex(item => item.id === res.id);

          if (index !== -1) {
            // Replace the old item with the new one at the found index
            this.CatalogList[index] = res;
          } else {
            // If the item doesn't exist in CatalogList, push the new item
            this.CatalogList.push(res);
          }
          this.populateCatalogListWithImages();

          this.myForm.reset();
          this.onEdit = false;
        }
      });
    }
  }

}
