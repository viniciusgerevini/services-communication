package main

import (
  "log"
  "net/http"
)

func main () {
  http.HandleFunc("/ws", WebSocketHandler)

  err := http.ListenAndServe(":9292", nil)

  if err == nil {
    log.Println("everything is fine")
  } else {
    log.Fatal("Server initialization error", err)
  }
}
