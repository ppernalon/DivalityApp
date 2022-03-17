# Installation

Si émulation android : penser à accepter la licence d'utilisation.

Suivre les instructions de la documentation officielle pour installer l'envrionnement
https://reactnative.dev/docs/environment-setup

Pour obtenir le jdk8, passer par ce lien : https://adoptium.net/?variant=openjdk8

# Bonnes pratiques de code

* Ne pas dépasser un composant par fichier
* Éviter d'utiliser des composants class et favoriser les composants function

# Build

$ npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
$ cd android
$ ./gradlew assembleDebug

Le .apk est dans /android/app/build/outputs/apk/debug/app-debug.apk


