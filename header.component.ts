import { Component, OnInit} from '@angular/core';
import { DataStorageService } from '../share/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  

   constructor(private dataStorageServices: DataStorageService) { }

  ngOnInit() {
  }
  // onSaveData(){
  //   this.dataStorageServices.storeRecipes();
  // }
  // onFetchData(){
  //   this.dataStorageServices.fetchRecipes().subscribe();

  // }
}
