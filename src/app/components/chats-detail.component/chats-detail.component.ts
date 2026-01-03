import { CommonModule } from '@angular/common';
import { Component, computed, ElementRef, OnInit, Signal, ViewChild, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Chat } from '../../models/chat';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { getRandomMessage } from '../../utils/messageGenerator';

@Component({
  selector: 'app-chats-detail-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './chats-detail.component.html',
  styleUrls: ['./chats-detail.component.css'],
})
export class ChatsDetailComponent implements OnInit, AfterViewChecked {
  chatSignal!: Signal<Chat | undefined>;
  private id?: string;
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  formBuilder: FormBuilder;
  messageForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    fb: FormBuilder
  ) {
    this.formBuilder = fb;
    this.messageForm = this.formBuilder.group(
      {
        message: [
          '',
          [
            Validators.required,
          ]
        ]
      }
    )
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') ?? undefined;

      if (this.id) {
        this.chatSignal = this.chatService.getChatSignal(this.id);
      } else {
        this.chatSignal = computed(() => undefined);
      }
    });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    if (this.messagesContainer) {
      const container = this.messagesContainer.nativeElement;
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
      }, 0);
    }
  }
  send() {
    if (!this.id || !this.messageForm.value.message.trim()) return;

    this.chatService.sendMessage(this.id, this.messageForm.value.message.trim(), true);
    this.messageForm.reset();
    this.scrollToBottom();
    this.simulateResponse(this.id);
  }

  simulateResponse(id: string) {
    setTimeout(() => {
      this.chatService.sendMessage(id, getRandomMessage(), false);
      this.scrollToBottom();
    }, 2000);
  }

  formatDate(date: string) {
    if (!date) return '';
    const dateTime = new Date(date);
    return dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
