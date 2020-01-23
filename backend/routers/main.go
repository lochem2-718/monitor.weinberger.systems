package routers

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/cors"
)

func Run(port int) {

	apiRouter = chi.NewRouter()
	apiRouter.Use(middleware.SetHeader("Content-Type", "application/json"))

	corsSettings = cors.New()

	mainRouter := chi.NewRouter()
	mainRouter.Use(cors.Handler)

	http.ListenAndServe(fmt.Sprintf(":%d", port), mainRouter)
}
