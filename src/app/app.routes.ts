import { Routes } from '@angular/router';
import { ChatsComponent } from './components/chats.component/chats.component';
import { ChatsDetailComponent } from './components/chats-detail.component/chats-detail.component';
import { NewChatComponent } from './components/new-chat.component/new-chat.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'chats/1', pathMatch: 'full'
    },
    {
        path: 'chats', component: ChatsComponent
    },
    {
        path: 'chats/:id', component: ChatsDetailComponent,
    },
    {
        path: 'nuevo', component: NewChatComponent
    },
    {
        path: '**', redirectTo: 'chats'
    }
];
