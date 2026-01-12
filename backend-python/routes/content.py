from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models import Season, Missao

content_bp = Blueprint('content', __name__)

@content_bp.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    return jsonify({"ok": True}), 200

@content_bp.route('/home', methods=['GET'])
@jwt_required(optional=True)
def get_home_content():
    try:
        current_user_id = get_jwt_identity()
    except Exception:
        current_user_id = None
        
    seasons = Season.query.order_by(Season.numero).all()
    rows = []
    
    for s in seasons:
        missoes = Missao.query.filter_by(season_id=s.id).order_by(Missao.numero).all()
        cards = []
        for m in missoes:
            # Regra de Acesso:
            # Sem login -> locked = True (Conteúdo bloqueado)
            # Logado -> locked = False (Conteúdo liberado, assumindo plano ativo)
            if current_user_id:
                locked = False
            else:
                locked = True

            cards.append({
                "id": m.id,
                "numero": m.numero,
                "titulo": m.titulo,
                "thumb": f"https://cdn.kidslabs.com/thumbs/t{s.numero}m{m.numero}.jpg",
                "preview": f"https://cdn.kidslabs.com/previews/t{s.numero}m{m.numero}.mp4",
                "locked": locked
            })
            
        rows.append({
            "id": s.id,
            "numero": s.numero,
            "titulo": s.titulo,
            "descricao": s.descricao,
            "imagem": s.imagem,
            "cards": cards
        })
        
    return jsonify({"rows": rows}), 200

@content_bp.route('/temporadas', methods=['GET'])
@content_bp.route('/seasons', methods=['GET'])
@jwt_required(optional=True)
def get_seasons():
    # Tente fetch do DB Neon; fallback mock se vazio
    seasons = Season.query.order_by(Season.numero).all()
    
    if not seasons:
        # Fallback mock data
        seasons_data = [{
            'id': i, 
            'titulo': f'Temporada {i}', 
            'descricao': 'Missões lúdicas de IA para kids', 
            'image': 'https://example.com/img.png', # Frontend compatibility
            'imagem': 'https://example.com/img.png'
        } for i in range(1, 51)]
        return jsonify(seasons_data), 200

    # Serialize DB objects
    return jsonify([{
        "id": s.id,
        "numero": s.numero,
        "title": s.titulo,
        "titulo": s.titulo,
        "description": s.descricao,
        "descricao": s.descricao,
        "image": s.imagem or f"https://cdn.kidslabs.com/covers/t{s.numero}.jpg",
        "imagem": s.imagem or f"https://cdn.kidslabs.com/covers/t{s.numero}.jpg"
    } for s in seasons]), 200

@content_bp.route('/temporadas', methods=['POST'])
@content_bp.route('/seasons', methods=['POST'])
@jwt_required()
def create_season():
    data = request.get_json()
    
    # Validação simples
    if not data.get('numero') or not data.get('titulo'):
        return jsonify({"erro": "Número e Título são obrigatórios"}), 400

    new_season = Season(
        numero=data.get('numero'),
        titulo=data.get('titulo'),
        descricao=data.get('descricao'),
        imagem=data.get('imagem')
    )
    
    try:
        db.session.add(new_season)
        db.session.commit()
        return jsonify({"mensagem": "Temporada criada com sucesso!", "id": new_season.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"erro": "Erro ao criar temporada (verifique se o número já existe)"}), 400

@content_bp.route('/temporadas/<int:id>/missoes', methods=['GET'])
@content_bp.route('/seasons/<int:id>/missoes', methods=['GET'])
@jwt_required(optional=True)
def get_missoes_por_temporada(id):
    try:
        current_user_id = get_jwt_identity()
    except Exception:
        current_user_id = None

    season = Season.query.get(id)
    
    if not season:
        return jsonify({"erro": "Temporada não encontrada"}), 404
        
    missoes = Missao.query.filter_by(season_id=id).order_by(Missao.numero).all()
    
    return jsonify([{
        "id": m.id,
        "numero": m.numero,
        "titulo": m.titulo,
        "video_url": m.video_url,
        "conteudo_apoio": m.conteudo_apoio,
        "locked": False if current_user_id else True
    } for m in missoes]), 200
