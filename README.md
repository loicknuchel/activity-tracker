# Activity Tracker

## TODO

- textarea autogrow
- take pictures

## Getting started

- installer [Node.js](https://nodejs.org/) et [Git](https://git-scm.com/) (si pas déjà fait)
- ajouter git dans le PATH (`C:\Program Files\Git\bin` par défaut) (si pas déjà fait)
- `npm install -g cordova ionic gulp bower` : installer cordova ionic gulp & bower (si pas déjà fait)
- aller dans le répertoire du projet
- `npm install` : installer les dépendences de développement
- `bower install` : installer les dépendences de l'application
- `ionic serve` : lancer l'application dans le navigateur
- `ionic platform add android` : ajouter la plateforme android
- `ionic resources` : générer l'icone et l'écran de démarrage de l'application (à partir de `resources/icon.png` et `resources/splash.png`)
- `ionic run android` : compiler et lancer l'application sur un téléphone/émulateur

## Conventions

Style de code basé sur le [Angular Style Guide](https://github.com/johnpapa/angular-styleguide) de John Papa.

Conventions de nommage pour les services :

- Name          : class / enum
- NameConfig    : service stockant une configuration (statique ou dynamique)
- NameUtils     : service comportant uniquement des fonctions utilitaires sans effet de bord
- NameData      : service stockant dans données (pour mutualiser entre plusieurs contrôleurs par exemple)
- NameStorage   : service permettant de requêter de la donnée vers le stockage local
- NameBackend   : service permettant de requêter de la donnée vers son backend
- NameCache     : service de cache
- NameSrv       : service 'haut-niveau' permettant d'agréger intelligemment plusieurs autres services. Ex: UserSrv peut dépendre de UserStorage, UserBackend, UserCache et UserUtils.
- NameUI        : service pour manipuler des éléments d'interface
- NamePlugin    : service permettant de wrapper un plugin cordova
- _Name*        : service 'privé', ne doit pas être utilisé dans un autre fichier que là où il est déclaré

## App models

```
Activity {
  id: "123",
  date: 1448531496470,      // date of the activity
  location: {
    lat: 0.5,
    lon: 0.6
  },
  name: "07/12 matin",
  hungerBeforeMeal: 6       // 1-10
  meal: "bla bla bla",
  alone: false,
  inFrontOfScreen: false,
  satietyAfterMeal: 11,     // 10-20
  fulfilmentAfterMeal: 7,   // 1-10
  pictures: [{
    path: "meals/2015_12_07-12_10_33.jpg",
    fullPath: "file:///data/data/com.example.myapp/files/meals/2015_12_07-12_10_33.jpg"
  }],
  created: 1448531496470,   // date were the activity was created
  updated: 1448531496470    // date were the activity was last edited
}
```
