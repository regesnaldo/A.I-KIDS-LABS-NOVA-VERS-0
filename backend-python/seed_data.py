from app import create_app
from extensions import db
from models import Season, Missao

app = create_app()

def seed():
    with app.app_context():
        # Garante que as tabelas existam
        db.create_all()

        print("🧹 Limpando dados antigos...")
        try:
            Missao.query.delete()
            Season.query.delete()
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            print(f"Erro ao limpar dados: {e}")
            return

        print("🌱 Criando temporadas e missões...")

        for t in range(1, 51):
            season = Season(
                numero=t,
                titulo=f"Temporada {t}",
                descricao=f"Aprendizados de IA – Temporada {t}",
                imagem=f"https://cdn.kidslabs.com/covers/t{t}.jpg"
            )
            db.session.add(season)
            db.session.flush()  # garante season.id

            for m in range(1, 11):
                missao = Missao(
                    season_id=season.id,
                    numero=m,
                    titulo=f"Missão {m}",
                    video_url=f"https://videos.kidslabs.com/t{t}m{m}",
                    conteudo_apoio=f"Conteúdo educativo da missão {m}"
                )
                db.session.add(missao)

        try:
            db.session.commit()
            print("✅ Seed concluído: 50 temporadas e 500 missões.")
        except Exception as e:
            db.session.rollback()
            print(f"Erro ao salvar dados: {e}")

if __name__ == "__main__":
    seed()
