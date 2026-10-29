'use client';

import React, { useState, useEffect } from 'react';

interface Heading {
  text: string;
  id: string;
  isH3: boolean;
}

interface FAQ {
  question: string;
  answer: string;
}

interface InteractiveDetailProps {
  headings: Heading[];
  faqs: FAQ[];
}

export default function InteractiveDetail({ headings, faqs }: InteractiveDetailProps) {
  const [activeId, setActiveId] = useState<string>('');
  // 기본적으로 모든 FAQ를 펼쳐두거나 첫 번째 항목을 열어두어 사용자 및 크롤러 가독성 향상
  const [openFaqIndexes, setOpenFaqIndexes] = useState<number[]>(
    faqs.map((_, idx) => idx)
  );

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map((h) => document.getElementById(h.id)).filter(Boolean);

      let currentActiveId = '';
      const scrollPosition = window.scrollY + 200;

      for (const el of headingElements) {
        if (el && el.offsetTop <= scrollPosition) {
          currentActiveId = el.id;
        }
      }

      if (currentActiveId) {
        setActiveId(currentActiveId);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headings]);

  const toggleFaq = (index: number) => {
    if (openFaqIndexes.includes(index)) {
      setOpenFaqIndexes(openFaqIndexes.filter((i) => i !== index));
    } else {
      setOpenFaqIndexes([...openFaqIndexes, index]);
    }
  };

  return (
    <>
      {/* 1. 사이드바 목차 및 진료 안내 */}
      <aside className="detail-sidebar" aria-label="글 목차 및 진료 안내">
        {headings.length > 0 && (
          <div className="sidebar-widget">
            <h4 className="sidebar-title">글 목차</h4>
            <ul className="toc-list">
              {headings.map((h, i) => (
                <li key={i} className="toc-item">
                  <a
                    href={`#${h.id}`}
                    className={`toc-link ${h.isH3 ? 'toc-link-h3' : ''} ${
                      activeId === h.id ? 'active' : ''
                    }`}
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 병원 정보 고정 카드 */}
        <div
          className="sidebar-widget"
          style={{ position: 'sticky', top: headings.length > 0 ? '380px' : '100px' }}
        >
          <h4 className="sidebar-title">진료 예약 및 문의</h4>
          <p
            style={{
              fontSize: '1.2rem',
              fontWeight: 800,
              color: 'var(--primary)',
              marginBottom: '0.5rem',
            }}
          >
            📞 032-561-5570
          </p>
          <p
            style={{
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              marginBottom: '1rem',
              lineHeight: 1.5,
            }}
          >
            인천 서구 이음대로 378 로뎀타워 5층 (아라동)
          </p>
          <div
            style={{
              padding: '0.75rem',
              background: '#F8FAFC',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              fontSize: '0.8rem',
            }}
          >
            <span style={{ color: 'var(--primary)', fontWeight: 700 }}>🚗 주차 및 내원 안내</span>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem', lineHeight: 1.45 }}>
              로뎀타워 건물 내 지하주차장 이용 가능
            </p>
          </div>
        </div>
      </aside>

      {/* 2. 자주 묻는 질문 (FAQ) */}
      {faqs.length > 0 && (
        <section className="faq-container" aria-label="자주 묻는 질문">
          <h2 className="faq-main-title">자주 묻는 질문 (FAQ)</h2>
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndexes.includes(index);
            return (
              <div key={index} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <div className="faq-question" onClick={() => toggleFaq(index)}>
                  <span>Q. {faq.question}</span>
                  <span className="faq-arrow">{isOpen ? '−' : '+'}</span>
                </div>
                <div className="faq-answer">
                  <p>A. {faq.answer}</p>
                </div>
              </div>
            );
          })}
        </section>
      )}
    </>
  );
}
