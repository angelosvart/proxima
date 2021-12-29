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
import { LoginModule } from "./users/users.module";
import { HomeComponent } from "./views/home/home.component";
import { ProductsModule } from "./products/products.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { PostcodeSearchComponent } from "./shared/components/postcode-search/postcode-search.component";
import { HeaderComponent } from "./views/header/header.component";
import { FooterComponent } from "./views/footer/footer.component";
import { OrdersModule } from "./orders/orders.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { JwtInterceptor } from "./users/services/jwt.interceptor";

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
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
		LoginModule,
		ProductsModule,
		OrdersModule,
		DashboardModule,
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: JwtInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
