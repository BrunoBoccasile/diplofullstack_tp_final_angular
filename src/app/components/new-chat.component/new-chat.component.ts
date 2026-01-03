import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-chat-component',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './new-chat.component.html',
  styleUrl: './new-chat.component.css',
})
export class NewChatComponent {
  formBuilder: FormBuilder;
  newContactForm: FormGroup;


  constructor(private chatService: ChatService, private router: Router, fb: FormBuilder) {
    this.formBuilder = fb;
    this.newContactForm = this.formBuilder.group({
      name: ['', Validators.required],
      initial: ['']
    });

  }

  create() {
    if (!this.newContactForm.value.name.trim()) {
      return
    }
    const chat = this.chatService.createChat(this.newContactForm.value.name.trim());
    if (this.newContactForm.value.initial && this.newContactForm.value.initial.trim()) {
      this.chatService.sendMessage(chat.id, this.newContactForm.value.initial.trim(), true);
    }
    this.router.navigate(['/chats', chat.id])
  }
  cancel() {
    this.router.navigate(['/chats', 1])
  }
}
