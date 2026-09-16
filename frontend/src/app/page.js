'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main style={{ backgroundColor: '#0A0F1E', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* Navbar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '16px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(10,15,30,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : 'none',
        transition: 'all 0.4s ease'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #C9A84C, #E8C96D)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px', fontWeight: 'bold', color: '#0A0F1E'
          }}>N</div>
          <span style={{ fontSize: '22px', fontWeight: '800', color: 'white', letterSpacing: '-0.5px' }}>Nexara</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {['Products', 'Factories', 'Sellers'].map(item => (
            <a key={item} href={`/${item.toLowerCase()}`} style={{
              color: '#9CA3AF', fontSize: '14px', textDecoration: 'none',
              transition: 'color 0.2s', fontWeight: '500'
            }}
              onMouseEnter={e => e.target.style.color = '#C9A84C'}
              onMouseLeave={e => e.target.style.color = '#9CA3AF'}
            >{item}</a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a href="/login" style={{ color: '#9CA3AF', fontSize: '14px', textDecoration: 'none', padding: '8px 16px', fontWeight: '500' }}>Login</a>
          <a href="/register" style={{
            background: 'linear-gradient(135deg, #C9A84C, #E8C96D)',
            color: '#0A0F1E', fontWeight: '700', fontSize: '14px',
            padding: '10px 22px', borderRadius: '10px', textDecoration: 'none',
            transition: 'opacity 0.2s, transform 0.2s'
          }}
            onMouseEnter={e => { e.target.style.opacity = '0.9'; e.target.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }}
          >Get Started</a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', textAlign: 'center',
        padding: '120px 24px 60px', position: 'relative', overflow: 'hidden'
      }}>
        {/* Glow */}
        <div style={{
          position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          maxWidth: '800px', width: '100%', position: 'relative', zIndex: 1,
          opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', borderRadius: '100px', marginBottom: '32px',
            border: '1px solid rgba(201,168,76,0.3)',
            background: 'rgba(201,168,76,0.08)', fontSize: '13px'
          }}>
            <span style={{ color: '#C9A84C' }}>✦</span>
            <span style={{ color: '#D1A84C' }}>The Future of Global Trade</span>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: '900',
            color: 'white', lineHeight: '1.1', marginBottom: '24px',
            letterSpacing: '-2px'
          }}>
            Buy. Sell.{' '}
            <span style={{
              background: 'linear-gradient(135deg, #C9A84C, #E8C96D, #C9A84C)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Source.</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(16px, 2vw, 20px)', color: '#6B7280',
            marginBottom: '40px', lineHeight: '1.7', maxWidth: '560px', margin: '0 auto 40px'
          }}>
            Nexara connects shoppers, sellers, and verified factories in one premium platform. No unnecessary middlemen. Direct connections.
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/products" style={{
              background: 'linear-gradient(135deg, #C9A84C, #E8C96D)',
              color: '#0A0F1E', fontWeight: '700', fontSize: '16px',
              padding: '16px 36px', borderRadius: '12px', textDecoration: 'none',
              transition: 'transform 0.2s, opacity 0.2s'
            }}
              onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
            >Explore Products</a>
            <a href="/factories" style={{
              border: '1px solid rgba(201,168,76,0.4)', color: '#C9A84C',
              fontSize: '16px', padding: '16px 36px', borderRadius: '12px',
              textDecoration: 'none', transition: 'all 0.2s',
              background: 'rgba(201,168,76,0.05)'
            }}
              onMouseEnter={e => { e.target.style.background = 'rgba(201,168,76,0.12)'; e.target.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.target.style.background = 'rgba(201,168,76,0.05)'; e.target.style.transform = 'translateY(0)'; }}
            >Find a Factory</a>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: 'clamp(24px, 5vw, 60px)',
            marginTop: '80px', flexWrap: 'wrap'
          }}>
            {[['500+', 'Verified Factories'], ['2K+', 'Active Sellers'], ['10K+', 'Products']].map(([num, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: '800', color: '#C9A84C', lineHeight: 1 }}>{num}</p>
                <p style={{ color: '#4B5563', fontSize: '13px', marginTop: '6px', fontWeight: '500' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 User Types */}
      <section style={{ padding: 'clamp(60px, 10vw, 120px) 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p style={{ color: '#C9A84C', fontSize: '12px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>Who is Nexara for?</p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '800', color: 'white', letterSpacing: '-1px' }}>One Platform. Three Worlds.</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {[
            { icon: '🛍️', title: 'Shoppers', desc: 'Browse thousands of products from verified sellers. Fast delivery, transparent pricing, and secure payments.', cta: 'Start Shopping' },
            { icon: '🏪', title: 'Sellers', desc: 'Create your store, list products, and reach thousands of customers. Only pay after your first sale.', cta: 'Open Your Store', popular: true },
            { icon: '🏭', title: 'Factories', desc: 'Connect directly with verified manufacturers. No 3 agencies before you get your product. Real factories, real prices.', cta: 'Find a Factory' }
          ].map(({ icon, title, desc, cta, popular }) => (
            <div key={title}
              style={{
                background: popular ? 'linear-gradient(135deg, rgba(201,168,76,0.1), rgba(201,168,76,0.04))' : 'rgba(255,255,255,0.02)',
                border: popular ? '1px solid rgba(201,168,76,0.3)' : '1px solid rgba(255,255,255,0.06)',
                borderRadius: '20px', padding: '36px', cursor: 'pointer',
                transition: 'transform 0.3s, border-color 0.3s', position: 'relative'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = popular ? 'rgba(201,168,76,0.3)' : 'rgba(255,255,255,0.06)'; }}
            >
              {popular && (
                <div style={{
                  position: 'absolute', top: '20px', right: '20px',
                  background: 'rgba(201,168,76,0.15)', color: '#C9A84C',
                  fontSize: '10px', fontWeight: '800', letterSpacing: '2px',
                  padding: '4px 10px', borderRadius: '100px'
                }}>POPULAR</div>
              )}
              <div style={{
                width: '56px', height: '56px', borderRadius: '14px', fontSize: '26px',
                background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px'
              }}>{icon}</div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'white', marginBottom: '12px' }}>{title}</h3>
              <p style={{ color: '#6B7280', lineHeight: '1.7', fontSize: '15px', marginBottom: '24px' }}>{desc}</p>
              <span style={{ color: '#C9A84C', fontSize: '14px', fontWeight: '600' }}>{cta} →</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(40px, 8vw, 80px) 24px' }}>
        <div style={{
          maxWidth: '900px', margin: '0 auto', textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,168,76,0.03))',
          border: '1px solid rgba(201,168,76,0.2)', borderRadius: '28px',
          padding: 'clamp(40px, 6vw, 80px) clamp(24px, 5vw, 60px)'
        }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '800', color: 'white', marginBottom: '16px', letterSpacing: '-1px' }}>
            Ready to join Nexara?
          </h2>
          <p style={{ color: '#6B7280', fontSize: '18px', marginBottom: '36px' }}>
            Join thousands of shoppers, sellers, and factories already on the platform.
          </p>
          <a href="/register" style={{
            background: 'linear-gradient(135deg, #C9A84C, #E8C96D)',
            color: '#0A0F1E', fontWeight: '700', fontSize: '16px',
            padding: '16px 44px', borderRadius: '12px', textDecoration: 'none',
            display: 'inline-block', transition: 'transform 0.2s, opacity 0.2s'
          }}
            onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
          >Create Free Account</a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '32px 24px', textAlign: 'center' }}>
        <p style={{ color: '#374151', fontSize: '14px' }}>© 2026 Nexara. All rights reserved.</p>
      </footer>

    </main>
  );
}