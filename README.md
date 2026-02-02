# Jefaisquoi

Une webapp intelligente pour trouver des activités adaptées à votre contexte.

## Description

Jefaisquoi utilise l'IA pour vous proposer des activités personnalisées selon :
- Votre type de sortie (solo, entre amis, en famille)
- Votre localisation
- Votre planning (week-end, semaine, date précise)
- Votre budget
- Vos préférences d'activités

## Stack Technique

- **Frontend**: Next.js 15, TypeScript, TailwindCSS, shadcn/ui
- **Backend**: n8n workflow avec AI Agent (OpenAI)
- **Database**: Supabase
- **Deployment**: Vercel

## Installation

```bash
# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.local.example .env.local
# Remplir les valeurs dans .env.local

# Lancer en développement
npm run dev
```

## Variables d'environnement

```env
N8N_WEBHOOK_URL=https://your-n8n-instance.cloud/webhook/jefaisquoi-search
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Workflow n8n

Le workflow n8n (ID: JKoxVimgzADWCaiZ) :
1. Reçoit les paramètres de recherche via webhook
2. Utilise un AI Agent avec OpenAI pour rechercher des activités
3. Formate le JSON de réponse
4. Retourne les résultats au frontend

**Important**: Activer le workflow dans l'interface n8n !

## Développement

```bash
npm run dev     # Démarrage du serveur de dev
npm run build   # Build pour production
npm run start   # Démarrage en production
npm run lint    # Linter
```

## Déploiement

Le projet est configuré pour un déploiement automatique sur Vercel :
- Push sur `main` = déploiement automatique
- Variables d'environnement à configurer dans Vercel

## License

MIT
