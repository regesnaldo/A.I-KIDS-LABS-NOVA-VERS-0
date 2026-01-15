const db = require('../config/db');
const History = require('./History');
const Video = require('./Video'); 

// Modelo de Recomendação (Mock / IA Placeholder)
// Estrutura pronta para receber lógica real de ML/IA futuramente
class Recommendation {
    // Inicializa tabela de recomendações (cache de recomendações)
    static async init() {
        const sql = `
            CREATE TABLE IF NOT EXISTS recommendations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                video_id INTEGER NOT NULL,
                score REAL, -- Pontuação de relevância (0.0 a 1.0)
                reason TEXT, -- Ex: "Porque você assistiu X"
                generated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (video_id) REFERENCES videos(id)
            )
        `;
        await db.run(sql);
    }

    // Gera recomendações baseadas no histórico (Lógica Mock/Heurística Simples)
    static async generateForUser(userId) {
        // 1. Busca histórico do usuário
        const history = await History.findByUser(userId);
        
        // 2. Identifica categorias mais assistidas
        const categories = {};
        history.forEach(item => {
            categories[item.category] = (categories[item.category] || 0) + 1;
        });

        // Encontra a categoria favorita
        let favoriteCategory = null;
        let maxCount = 0;
        for (const [cat, count] of Object.entries(categories)) {
            if (count > maxCount) {
                maxCount = count;
                favoriteCategory = cat;
            }
        }

        // 3. Busca vídeos dessa categoria que o usuário AINDA NÃO assistiu
        const allVideos = await Video.findAll();
        const watchedIds = new Set(history.map(h => h.video_id));

        const recommendations = allVideos
            .filter(v => !watchedIds.has(v.id)) // Remove assistidos
            .map(v => ({
                ...v,
                // Score alto se for da categoria favorita, baixo caso contrário
                score: v.category === favoriteCategory ? 0.9 : 0.5,
                reason: v.category === favoriteCategory ? 'Baseado nos seus interesses' : 'Popular na plataforma'
            }))
            .sort((a, b) => b.score - a.score) // Ordena por relevância
            .slice(0, 5); // Pega top 5

        return recommendations;
    }
}

module.exports = Recommendation;
