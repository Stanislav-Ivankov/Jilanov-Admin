import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./core/guards/auth.guard";

const routes: Routes = [
  {
	  path: 'login',
	  loadChildren: './pages/login/login.module#LoginModule'
	},
	{
		canActivate: [AuthGuard],
		path: 'dashboard',
		loadChildren: './pages/dashboard/dashboard.module#DashboardModule',
	},
	{
		canActivate: [AuthGuard],
		path: 'carousel',
		loadChildren: './pages/carousel/carousel.module#CarouselModule',
	},
	{
		canActivate: [AuthGuard],
		path: 'categories',
		loadChildren: './pages/categories/categories.module#CategoriesModule',
	},
	{
		canActivate: [AuthGuard],
		path: 'sub-categories',
		loadChildren: './pages/sub-categories/sub-categories.module#SubCategoriesModule',
	},
	{
		canActivate: [AuthGuard],
		path: 'filters',
		loadChildren: './pages/filters/filters.module#FiltersModule',
	},
	{
		canActivate: [AuthGuard],
		path: 'footer-links',
		loadChildren: './pages/footer-links/footer-links.module#FooterLinksModule',
	},
	{
		canActivate: [AuthGuard],
		path: 'image-editor',
		loadChildren: './pages/image-editor/image-editor.module#ImageEditorModule',
	},
	{
		canActivate: [AuthGuard],
		path: 'messages',
		loadChildren: './pages/messages/messages.module#MessagesModule',
	},
	{
		canActivate: [AuthGuard],
		path: 'orders',
		loadChildren: './pages/orders/orders.module#OrdersModule',
	},
	{
		canActivate: [AuthGuard],
		path: 'products',
		loadChildren: './pages/products/products.module#ProductsModule',
	},
	{
		canActivate: [AuthGuard],
		path: 'users',
		loadChildren: './pages/users/users.module#UsersModule',
	},
	{
		path: '**',
		redirectTo: '/login'
	}
];

export const routing = RouterModule.forRoot(routes);