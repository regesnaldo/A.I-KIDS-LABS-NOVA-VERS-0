from flask import Flask, jsonify
from sqlalchemy import text
import os
from dotenv import load_dotenv
from extensions import db, jwt, cors
from auth_routes import auth_bp
from routes.content import content_bp
from routes.chat import chat_bp
from routes.recommendations import recommendations_bp

# Carrega variáveis de ambiente do arquivo .env
load_dotenv()

def create_app():
    app = Flask(__name__)

    # Configuração do banco de dados Neon (Postgres)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('NEON_DB_URI', 'sqlite:///:memory:')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Configuração JWT
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET', 'chave-temporaria-de-teste')
    app.config['JWT_TOKEN_LOCATION'] = ['headers']
    # Força conversão segura para int, default 3600
    try:
        expires = int(os.environ.get('JWT_ACCESS_TOKEN_EXPIRES', 3600))
    except ValueError:
        expires = 3600
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = expires

    # Inicializa extensões
    db.init_app(app)
    jwt.init_app(app)
    cors.init_app(app, resources={r"/api/*": {"origins": ["https://a-i-kids-labs-nova-vers-0.vercel.app", "https://a-i-kids-labs-nova-vers-o.vercel.app", "http://localhost:3000", "http://localhost:5173"]}})

    # Registra Blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(content_bp, url_prefix='/api')
    app.register_blueprint(chat_bp, url_prefix='/api/chat')
    app.register_blueprint(recommendations_bp, url_prefix='/api/recommendations')

    # Exemplo de rota protegida: teste a conexão ao DB via API
    @app.route('/health', methods=['GET'])
    def health_root():
        return jsonify({"status": "ok"}), 200

    @app.route('/api/health', methods=['GET'])
    def health_check():
        try:
            # Teste de conexão ao Neon DB
            result = db.session.execute(text("SELECT 1"))
            return jsonify({"status": "conectado", "mensagem": "Portal Neon agora alavanca o DB com poder total"}), 200
        except Exception as e:
            return jsonify({"erro": str(e)}), 500

    return app

if __name__ == '__main__':
    app = create_app()
    # Garantia de Tabelas: Cria as tabelas se não existirem ao iniciar
    with app.app_context():
        db.create_all()
    app.run(debug=True)
