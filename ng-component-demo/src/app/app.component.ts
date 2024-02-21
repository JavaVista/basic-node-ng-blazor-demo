import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { defineCustomElements } from 'stencil-web-component-demo/loader/index';
import { MarvelApiService } from './marvel-api.service';
import { AvApiService } from './av-api.service';

defineCustomElements(window);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  title = 'ng-component-demo';
  @ViewChild('marvelSearchInput')
  searchInputComponent!: ElementRef;

  @ViewChild('stockPrice')
  stockPriceElement!: ElementRef;

  @ViewChild('stockFinder')
  stockFinderElement!: ElementRef;


  constructor(
    private marvelApiService: MarvelApiService,
    private avApiService: AvApiService) { }

  ngAfterViewInit() {
    this.searchInputComponent.nativeElement.apiService = this.marvelApiService;

    this.stockPriceElement.nativeElement.apiService = this.avApiService;
    this.stockFinderElement.nativeElement.apiService = this.avApiService;
  }
}
