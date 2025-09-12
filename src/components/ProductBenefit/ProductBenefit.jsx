import React from 'react';
import './ProductBenefit.css';

const ProductBenefit = () => {
  const products = [
    {
      id: 1,
      icon: "🌟",
      title: "Un Coupe Faim à effet spectaculaire !",
      titleAr: "مثبط للشهية بتأثير مذهل",
      description: "À base de GOMME ADRAGANTE, il absorbe l'eau et forme un gel visqueux dans l'estomac. Cela ralentit la digestion et crée une sensation de satiété prolongée, aidant ainsi à réduire l'appétit et les fringales.",
      descriptionAr: "يحتوي على صمغ التراغاكانث الذي يمتص الماء ويشكل هلاماً في المعدة"
    },
    {
      id: 2,
      icon: "🔥",
      title: "Un Brûleur de Graisses Polyvalent !",
      titleAr: "حارق دهون متعدد الاستخدامات",
      description: "Grace à sa triple action, il favorise l'élimination et limite le stockage des graisses, tout en augmentant le métabolisme de votre organisme, avec un effet detoxifiant naturel qui accélère le processus de perte de poids.",
      descriptionAr: "بفضل فعاليته الثلاثية، يساعد على حرق الدهون وزيادة معدل الأيض"
    },
    {
      id: 3,
      icon: "✨",
      title: "Une Crème Amincissante Dessinatrice !",
      titleAr: "كريم نحت القوام",
      description: "Grace à ses composants naturels, elle réduit visiblement la cellulite, et assure une peau plus ferme et plus lisse, dessinant ainsi votre silhouette aux règles de l'art !",
      descriptionAr: "بفضل مكوناته الطبيعية، يقلل من السيلوليت ويشد البشرة"
    },
    {
      id: 4,
      icon: "💧",
      title: "Une huile anti chute de cheveux OFFERTE !",
      titleAr: "زيت مكافحة تساقط الشعر مجاناً",
      description: "Formule spéciale pour renforcer les cheveux et prévenir leur chute, offrant brillance et vitalité à votre chevelure.",
      descriptionAr: "تركيبة خاصة لتقوية الشعر ومنع تساقطه مع إضافة البريق والحيوية"
    }
  ];

  return (
    <div className="benefit-container">
      <div className="header-section">
        <h1 className="main-title">Pourquoi choisir CuraSlim?</h1>
        <h2 className="main-title-ar">لماذا اختيار كورا سليم؟</h2>
      </div>
      <div className="benefit-grid">
        {products.map((product) => (
          <div key={product.id} className="benefit-card">
            <div className="card-icon">
              <span className="icon">{product.icon}</span>
            </div>
            <div className="card-content">
              <h3 className="card-title">{product.title}</h3>
              <h4 className="card-title-ar">{product.titleAr}</h4>
              <p className="card-description">{product.description}</p>
              <p className="card-description-ar">{product.descriptionAr}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductBenefit;