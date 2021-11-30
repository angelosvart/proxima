import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { CategorySliderComponent } from "./components/category-slider/category-slider.component";
import { SearchComponent } from "./components/search/search.component";
import { ProductCardComponent } from "./components/product-card/product-card.component";
import { RouterModule } from "@angular/router";
import { ProductDetailComponent } from "./components/product-detail/product-detail.component";
import { RelatedProductsComponent } from "./components/related-products/related-products.component";

@NgModule({
	declarations: [
		ProductListComponent,
		CategorySliderComponent,
		SearchComponent,
		ProductCardComponent,
		ProductDetailComponent,
		RelatedProductsComponent,
	],
	imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
	exports: [ProductListComponent, ProductDetailComponent],
})
export class ProductsModule {}
