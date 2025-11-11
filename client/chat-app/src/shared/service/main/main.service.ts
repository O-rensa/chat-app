import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Message_t } from "../../model/main/main.model";

@Injectable({
  providedIn: "root"
})
export class MainService {
  private readonly baseUrl: string = "http://localhost:3000";
  private ws!: WebSocket;
  private messageSubject = new Subject<Message_t>(); 

  constructor(private readonly httpClient: HttpClient) {
  }

  createRoom(roomId: string, roomName: string): Observable<{message: string, roomId: string}> {
    const request = {
      roomId: roomId,
      roomName: roomName
    }
    return this.httpClient.post<{message: string, roomId: string}>(`${this.baseUrl}/rooms`, request);
  }

  getRoomList(): Observable<{id: string, name: string}> {
    return this.httpClient.get<{id: string, name: string}>(`${this.baseUrl}/rooms`);
  }

  connectWebSocket(): void {
    this.ws = new WebSocket("ws://localhost:3000/ws");
    this.ws.onopen = () => console.log("WebSocket connected");
    this.ws.onerror = (err) => console.error("WebSocket error:", err);

    this.ws.onclose = (event) =>  {

    }

    this.ws.onmessage = (event) => {
      try {
        const msg: Message_t = JSON.parse(event.data);
        this.messageSubject.next(msg);
      } catch (err) {
        console.warn("Received non-JSON message:", event.data);
      }
    }
  }

  joinRoom(roomId: string, roomName: string, username: string, avatarId: number): void {
    if (!this.ws || this.ws.readyState != WebSocket.OPEN) {
      console.warn("WebSocket not connected yet");
      return;
    }

    const request: Message_t = {
      action: "join",
      roomId: roomId,
      roomName: roomName,
      text: "",
      username: username,
      avatarId: avatarId,
    }

    this.ws.send(JSON.stringify(request));
  }

  sengMessage(roomId: string, text: string, username: string, avatarId: number): void {
    if (!this.ws || this.ws.readyState != WebSocket.OPEN) {
      console.warn("WebSocket not connected yet");
      return;
    }

    const request: Message_t = {
      action: "join",
      roomId: roomId,
      roomName: "",
      text: text,
      username: username,
      avatarId: avatarId,
    }

    this.ws.send(JSON.stringify(request));
  }

  onMessage(): Observable<Message_t> {
    return this.messageSubject.asObservable();
  }

  logOut(): void {
    this.ws.close(1001);
  }
}