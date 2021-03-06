# Activity Tracker

Un mix de [Google Keep](https://play.google.com/store/apps/details?id=com.google.android.keep) et [TexTory](https://play.google.com/store/apps/details?id=io.android.textory)

## TODO

- take pictures
- Get data from :
  - Google calendar
  - SMS
  - Phone Calls

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
Memo {
  id: "123",
  date: 1448531496470,      // date of the memo
  location: {
    lat: 0.5,
    lon: 0.6
  },
  title: "07/12 matin",
  text: "",
  color: "",
  tags: [""],
  pictures: [{
    date: 1448531496470,
    location: {
      lat: 0.5,
      lon: 0.6
    },
    path: "memos/2015_12_07-12_10_33.jpg"
  }],
  reminder: {},
  custom: {
    meal: {
      alone: false,
      screen: false,
      hangerBefore: 6,
      satietyAfter: 11,
      fulfilmentAfter: 8
    }
  },
  entities: [{
    id: "123",
    name: "Loïc Knuchel",
    ref: "@Loïc Knuchel"
  }],
  favorited: false,
  archived: false,
  created: 1448531496470,   // date were the memo was created
  updated: 1448531496470    // date were the memo was last edited
}
```

```
Entity {
  id: "123",
  name: "Loïc Knuchel",
  type: "person", // can also be : company, place
  location: {
    lat: 0.5,
    lon: 0.6
  },
  phones: [{
    type: "mobile", // can also be : work, home
    value: "0683472182",
    comment: ""
  }],
  emails: [{
    type: "perso", // can also be : work
    value: "loicknuchel@gmail.com",
    comment: ""
  }],
  adresses: [{
    type: "home", // can also be : work
    value: "119 rue des pyrénées 75020 Paris",
    comment: "code 1234B"
  }],
  links: [{
    type: "twitter", // can also be blog, site, facebook...
    value: "https://twitter.com/loicknuchel",
    comment: ""
  }],
  pictures: [{
    path: ""
  }],
  comment: "",
  tags: [""],
  archived: false,
  created: 1448531496470,   // date were the memo was created
  updated: 1448531496470    // date were the memo was last edited
}
```
