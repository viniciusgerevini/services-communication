package main

import (
  "log"
  "net/http"
  "github.com/gorilla/websocket"
)

func WebSocketHandler(w http.ResponseWriter, r *http.Request) {
  upgrader := websocket.Upgrader{
    CheckOrigin: func(r *http.Request) bool {
      return true
    },
  }

  connection, err := upgrader.Upgrade(w, r, nil)

  if err != nil {
    log.Println("WS initialization error:", err)
    return
  }

  defer connection.Close()
  go listenToUpdates(connection)
  listenToMessages(connection)
}

func listenToMessages(connection *websocket.Conn) {
  for {
    _, message, err := connection.ReadMessage()
    if err != nil {
      log.Println("read:", err)
      break
    }

    log.Printf("recv: %s", message)
    //TODO do something with received message
  }
}

func listenToUpdates(connection *websocket.Conn) {
  for {
    log.Println("register user")
    log.Println("yep yep yep")
    message := []byte("yep yep yep")
    err := connection.WriteMessage(websocket.TextMessage, message)
    if err != nil {
      log.Println("write:", err)
      log.Println("deregister user")
      break
    }
  }
}

