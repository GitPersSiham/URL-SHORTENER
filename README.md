# URL shortner application 

Ceci est un exemple de la façon de faire une application qui raccourcit l’url entrée par le client.

Pour cette réaliser cette application j'ai utlisé express , mongoose comme orm et mongoDb atlas 

## La partie fonctionnelle est la suivante : 

* Création d’un lien court depuis une URL (RFC 3986)
* Redirection d’un lien court vers l’URL original
* J'ai utilisé short-id pour afficher 6 caractères alphanumériques 
* Pour l'interface HTML j'ai utlisé EJS avec un champ de saisie pour l’URL et le nécessaire pour informer 
 l’utilisateur sur le statut de sa requête (succès, erreur).