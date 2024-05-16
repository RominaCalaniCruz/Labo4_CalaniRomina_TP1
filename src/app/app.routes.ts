import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'about', pathMatch: 'full' },
    // { path: 'about', loadComponent: () => import('./home/about/about.component').then(m => m.AboutComponent) },
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    { path: 'games', loadChildren: () => import('./games/games.module').then(m => m.GamesModule) },
    { path: 'encuesta', loadComponent: () => import('./encuesta/encuesta.component').then(c => c.EncuestaComponent) },
    { path: 'chat', loadComponent: () => import('./chat/chat.component').then(c => c.ChatComponent) },
    { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
    { path: 'about', loadComponent: () => import('./home/about/about.component').then(c => c.AboutComponent)}
];
