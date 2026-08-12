import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TaskCardView } from '../components/TaskCardView';
import type { TaskCard } from '../types';

const task: TaskCard = {
  id: 1,
  title: 'Идеальный газ в цикле',
  statementLatex: 'Найдите КПД цикла, если $Q_1 = 500$ Дж.',
  solutionLatex: '$\\eta = 0{,}4$',
  subject: 'Физика',
  subjectCode: 'PHYSICS',
  grade: 10,
  difficulty: 'Сложная',
  difficultyCode: 'HARD',
  published: true,
  topics: ['Термодинамика'],
  videoEmbedUrl: 'https://www.youtube.com/embed/test',
  publishedAt: '2026-05-01',
};

describe('TaskCardView', () => {
  it('показывает название и мета-теги', () => {
    render(<TaskCardView task={task} />);

    expect(screen.getByRole('heading', { name: 'Идеальный газ в цикле' })).toBeInTheDocument();
    expect(screen.getByText('Физика')).toBeInTheDocument();
    expect(screen.getByText('10 класс')).toBeInTheDocument();
    expect(screen.getByText('Сложная')).toBeInTheDocument();
    expect(screen.getByText('Термодинамика')).toBeInTheDocument();
  });

  it('встраивает видео-разбор и прячет решение под спойлер', () => {
    render(<TaskCardView task={task} />);

    expect(screen.getByTitle('Видео-разбор: Идеальный газ в цикле')).toBeInTheDocument();
    expect(screen.getByText('Показать решение')).toBeInTheDocument();
  });

  it('не рисует видео-блок, если ссылки нет', () => {
    render(<TaskCardView task={{ ...task, videoEmbedUrl: undefined }} />);
    expect(screen.queryByTitle(/Видео-разбор/)).not.toBeInTheDocument();
  });
});
