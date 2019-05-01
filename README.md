# API nodeJS1

Ce projet est un projet scolaire et le but est de tester une API en Node.JS.
Vous aurez donc accès ici, à une application hébergé sur Heroku afin d'effectuer les différents tests.
Application : https://lit-forest-30323.herokuapp.com/

## Comment utiliser

```
https://lit-forest-30323.herokuapp.com/
```

- Nous pouvons aussi utiliser un certaine route pour gerer nos notes :

  - S'inscrire:

    ```
    curl -X POST --header "Content-Type: application/json" --data "{\"username\":\"demain\",\"password\":\"demain\"}" http://localhost:3000/signup
    ```

  - Se connecter :

   ```
   $ curl -X POST --header "Content-Type: application/json" --data "{\"username\":\"demain\",\"password\":\"demain\"}" http://localhost:3000/signin
   ```

  - Insérer une note :

    ```
    $ curl -X PUT --header "Content-Type: application/json,x-access-token: $token" --data "{"content": "test 16:29"}" https://localhost:3000/notes
    ```

  - Recuperer une note 

    ```
    $ curl -X GET --header "Content-Type: application/json,x-access-token: $token"  https://llocalhost:3000/notes
    ```

    

  - Modifier une note

    ```
    $ curl -X PATCH --header "Content-Type: application/json,x-access-token: $token" --data "{"content": "test 16:31"}" https://localhost:3000/notes/$id
    ```

    

  - Supprimer une note 

    ```
    $ curl -X DELETE --header "Content-Type: application/json,x-access-token: $token"  https://localhost:3000/notes$id
    ```

Remplacez les $... par vos valeur 
## Installation

Assurez-vous d'avoir installé Node.JS avant de commencer.

```
$ npm install
```

## Créer avec

- [Express](https://expressjs.com/en/api.html) - The web framework used

## Auteurs

- **Arthur BLANC** 
- **Tristan LUONG**
- **Ourdia OUALIKEN**
