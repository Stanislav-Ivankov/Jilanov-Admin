import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';

import { AuthGuard } from './guards/auth.guard';
import { AuthenticationInterceptor } from "./interceptors/authentication.interceptor";

import { ApiService } from './services/api.service';
import { AuthService } from "./services/auth.service";
import { CaroselService } from './services/carousel.service';
import { CategoriesService } from './services/categories.service';
import { SubCategoriesService } from './services/sub-categories.service';
import { DashboardService } from './services/dashboard.service';
import { FiltersService } from './services/filters.service';
import { FooterLinksService } from './services/footer-links.service';
import { ImageEditorService } from './services/image-editor.service';
import { LoginService } from './services/login.service';
import { MessagesService } from './services/messages.service';
import { OrdersService } from './services/orders.service';
import { ProductsService } from './services/products.service';
import { SlidesService } from './services/slides.service';
import { UsersService } from './services/users.service';

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http);
}

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		ReactiveFormsModule,
		FormsModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [
					HttpClient
				]
			}
		}),
		ToastrModule.forRoot({
			timeOut: 10000,
			positionClass: 'toast-bottom-right',
			preventDuplicates: true,
		})
	],
	declarations: [],
	exports: [
		TranslateModule,
		CommonModule,
		HttpClientModule,
		ReactiveFormsModule,
		FormsModule
	],
	providers: [
		AuthGuard,
		AuthService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthenticationInterceptor,
			multi: true
		},
		TranslateService,
		ApiService,
		CaroselService,
		CategoriesService,
		SubCategoriesService,
		DashboardService,
		FiltersService,
		FooterLinksService,
		ImageEditorService,
		LoginService,
		MessagesService,
		OrdersService,
		ProductsService,
		SlidesService,
		UsersService
	],
})

export class CoreModule {

	constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
		if (parentModule) {
			throw new Error('Core Module Is Already Loaded. Import Only In AppModule.');
		}
	}
}