import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Catalog } from 'src/app/shared/models/catalog';
import { CatalogService } from 'src/app/shared/services/catalog.service';

@Component({
  selector: 'app-catalog-view',
  templateUrl: './catalog-view.component.html',
  styleUrls: ['./catalog-view.component.scss']
})
export class CatalogViewComponent {
  catalog:Catalog | undefined;
  constructor(private catalogService: CatalogService,private route: ActivatedRoute) {

    // Retrieve the ID parameter from the URL
    this.route.params.subscribe(params => {
      const id = params['id']; // Assuming 'id' is the name of your parameter
      this.catalogService.getById(id).subscribe(res => {
        this.catalog = res;
      });
    });

   }

  generateRandomImage(): string {
    const width = 500; // Adjust width as needed
    const height = 400; // Adjust height as needed
    const randomImageId = Math.floor(Math.random() * 1000); // Generate random image ID
    return `https://source.unsplash.com/random/${width}x${height}?car=${randomImageId}`;
  }

}
