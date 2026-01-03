import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { StatusDotDirective } from '../../directives/status-dot';

@Component({
  selector: 'app-chats-component',
  imports: [CommonModule, StatusDotDirective],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css',
})
export class ChatsComponent {
  constructor(public chatService: ChatService, private router: Router) { }

  open(id: string) {
    this.router.navigate(['/chats', id])
  }

  nuevo() {
    this.router.navigate(['/nuevo'])
  }

}

