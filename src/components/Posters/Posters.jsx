import React from 'react';
import './Posters.css';

let poster1, poster2, poster3;
try { poster1 = require('../../assets/images/Pr1.jpg'); } catch (e) { poster1 = null; }
try { poster2 = require('../../assets/images/Pr2.jpg'); } catch (e) { poster2 = null; }
try { poster3 = require('../../assets/images/Pr3.jpg'); } catch (e) { poster3 = null; }

export default function Posters() {
  const posters = [
    { 
      id: 1, 
      img: poster1, 
      alt: 'Poster 1',
      title: 'Crème amincissante',
      text: 'اكتشفي سر القوام المثالي مع كريمنا التنحيفي يعمل على شد البشرة وتقليل السيلوليت بفعالية، لتظهري بمظهر مشدود ورشيق كل يوم.'
    },
    { 
      id: 2, 
      img: poster2, 
      alt: 'Poster 2',
      title: 'Coup faim',
      text: 'تخلصي من الرغبة في تناول الوجبات بين الأوقات حبوبنا الطبيعية تساعدك على الشعور بالشبع لفترات أطول، لدعم رحلة خسارة الوزن بشكل صحي وآمن.'
    },
    { 
      id: 3, 
      img: poster3, 
      alt: 'Poster 3',
      title: 'Fat Burner',
      text: 'ساعد جسمك على حرق الدهون بفعالية وسرعة يعمل على زيادة معدل الأيض وتحويل الدهون إلى طاقة، لدعم فقدان الوزن بطريقة طبيعية وآمنة.'
    }
  ];

  return (
    <section className="posters" aria-label="Featured posters">
      <div className="container">
        <h2 className="posters__title">منتجات التنحيف الطبيعية</h2>
        <div className="posters__inner">
          {posters.map(p => {
            const isImageFirst = p.id % 2 === 1;
            return (
              <div className="poster-row" key={p.id}>
                <div className="poster__content">
                  {isImageFirst ? (
                    <>
                      <div className="poster__img-side animate-slide-left">
                        {p.img ? (
                          <img src={p.img} alt={p.alt} className="poster__img" />
                        ) : (
                          <div className="poster__placeholder">Poster {p.id}</div>
                        )}
                      </div>
                      <div className="poster__text-side animate-slide-right">
                        <h3 className="poster__title">{p.title}</h3>
                        <p className="poster__description">{p.text}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="poster__text-side animate-slide-left">
                        <h3 className="poster__title">{p.title}</h3>
                        <p className="poster__description">{p.text}</p>
                      </div>
                      <div className="poster__img-side animate-slide-right">
                        {p.img ? (
                          <img src={p.img} alt={p.alt} className="poster__img" />
                        ) : (
                          <div className="poster__placeholder">Poster {p.id}</div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}