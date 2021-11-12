import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { CategorySliderComponent } from "../shared/components/category-slider/category-slider.component";
import { SearchComponent } from "../shared/components/search/search.component";
import { ProductCardComponent } from "../shared/components/product-card/product-card.component";

@NgModule({
	declarations: [
		ProductListComponent,
		CategorySliderComponent,
		SearchComponent,
		ProductCardComponent,
	],
	imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
	exports: [ProductListComponent],
})
export class ProductsModule {}
