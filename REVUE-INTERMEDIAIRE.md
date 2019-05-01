- Ourdia semble avoir très peu contribué au code source => à vérifier
- /!\ je ne peux pas exécuter mes tests automatisés (https://github.com/adrienjoly/ava-tests-for-note-keeper) sur votre serveur car ma requête sur "POST /signup" retourne une erreur 500. (erreur interne) => merci de corriger votre API en relisant le cahier des charges: https://adrienjoly.com/cours-nodejs/05-proj/
- penser à utiliser `{ useNewUrlParser: true }` lors de la connexion à MongoDB
- à noter que j'obtiens une erreur 400 quand j'exécute la requête `curl` que vous fournissez dans votre readme:

```sh
$ curl -X POST --header "Content-Type: application/json," --data "{
        "username": "$username",
        "password": "$pwd"
    }" http://localhost:3000/signup

# => {"error":"Le champ utilisateur ou password est vide"}%  
```
