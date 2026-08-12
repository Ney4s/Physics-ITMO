import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { publicApi } from '../api/endpoints';
import { ReviewList } from './Reviews';
import type { Review } from '../types';

export function Home() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    publicApi.reviews().then(setReviews).catch(() => setReviews([]));
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Физика и математика - понятно, глубоко, с результатом</h1>
          <p>
            Преподаватель физики и математики, исследователь в области космической энергетики. Готовлю школьников
            9-11 классов и студентов младших курсов к экзаменам и олимпиадам.
          </p>
          <div className="achievements">
            <div className="achievement">📚 10+ лет преподавания</div>
            <div className="achievement">🚀 Научные публикации по космической энергетике</div>
            <div className="achievement">🎯 Ученики поступают в ведущие вузы</div>
          </div>
          <Link to="/catalog" className="btn">
            Каталог задач
          </Link>{' '}
          <Link to="/register" className="btn btn-outline">
            Стать учеником
          </Link>
        </div>
      </section>

      <section>
        <div className="container">
          <h2 className="section-title">Отзывы учеников</h2>
          <ReviewList reviews={reviews} />
        </div>
      </section>
    </>
  );
}
