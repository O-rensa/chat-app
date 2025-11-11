package main

import "github.com/gofiber/contrib/websocket"

type Message_t struct {
	Action   string `json:"action"`
	RoomName string `json:"roomName"`
	RoomId   string `json:"roomId"`
	Username string `json:"username"`
	AvatarId int    `json:"avatarId"`
	Text     string `json:"text"`
}

type Room_t struct {
	ID      string
	Name    string
	Clients map[*websocket.Conn]bool
}
