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
      title: 'كريم التنحيف (Crème amincissante)',
      text: `هل تبحثين عن طريقة طبيعية وفعّالة للحصول على قوام مشدود ورشيق؟ ✨
      
كريم التنحيف الخاص بنا غني بمكونات طبيعية تساعد على:

 تحفيز الدورة الدموية وتنشيط حرق الدهون.  
 تقليل ظهور السيلوليت وشد ترهلات الجلد.  
 ترطيب البشرة ومنحها ملمسًا ناعمًا ومظهرًا صحيًا.  

استخدميه يوميًا مع تدليك خفيف لتحصلي على نتائج واضحة خلال أسابيع قليلة فقط 🌿`
    },
    { 
      id: 2, 
      img: poster2, 
      alt: 'Poster 2',
      title: 'كبسولات كبح الشهية (Coup faim)',
      text: `السيطرة على الجوع هي الخطوة الأولى نحو فقدان الوزن بنجاح 🍏  

كبسولات كبح الشهية تمنحك إحساسًا بالشبع لفترات أطول، مما يساعدك على:

 تقليل الرغبة في تناول الوجبات الخفيفة بين الوجبات الأساسية.  
 التحكم في الكمية المستهلكة من الطعام دون حرمان.  
 دعم عملية فقدان الوزن بشكل طبيعي وآمن.  

اختيارك الأمثل للحفاظ على نظام غذائي متوازن والوصول إلى هدفك بسرعة.`
    },
    { 
      id: 3, 
      img: poster3, 
      alt: 'Poster 3',
      title: 'حارق الدهون (Fat Burner)',
      text: `هل ترغبين في تعزيز عملية الأيض وتسريع حرق الدهون؟ 🔥  

حارق الدهون يعمل بتركيبة متطورة تساعد جسمك على:

 رفع معدل الحرق الطبيعي طوال اليوم.  
 تحويل الدهون المخزنة إلى طاقة نشيطة.  
 تحسين الأداء البدني وزيادة الحيوية أثناء التمارين والأنشطة اليومية.  

مكمل مثالي لمن يسعى إلى نتائج ملموسة في فقدان الوزن بطريقة صحية وآمنة 💪`
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
