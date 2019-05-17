module Main exposing (main)

import Browser exposing (application)
import Html exposing (Html, div, p, text)


main : Program () model msg
main =
    application
        { init = init
        , view = view
        , update = update
        , subscriptions = Sub.none
        , onUrlRequest = update
        , onUrlChange = update
        }


type alias Model =
    { meme : String
    }


type Msg
    = Meh
    | Bleh


view : Model -> Html Msg
view model =
    div []
        [ p [] [ text "Hello there!" ]
        , p [] [ text <| "Here is the Model's value" ++ model.meme  ]
        ]

update : Msg -> Model -> Model
update msg model =
    case msg of
        Meh ->
            { meme = "Meh" }
        Bleh ->
            { meme = "Bleh" }

init : Model
init =
    Model "I can't believe you've done this!"

