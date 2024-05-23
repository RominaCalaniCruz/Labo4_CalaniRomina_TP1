import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'games', loadChildren: () => import('./games/games.module').then(m => m.GamesModule) },
    { path: 'encuesta', loadComponent: () => import('./encuesta/encuesta.component').then(c => c.EncuestaComponent) },
    { path: 'chat', loadComponent: () => import('./chat/chat.component').then(c => c.ChatComponent) },
    { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
    { path: 'about', loadComponent: () => import('./components/about/about.component').then(c => c.AboutComponent)},
    {path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)}
];
