import React, { useState, useEffect } from 'react';

const ConfirmInvitation = () => {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [guestData, setGuestData] = useState(null);
    const [error, setError] = useState(null);
    const [guestUuid, setGuestUuid] = useState(null);
    const [guestId, setGuestId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const path = window.location.pathname;
        console.log('Current path:', path);
        
        let uuid = null;
        
        if (path.includes('/confirm-invitation/')) {
            uuid = path.split('/confirm-invitation/')[1];
            if (uuid) {
                uuid = uuid.split('?')[0].split('#')[0];
            }
        }
        
        if (!uuid) {
            const match = path.match(/\/confirm-invitation\/([a-f0-9-]+)/i);
            uuid = match ? match[1] : null;
        }
        
        console.log('Extracted UUID:', uuid);
        
        if (uuid && uuid !== 'undefined' && uuid.length > 10) {
            setGuestUuid(uuid);
            fetchGuestData(uuid);
        } else {
            setError(`UUID de invitación no válido. Path: ${path}, UUID: ${uuid}`);
        }
    }, []);

    const fetchGuestData = async (uuid) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3000/api/guest/uuid/${uuid}`);
            
            if (!response.ok) {
                throw new Error('No se pudo cargar la información del invitado');
            }
            
            const result = await response.json();
            
            if (!result.success) {
                throw new Error(result.error || 'Error al cargar datos');
            }
            
            setGuestData(result.data);
            setGuestId(result.data.id_guest);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleConfirm = async (willAttend) => {
        if (!guestId) {
            setError('No se pudo identificar la invitación');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch(`https://pn0tsccd-3000.usw3.devtunnels.ms/api/confirm-invitation/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    response_status: willAttend ? "confirmed" : "rejected",
                    comments: willAttend ? "Confirmo mi asistencia" : "No podré asistir",
                    guest_id_guest: guestId
                }),
            });

            if (!response.ok) {
                throw new Error('Error al procesar la respuesta');
            }

            const result = await response.json();
            console.log('API Response:', result); // Para debugging
            
            // AQUÍ ESTÁ EL CAMBIO: Verificar error: false en lugar de success: true
            if (result.error !== false && result.error) {
                throw new Error(result.message || result.error || 'Error al confirmar asistencia');
            }
            
            setStatus(willAttend ? 'confirmed' : 'rejected');
            
        } catch (err) {
            console.error('Error in handleConfirm:', err);
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (error && !guestData) {
        return (
            <div style={{
                maxWidth: 500,
                margin: '2rem auto',
                padding: '2rem',
                textAlign: 'center',
                backgroundColor: '#ffebee',
                border: '1px solid #e57373',
                borderRadius: 12,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
                <div style={{ fontSize: '48px', marginBottom: '1rem' }}></div>
                <h2 style={{ color: '#d32f2f', margin: 0, marginBottom: '1rem' }}>Error</h2>
                <p style={{ color: '#d32f2f', lineHeight: '1.5' }}>{error}</p>
            </div>
        );
    }

    return (
        <div style={{
            maxWidth: 600,
            margin: '2rem auto',
            padding: '2rem',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            backgroundColor: '#fff',
            borderRadius: 16,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)'
        }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                
                <h1 style={{ 
                    color: '#333', 
                    margin: 0, 
                    fontSize: '24px',
                    fontWeight: '600',
                    background: 'linear-gradient(135deg, #6a1b9a 0%, #9c27b0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Confirmación de Invitación
                </h1>
            </div>

            {loading && !status && (
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                    
                    <p style={{ color: '#666', fontSize: '16px' }}>Cargando información...</p>
                    <style>
                        {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
                    </style>
                </div>
            )}

            {guestData && !status && !loading && (
                <div>
                    <div style={{ 
                        background: 'linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%)', 
                        padding: '2rem', 
                        borderRadius: 12, 
                        marginBottom: '2rem',
                        borderLeft: '5px solid #6a1b9a',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                    }}>
                        <h3 style={{ 
                            color: '#6a1b9a', 
                            marginTop: 0, 
                            fontSize: '22px', 
                            fontWeight: '600',
                            marginBottom: '1rem'
                        }}>
                            ¡Hola {guestData.name}!
                        </h3>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button
                                onClick={() => handleConfirm(true)}
                                disabled={isSubmitting}
                                style={{
                                    padding: '14px 28px',
                                    background: isSubmitting ? '#cccccc' : 'linear-gradient(135deg, #6b2da5ff 0%, #6b2da5ff 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: 8,
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                    opacity: isSubmitting ? 0.6 : 1,
                                    transition: 'all 0.3s ease',
                                    boxShadow: isSubmitting ? 'none' : '0 4px 15px rgba(76, 175, 80, 0.3)',
                                    transform: isSubmitting ? 'none' : 'translateY(0)',
                                    minWidth: '160px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px'
                                }}
                                onMouseOver={(e) => {
                                    if (!isSubmitting) {
                                        e.target.style.transform = 'translateY(-2px)';
                                        e.target.style.boxShadow = '0 6px 20px rgba(76, 175, 80, 0.4)';
                                    }
                                }}
                                onMouseOut={(e) => {
                                    if (!isSubmitting) {
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.boxShadow = '0 4px 15px rgba(76, 175, 80, 0.3)';
                                    }
                                }}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div style={{
                                            width: '16px',
                                            height: '16px',
                                            border: '2px solid #ffffff',
                                            borderTop: '2px solid transparent',
                                            borderRadius: '50%'
                                        }}></div>
                                        Procesando...
                                    </>
                                ) : (
                                    <>
                                        <span style={{ fontSize: '18px' }}>✓</span>
                                        Sí, asistiré
                                    </>
                                )}
                            </button>
                           
                        </div>
                       
                    </div>
                </div>
            )}

            {status && (
                <div style={{
                    textAlign: 'center',
                    padding: '3rem 2rem',
                    background: status === 'confirmed' 
                        ? 'linear-gradient(135deg, #e8f5e8 0%, #f1f8f1 100%)' 
                        : 'linear-gradient(135deg, #ffebee 0%, #fef1f2 100%)',
                    borderRadius: 12,
                    border: `3px solid ${status === 'confirmed' ? '#4caf50' : '#f44336'}`,
                    boxShadow: `0 8px 32px ${status === 'confirmed' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)'}`
                }}>
                    <div style={{ 
                        fontSize: '72px', 
                        marginBottom: '1.5rem',
                        animation: 'bounce 0.6s ease-out'
                    }}>
                        {status === 'confirmed' ? '🎉' : '😔'}
                    </div>
                    <h2 style={{ 
                        color: status === 'confirmed' ? '#2e7d32' : '#c62828', 
                        margin: 0, 
                        fontSize: '28px',
                        fontWeight: '700',
                        marginBottom: '1rem'
                    }}>
                        {status === 'confirmed' ? '¡Asistencia Confirmada!' : 'Respuesta Registrada'}
                    </h2>
                    <p style={{ 
                        color: '#555', 
                        fontSize: '18px',
                        lineHeight: '1.6',
                        maxWidth: '400px',
                        margin: '0 auto'
                    }}>
                        {status === 'confirmed' ? 
                            '¡Excelente! Hemos registrado tu confirmación. Te esperamos con mucha emoción en nuestro evento especial.' :
                            'Gracias por informarnos. Aunque lamentamos que no puedas acompañarnos, valoramos que nos hayas avisado.'}
                    </p>
                    <div style={{
                        marginTop: '2rem',
                        padding: '1rem',
                        backgroundColor: 'rgba(255,255,255,0.7)',
                        borderRadius: 8,
                        fontSize: '14px',
                        color: '#666'
                    }}>
                        {status === 'confirmed' ? 
                            ' ¡Nos alegra mucho que puedas venir!' :
                            '¡Esperamos verte en una próxima ocasión!'}
                    </div>
                    <style>
                        {`
                            @keyframes bounce {
                                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                                40% { transform: translateY(-10px); }
                                60% { transform: translateY(-5px); }
                            }
                        `}
                    </style>
                </div>
            )}

            {error && guestData && (
                <div style={{
                    backgroundColor: '#ffebee',
                    color: '#d32f2f',
                    padding: '1.5rem',
                    borderRadius: 8,
                    marginTop: '1rem',
                    textAlign: 'center',
                    border: '1px solid #e57373',
                    boxShadow: '0 2px 10px rgba(244, 67, 54, 0.1)'
                }}>
                    <div style={{ fontSize: '24px', marginBottom: '0.5rem' }}></div>
                    <strong>Error:</strong> {error}
                </div>
            )}
        </div>
    );
};

export default ConfirmInvitation;