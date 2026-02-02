# VITREFLAM - Assistant SAV Intelligent

> **Oliver** - Chatbot IA pour le service après-vente de Vitreflam

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Status](https://img.shields.io/badge/status-production--ready-green)
![Language](https://img.shields.io/badge/languages-6-orange)

---

## Présentation

J'ai créé **Oliver**, un assistant virtuel pour le SAV de Vitreflam. Quand un client a un souci avec sa vitre (cassée, en retard, mauvaises dimensions...), il peut discuter avec Oliver directement sur le site. Oliver répond instantanément, se souvient du client, et peut même analyser les photos de verre cassé.

---

## Fonctionnalités

### Reconnaissance des clients

Quand quelqu'un arrive sur le chat, il donne son email. À partir de là, Oliver sait tout de suite si c'est un nouveau client ou quelqu'un qui est déjà venu.

Si c'est un client qui revient, Oliver a accès à tout son historique : les anciennes conversations, les problèmes qu'il a eu avant, comment ça s'était terminé.

### Détection intelligente des problèmes

Quand le client écrit son message, Oliver détecte automatiquement de quoi il s'agit :

| Type de problème | Description |
|------------------|-------------|
| Casse livraison | Vitre cassée à la réception |
| Casse montage | Vitre cassée lors de l'installation |
| Dimensions | Problème de taille de la vitre |
| Suivi commande | Question sur le statut |
| Remboursement | Demande de remboursement |
| Retard | Livraison en retard |

### Support multilingue

Oliver parle **6 langues** :

- Français
- Anglais
- Italien
- Espagnol
- Allemand
- Chinois

### Création automatique de tickets

Quand un client signale un vrai problème, Oliver crée un ticket dans la base de données automatiquement.

### Analyse d'images par IA

Oliver peut analyser les photos de verre cassé et déterminer :

- Fissures visibles
- Éclats ou morceaux manquants
- Impacts avec lignes de fracture
- Bris complet

**Trois verdicts possibles :**

| Verdict | Action |
|---------|--------|
| Casse confirmée | Lancement du remplacement si conditions remplies |
| Casse non confirmée | Explication et demande de clarification |
| Photo insuffisante | Demande d'une meilleure photo |

---

## Parcours utilisateur

```
┌─────────────────┐
│  Arrivée chat   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Choix langue    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Saisie email    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Description     │
│ du problème     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Oliver analyse  │
│ et répond       │
└─────────────────┘
```

---

## Exemple concret

### Cas : Vitre cassée à la livraison (avec assurance)

**Client :**
> "Bonjour, j'ai reçu ma commande ce matin et la vitre est cassée"

**Oliver :**
> "Bonjour Marie, je suis vraiment désolé d'apprendre que votre vitre est arrivée cassée. Pour vous aider au mieux, j'ai besoin de savoir : avez-vous souscrit l'assurance transport lors de votre commande ?"

**Client :**
> "Oui j'ai pris l'assurance"

**Oliver :**
> "Parfait. Avec l'assurance transport, vous avez **48 heures** après la livraison pour déclarer le sinistre. Pourriez-vous m'envoyer une photo du colis et du verre cassé ?"

*Le client envoie une photo*

**Oliver :**
> "J'ai bien analysé votre photo. La casse est confirmée, je vois une fissure nette sur le verre. Bonne nouvelle : comme vous avez l'assurance transport et que vous êtes dans les 48 heures, nous allons vous renvoyer une nouvelle vitre gratuitement. Elle sera expédiée sous 5 à 7 jours ouvrés."

---

## Règles d'assurance

### Assurance Transport

| Critère | Valeur |
|---------|--------|
| Délai de déclaration | 48 heures |
| Pièces requises | Photos colis + verre |
| Remplacement | Gratuit |
| Limite | 1 fois par commande |

### Assurance Montage

| Critère | Valeur |
|---------|--------|
| Délai de déclaration | 8 jours |
| Pièces requises | Photos verre cassé |
| Remplacement | Gratuit |
| Limite | 1 fois par commande |

### Sans assurance

- **Casse transport** : Réclamation auprès de Colissimo
- **Casse montage** : Remise de 30% sur prochaine commande

---

## Gestion des clients frustrés

Oliver détecte automatiquement la frustration (majuscules, mots forts, ponctuation excessive) et adapte sa réponse avec plus d'empathie. Les dossiers critiques sont escaladés vers un responsable.

---

## Mémoire client

Tout est lié à l'email du client. Quand il revient, Oliver charge :

- Son profil (nouveau, régulier, VIP)
- Ses anciennes conversations
- Les problèmes précédents
- Les remises en attente

---

## Architecture technique

### Base de données (Supabase)

```
├── clients
│   ├── email
│   ├── nom
│   ├── nb_commandes
│   ├── nb_problemes
│   └── derniere_visite
│
├── conversations
│   ├── client_id
│   ├── type_probleme
│   ├── statut
│   └── resume
│
├── messages
│   ├── conversation_id
│   ├── auteur
│   ├── contenu
│   └── timestamp
│
└── incidents
    ├── type
    ├── description
    ├── photos
    ├── analyse
    └── statut
```

### Nettoyage automatique

Les conversations inactives depuis plus de 30 minutes sont automatiquement fermées avec génération d'un résumé.

---

## Interface

Design **neobrutalist** moderne :

- Bordures noires visibles
- Rouge Vitreflam
- Jaune pour les accents
- Ombres qui donnent du relief
- Responsive (mobile-friendly)

---

## Statut du projet

### Ce qui fonctionne

- [x] Chat en temps réel
- [x] Réponses multilingues
- [x] Analyse de photos par IA
- [x] Mémoire client
- [x] Création automatique de tickets
- [x] Détection de frustration
- [x] Fermeture automatique des conversations

### Déploiement

Le chatbot est prêt à être mis en ligne sur **Render**. Il suffit de connecter les clés API.

---

## Prochaines étapes

Je suis en train de contacter Colissimo pour voir ce qu'il est possible de mettre en place :
- Récupération automatique des infos de suivi de colis
- Facilitation des réclamations pour les clients sans assurance

---

## Technologies utilisées

- **Frontend** : HTML/CSS/JavaScript
- **Backend** : Node.js
- **Base de données** : Supabase
- **IA** : Claude (Anthropic)
- **Hébergement** : Render

---

## Contact

Pour toute question : contactglassgroup@gmail.com

---

*Dernière mise à jour : 2 février 2026*
