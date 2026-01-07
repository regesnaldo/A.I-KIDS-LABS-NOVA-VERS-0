import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    // Efeito para mudar cor da navbar ao rolar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload();
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-logo">
                A.I. KIDS LABS
            </div>
            <ul className="navbar-links">
                <li><a href="#">Início</a></li>
                <li><a href="#">Séries</a></li>
                <li><a href="#">Filmes</a></li>
                <li><a href="#">Minha Lista</a></li>
            </ul>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '20px', alignItems: 'center' }}>
                <span style={{ fontSize: '1.2rem' }}>🔍</span>
                <span style={{ fontSize: '1.2rem' }}>🔔</span>
                <div 
                    onClick={handleLogout}
                    style={{ 
                        width: '32px', 
                        height: '32px', 
                        background: '#e50914', 
                        borderRadius: '4px', 
                        cursor: 'pointer',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        fontWeight: 'bold'
                    }}
                >
                    :)
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
