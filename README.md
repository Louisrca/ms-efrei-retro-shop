> Construire une boutique en ligne retro gaming en Micro-Frontends.
> Une page. 4 zones. 4 developpeurs ( je vous laisse gérer si vous êtes 3 ou 5 dans > l'équipe). Chacun possède un MFE.

# Architecture :

shell (port 3000) -- l'orchestrateur, charge les 3 MFEs
mfe-product (port 3001) -- grille de produits + bouton "Ajouter"
mfe-cart (port 3002) -- panier lateral (liste, total, vider)
mfe-reco (port 3003) -- recommandations "Les joueurs achetent aussi"

Equipe de 3 : ignorer mfe-reco.

# Répartition :

| shell (Etudiant A)      | mfe-product (Etudiant B) | mfe-cart (Etudiant C)     |
| :---        |    :----:   |          ---: |
| configurer les remotes    |configurer webpack MF| configurer webpack MF
|  import lazy| ecrire le emit au clic "Ajouter"       | ecouter les ajouts   |
| Suspense    | //        | emettre les mises a jour    | 
| badge panier|      //   |  //


~~Etudiant D : mfe-reco -- configurer webpack MF, ecouter le panier, adapter les recos~~

# Phase 1 -- Negociation (10 min)

Avant de toucher au code, mettez-vous d'accord sur :

1. Le nom exact de chaque evenement
2. Le payload exact (quelles proprietes, quels types)
3. Qui emet quoi, qui ecoute quoi

Ecrivez le contrat. Chaque membre le note.
Si le contrat diverge au moment de l'assemblage, rien ne se passe. Pas d'erreur. Juste le silence.

# Phase 2 -- Dev independant (30 min)

Chacun travaille seul sur son MFE. Pas de communication entre les membres.
Votre seule documentation : shared/eventBus.js (lire le code source).

Ce qui est deja fait :

- Tout le JSX (structure HTML + CSS) de chaque composant
- Le layout du Shell (header + grille + zone reco)
- shared/eventBus.js et shared/products.js

Ce que vous devez ecrire :

- Votre webpack.config.js (Module Federation from scratch)
- Les emit() et on() dans votre composant
- Le cleanup dans les useEffect
- Les imports lazy dans le Shell (etudiant A)

Documentation webpack : https://webpack.js.org/plugins/module-federation-plugin/

# Phase 3 -- Assemblage (10 min)

L'etudiant A (Shell) lance les 4 terminaux :
T1 : cd mfe-product && npm install && npm start
T2 : cd mfe-cart && npm install && npm start
T3 : cd mfe-reco && npm install && npm start
T4 : cd shell && npm install && npm start

Ouvrir http://localhost:3000 et observer.

# Phase 4 -- Debug et retro (10 min)

Si ca marche : demo a la classe.
Si ca casse : F12, identifier le probleme.

- Rien ne se passe au clic ? Verifier le nom de l'evenement des deux cotes.
- "Loading..." infini ? Verifier le port dans remotes.
- "Invalid hook call" ? Verifier singleton: true dans shared.
- "Module does not exist" ? Verifier la cle dans exposes.

# Validation :

- [x] Les 4 services demarrent sans erreur

- [x] Cliquer "Ajouter" dans le catalogue ajoute l'article au panier

- [x] Le badge du header affiche le bon nombre

- [x] Les recommandations changent selon le contenu du panier

- [x] Vider le panier remet tout a zero*

- [x] Tuer mfe-reco (Ctrl+C) ne casse pas le reste de la page
