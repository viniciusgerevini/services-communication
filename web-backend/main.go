package main

import (
  "log"
  "net/http"
)

func main () {
  http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
    WebSocketHandler(w, r)
  })

  err := http.ListenAndServe(":9292", nil)

  if err != nil {
    log.Fatal("Server initialization error: ", err)
  }
}
