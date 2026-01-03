import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Chat } from '../models/chat';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private _chats: WritableSignal<Chat[]> = signal(this.createMock());
  public readonly chats: Signal<Chat[]> = this._chats;
  constructor() { }

  private createMock(): Chat[] {
    const now = new Date().toISOString();
    return [
      {
        id: '1',
        name: 'Guille',
        lastMessage: 'How are you?',
        messages: [
          {
            id: '1',
            text: 'Hey!',
            fromMe: false,
            date: now
          },
          {
            id: '2',
            text: 'How are you?',
            fromMe: true,
            date: now
          }
        ],
        online: true,
        profile_picture: 'https://www.fundacionkonex.org/custom/web/data/imagenes/repositorio/2011/4/20/3000/201603161238201f5e7f2748adabf08629a6312ac3bfdd.jpg',
      },
            {
        id: '2',
        name: 'Brad',
        lastMessage: 'How is it going?',
        messages: [
          {
            id: '1',
            text: 'Hello buddy',
            fromMe: false,
            date: now
          },
          {
            id: '2',
            text: 'How is it going?',
            fromMe: false,
            date: now
          }
        ],
        online: true,
        profile_picture: 'https://i.pinimg.com/564x/06/5e/5a/065e5a16122381c429eb2a8a6937b55e.jpg',
      },      {
        id: '3',
        name: 'Beatrix',
        lastMessage: 'Hi, do you know where I can find Bill?',
        messages: [
          {
            id: '1',
            text: 'Hi, do you know where I can find Bill?',
            fromMe: false,
            date: now
          }
        ],
        online: true,
        profile_picture: 'https://wiki.tarantino.info/images/Uma.jpg',
      }
    ]
  }

  getChatsSnapshot(): Chat[] {
    return this._chats()
  }

  getChatSignal(id: string): Signal<Chat | undefined> {
    return computed(
      () => { return this._chats().find(chat => chat.id === id) }
    )
  }

  createChat(name: string): Chat {
    const new_chat: Chat = {
      id: Date.now().toString(),
      name: name,
      lastMessage: '',
      messages: [],
      online: false,
      profile_picture: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
    }
    this._chats.update(
      (chats_actuales) => {
        return [...chats_actuales, new_chat]
      }
    )
    return new_chat;
  }

  sendMessage(chat_id: string, text: string, fromMe: boolean): Message | undefined {
    const new_message: Message = {
      id: Date.now().toString(),
      text: text,
      fromMe: fromMe,
      date: new Date().toISOString()
    }

    this._chats.update(
      (chats_actuales) => {
        return chats_actuales.map(
          (chat) => {
            //si no son el chat que quiero actualizar, dejo el mensaje como esta
            if (chat.id !== chat_id) {
              return chat;
            }
            const updated_messages = [...chat.messages, new_message];
            return {
              ...chat,
              messages: updated_messages,
              lastMessage: text
            }
          }

        )
      }
    )
    return new_message
  }
}
