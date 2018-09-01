# Application Galerie photo

Prérequis : Ce projet nécessite d'avoir installé Node JS sur son ordinateur.

1. Cloner le dépôt.
2. Installer les dépendances Node JS propres au backend et au frontend.

Effectuer les commandes suivantes depuis la racine du projet : 

       cd back
       npm install
       cd ..
       cd front
       npm install

3. Utiliser la base de données MongoDB

Installer MongoDB en suivant les instructions données à l'URL suivante:

https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

Puis effectuer les commandes suivantes dans un nouveau terminal

     sudo mkdir -p /data/db
     sudo chown -R $USER /data/db

On créé un dossier dans lequel MongoDB va stocker les données puis on attribue les droits à l'utilisateur sur ce dossier.


4. Démarrer la base de données MongoDB.

Dans un nouveau terminal lancer la commande suivante :

     mongod

Vous pouvez maintenant accéder à votre base de données avec Robo3T.
Entrer la commande suivante depuis la racine du projet : 

    cd MongoDB/robo3t-1.2.1-linux-x86_64-3e50a65/bin
    sudo chmod +x robo3t
    ./robot3t

Entrer les informations demandées si vous le souhaitez et créer une nouvelle connection (laisser les informations par défaut).
Cliquer sur "Connect", puis faire un click droit sur "New Connection" et sélectionner "Create Database". Donner un nom à la base de données.

Trouver la ligne suivante dans le fichier "**back/app.js**"  et remplacer **nom_base_de_donnees** par celui de votre base de données

    mongoose.connect('mongodb://localhost/nom_base_de_donnees');


5. Lancer le backend avec nodemon qui permet d'utiliser le "hotplug" pour redémarrer automatiquement le serveur lorsque le code est modifié.

Dans un nouveau terminal effectuer la commande suivante pour installer nodemon en global 

     npm install -g nodemon

Effecuter les commandes suivantes depuis la racine du projet :

       cd back
       nodemon

6. Lancer le frontend avec la commande Node "npm start" pour afficher l'interface utilisateur dans le navigateur par défaut. Le serveur est lui aussi redémarré automatiquement lorsque le code est modifié.

Effecuter les commandes suivantes dans un nouveau terminal depuis la racine du projet :

       cd front
       npm start

7. Vous pouvez à présent utiliser l'application en local : Ajouter, modifier, supprimer une image et son commentaire associé.