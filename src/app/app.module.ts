import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { StoreModule } from "@ngrx/store";
import { environment } from "src/environments/environment";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { effects } from "./app.effects";
import { EffectsModule } from "@ngrx/effects";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { appReducers } from "./app.reducer";
import { LoginModule } from "./login/login.module";
import { HomeComponent } from "./views/home/home.component";
import { ProductsModule } from "./products/products.module";
import { HttpClientModule } from "@angular/common/http";
import { PostcodeSearchComponent } from "./shared/components/postcode-search/postcode-search.component";
import { HeaderComponent } from "./views/header/header.component";
import { FooterComponent } from "./views/footer/footer.component";

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		PostcodeSearchComponent,
		HeaderComponent,
		FooterComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		StoreModule.forRoot(appReducers),
		EffectsModule.forRoot(effects),
		HttpClientModule,
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
		LoginModule,
		ProductsModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
