package main

import (
	"encoding/json"
	"log"
	"sync"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
)

var (
	rooms   = make(map[string]*Room_t)
	roomMux sync.RWMutex
)

func main() {
	app := fiber.New()

	app.Post("/rooms", func(c *fiber.Ctx) error {
		var req struct {
			RoomId   string `json:"roomId"`
			RoomName string `json:"roomName"`
		}

		if err := c.BodyParser(&req); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "invalid request",
			})
		}

		roomMux.Lock()
		defer roomMux.Unlock()

		if _, exists := rooms[req.RoomId]; exists {
			return c.Status(fiber.StatusConflict).JSON(fiber.Map{
				"error": "room already exists",
			})
		}

		rooms[req.RoomId] = &Room_t{
			ID:      req.RoomId,
			Name:    req.RoomName,
			Clients: make(map[*websocket.Conn]bool),
		}

		log.Printf("Room created: %s (%s)", req.RoomName, req.RoomId)
		return c.JSON(fiber.Map{
			"message": "room created",
			"roomId":  req.RoomId,
		})
	})

	app.Get("/rooms", func(c *fiber.Ctx) error {
		roomMux.RLock()
		defer roomMux.RUnlock()

		type RoomInfo struct {
			ID   string `json:"id"`
			Name string `json:"name"`
		}

		list := []RoomInfo{}

		for id, r := range rooms {
			list = append(list, RoomInfo{
				ID:   id,
				Name: r.Name,
			})
		}

		return c.JSON(list)
	})

	app.Get("/ws", websocket.New(webSocketIntance))

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Fiber WebSocket Chat with HTTP Room Management")
	})

	log.Fatal(app.Listen(":3000"))
}

func webSocketIntance(c *websocket.Conn) {
	defer func() {
		roomMux.Lock()
		for _, room := range rooms {
			delete(room.Clients, c)
		}
		roomMux.Unlock()
		c.Close()
	}()

	for {
		_, msg, err := c.ReadMessage()
		if err != nil {
			log.Println("read error:", err)
		}

		var m Message_t
		if err := json.Unmarshal(msg, &m); err != nil {
			log.Println("invalid message:", err)
			continue
		}

		switch m.Action {
		case "join":
			handleJoin(c, m)
		case "message":
			handleMessage(m)
		default:
			c.WriteMessage(1, []byte("unknown action"))
		}
	}
}

func handleJoin(c *websocket.Conn, m Message_t) {
	roomMux.Lock()
	defer roomMux.Unlock()

	room, ok := rooms[m.RoomId]

	if !ok {
		c.WriteMessage(1, []byte("Room not found"))
		return
	}

	room.Clients[c] = true
	c.WriteMessage(1, []byte("Joined room: "+room.Name))
	log.Printf("Client joined room: %s (%s)", room.Name, m.RoomId)
}

func handleMessage(m Message_t) {
	roomMux.RLock()
	room, ok := rooms[m.RoomId]
	roomMux.RUnlock()

	if !ok {
		return
	}

	for client := range room.Clients {
		if err := client.WriteMessage(1, []byte(m.Text)); err != nil {
			log.Println("write error: ", err)
			client.Close()

			roomMux.Lock()
			delete(room.Clients, client)
			roomMux.Unlock()
		}
	}
}
