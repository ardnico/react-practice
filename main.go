package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"

	"./handler.go"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

const defaultPort = "191952"

func port() string {
	p := os.Getenv("PORT")
	if p != "" {
		return ":" + p
	}
	return ":" + defaultPort
}

func main() {
	connStr := fmt.Sprintf(
		"%s:%s@tcp(%s)/%s?charset=utf8mb4&parseTime=True",
		"DBUSER",
		"DBPASSWORD",
		"DBPROTOCOL",
		"DBNAME",
	)

	db, err := gorm.Open("mysql", connStr)
	if err != nil {
		log.Fatal(err)
	}

	h := handler.New(db)

	server := &http.Server{
		Addr:    port(),
		Handler: h,
	}

	go func() {
		stop := make(chan os.Signal, 1)
		signal.Notify(stop, os.Interrupt)

		<-stop
		log.Println("Shutting down...")

		if err := server.Shutdown(context.Background()); err != nil {
			log.Println("Unable to shutdown:", err)
		}

		log.Println("Server stopped")
	}()

	log.Println("Listening on http://localhost" + port())
	if err := server.ListenAndServe(); err != http.ErrServerClosed {
		log.Fatal(err)
	}
}
