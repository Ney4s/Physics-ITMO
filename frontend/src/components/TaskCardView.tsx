import { Latex } from './Latex';
import type { TaskCard } from '../types';

export function TaskCardView({ task }: { task: TaskCard }) {
  return (
    <article className="task-card">
      <h3>{task.title}</h3>

      <div className="task-meta">
        <span className="tag">{task.subject}</span>
        <span className="tag sand">{task.grade} класс</span>
        <span className={`tag tag-diff tag-diff-${task.difficultyCode.toLowerCase()}`}>{task.difficulty}</span>
        {task.topics.map((topic) => (
          <span key={topic} className="tag sand">
            {topic}
          </span>
        ))}
      </div>

      <Latex content={task.statementLatex} />

      {task.solutionLatex && (
        <details className="solution">
          <summary>Показать решение</summary>
          <div>
            <Latex content={task.solutionLatex} />
          </div>
        </details>
      )}

      {task.videoEmbedUrl && (
        <div className="video-wrap">
          <iframe src={task.videoEmbedUrl} title={`Видео-разбор: ${task.title}`} allowFullScreen loading="lazy" />
        </div>
      )}

      {task.pdfUrl && (
        <p style={{ marginTop: 12 }}>
          <a className="btn btn-outline btn-sm" href={task.pdfUrl} target="_blank" rel="noreferrer">
            PDF с материалами
          </a>
        </p>
      )}

      <div className="task-date">Опубликовано: {new Date(task.publishedAt).toLocaleDateString('ru-RU')}</div>
    </article>
  );
}
