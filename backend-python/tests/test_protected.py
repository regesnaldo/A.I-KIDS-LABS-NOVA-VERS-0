import json
from models import Season, Missao
from extensions import db

def setup_content(app):
    with app.app_context():
        s1 = Season(numero=1, titulo="Temp 1", descricao="Desc 1", imagem="img1.jpg")
        db.session.add(s1)
        db.session.flush()
        
        m1 = Missao(season_id=s1.id, numero=1, titulo="Missao 1", video_url="url1", conteudo_apoio="apoio1")
        m2 = Missao(season_id=s1.id, numero=2, titulo="Missao 2", video_url="url2", conteudo_apoio="apoio2")
        db.session.add(m1)
        db.session.add(m2)
        db.session.commit()

def test_home_locked_status_anonymous(client, app):
    setup_content(app)
    
    response = client.get('/api/home')
    assert response.status_code == 200
    data = json.loads(response.data)
    
    # Verifica se cards estão bloqueados para anônimo
    cards = data['rows'][0]['cards']
    assert cards[0]['locked'] == True
    assert cards[1]['locked'] == True

def test_home_locked_status_authenticated(client, app):
    setup_content(app)
    
    # Registro e Login
    client.post('/api/auth/register', json={'email': 'user@test.com', 'password': '123'})
    login_res = client.post('/api/auth/login', json={'email': 'user@test.com', 'password': '123'})
    token = login_res.json['access_token']
    
    # Acesso autenticado
    response = client.get('/api/home', headers={'Authorization': f'Bearer {token}'})
    assert response.status_code == 200
    data = json.loads(response.data)
    
    # Verifica se cards estão desbloqueados para usuário logado
    cards = data['rows'][0]['cards']
    assert cards[0]['locked'] == False
    assert cards[1]['locked'] == False

def test_missoes_locked_status_anonymous(client, app):
    setup_content(app)
    # Recupera ID da temporada criada
    with app.app_context():
        t_id = Season.query.first().id

    response = client.get(f'/api/temporadas/{t_id}/missoes')
    assert response.status_code == 200
    data = json.loads(response.data)
    
    assert data[0]['locked'] == True
    assert data[1]['locked'] == True

def test_missoes_locked_status_authenticated(client, app):
    setup_content(app)
    # Recupera ID da temporada criada
    with app.app_context():
        t_id = Season.query.first().id
        
    # Registro e Login
    client.post('/api/auth/register', json={'email': 'user2@test.com', 'password': '123'})
    login_res = client.post('/api/auth/login', json={'email': 'user2@test.com', 'password': '123'})
    token = login_res.json['access_token']
    
    response = client.get(f'/api/temporadas/{t_id}/missoes', headers={'Authorization': f'Bearer {token}'})
    assert response.status_code == 200
    data = json.loads(response.data)
    
    assert data[0]['locked'] == False
    assert data[1]['locked'] == False

def test_protected_route_access(client, app):
    # 1. Sem token
    res = client.get("/api/protected")
    assert res.status_code == 401
    
    # 2. Com token
    # Cria usuário
    client.post("/api/auth/register", json={
        "email": "protected@kidslabs.com",
        "password": "123"
    })
    # Login
    login_res = client.post("/api/auth/login", json={
        "email": "protected@kidslabs.com",
        "password": "123"
    })
    token = login_res.json["access_token"]
    
    # Acesso com token
    res_auth = client.get("/api/protected", headers={
        "Authorization": f"Bearer {token}"
    })
    assert res_auth.status_code == 200
    assert res_auth.json["ok"] is True

def test_protected_without_token(client):
    res = client.get("/api/protected")
    assert res.status_code == 401

def test_protected_with_token(client):
    client.post("/api/auth/register", json={
        "email": "token@kidslabs.com",
        "password": "123456"
    })

    login = client.post("/api/auth/login", json={
        "email": "token@kidslabs.com",
        "password": "123456"
    })

    token = login.json["access_token"]

    res = client.get(
        "/api/protected",
        headers={"Authorization": f"Bearer {token}"}
    )

    assert res.status_code == 200
