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
  const [openFaqIndexes, setOpenFaqIndexes] = useState<number[]>([]);

  // 목차 스크롤 트래킹 (ScrollSpy)
  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map(h => document.getElementById(h.id)).filter(Boolean);
      
      let currentActiveId = '';
      const scrollPosition = window.scrollY + 200; // 스크롤 감지 오프셋

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
    handleScroll(); // 초기 실행

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headings]);

  const toggleFaq = (index: number) => {
    if (openFaqIndexes.includes(index)) {
      setOpenFaqIndexes(openFaqIndexes.filter(i => i !== index));
    } else {
      setOpenFaqIndexes([...openFaqIndexes, index]);
    }
  };

  return (
    <>
      {/* 1. 사이드바용 목차 (TOC) - 데스크톱 뷰 */}
      <div className="detail-sidebar">
        {headings.length > 0 && (
          <div className="sidebar-widget">
            <h4 className="sidebar-title">목차 (TOC)</h4>
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
        <div className="sidebar-widget" style={{ position: 'sticky', top: headings.length > 0 ? '380px' : '100px' }}>
          <h4 className="sidebar-title">진료 예약 및 문의</h4>
          <p style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>
            📞 032-561-5570
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            인천 서구 이음대로 378 로뎀타워 5층 (원당동)
          </p>
          <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '10px', fontSize: '0.8rem' }}>
            <span style={{ color: 'var(--primary)', fontWeight: 700 }}>🚗 주차 안내</span>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>건물 지하주차장 무료 주차 지원 가능</p>
          </div>
        </div>
      </div>

      {/* 2. 메인 화면용 FAQ 아코디언 */}
      {faqs.length > 0 && (
        <div className="faq-container">
          <h2 className="faq-main-title">
            자주 묻는 질문 (FAQ)
          </h2>
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
        </div>
      )}
    </>
  );
}
