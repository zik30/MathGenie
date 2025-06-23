import { Button, Container, Typography } from 'shared/ui';
import styles from './AiQuestions.module.scss';
import { useState, type FC } from 'react';
import { useAuthStore } from 'widgets/login/store/useAuthStore';
import {
    useAskAiMutation,
    useTopQuestionsQuery,
} from 'widgets/aiQuestions/api/useAiQuestions';
import type { AskAiResponse, PopularQuestion } from '../types/AiQuestions';

export const AiQuestions: FC = () => {
    const { refreshToken } = useAuthStore();
    const [question, setQuestion] = useState<string>('');
    const [response, setResponse] = useState<AskAiResponse['answer']>('');
    const { data: suggestions = [] }: { data: PopularQuestion[] } =
        useTopQuestionsQuery(refreshToken || '') as any;
    const askAiMutation = useAskAiMutation(refreshToken || '');

    const handleSubmit = async () => {
        if (!question.trim()) return;
        try {
            const result: AskAiResponse = await askAiMutation.mutateAsync({
                question,
            });
            setResponse(
                result.answer ||
                    'Извините, не удалось получить корректный ответ.',
            );
        } catch (e) {
            console.error(e);
            setResponse(
                'Произошла ошибка при запросе к серверу. Попробуйте позже.',
            );
        }
    };

    const handleSuggestionClick = (q: string) => {
        setQuestion(q);
    };

    return (
        <Container>
            <div className={styles.container}>
                <header className={styles.header}>
                    <Typography variant="h2" color="gradient">
                        ИИ-помощник по наукам
                    </Typography>
                    <Typography variant="h4">
                        Задайте вопрос и получите подробный ответ
                    </Typography>
                </header>

                <div className={styles.grid}>
                    <div className={styles.leftColumn}>
                        <section className={styles.card}>
                            <Typography variant="h5">🧠 Ваш вопрос</Typography>
                            <p className={styles.subtext}>
                                <Typography variant="base">
                                    Опишите задачу максимально подробно
                                </Typography>
                            </p>
                            <textarea
                                placeholder="Например: Как найти корни уравнения x² - 4x + 3 = 0?"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                rows={4}
                            />
                            <Button
                                onClick={handleSubmit}
                                disabled={
                                    !question.trim() || askAiMutation.isPending
                                }
                                className={styles.submitButton}
                            >
                                {askAiMutation.isPending
                                    ? 'Анализирую...'
                                    : '📤 Получить ответ'}
                            </Button>
                        </section>

                        {response && (
                            <section className={styles.card}>
                                <div className={styles.responseTitle}>
                                    <Typography variant="h5">
                                        💡 Ответ ИИ
                                    </Typography>
                                </div>
                                <pre className={styles.response}>
                                    {response}
                                </pre>
                            </section>
                        )}
                    </div>

                    <aside className={styles.rightColumn}>
                        <section className={styles.card}>
                            <Typography variant="h2">
                                📖 Популярные вопросы
                            </Typography>
                            <div className={styles.subtext}>
                                <Typography variant="base">
                                    Нажмите, чтобы подставить
                                </Typography>
                            </div>
                            <div className={styles.suggestions}>
                                {suggestions.map(({ _id, question }) => (
                                    <Button
                                        key={_id}
                                        onClick={() =>
                                            handleSuggestionClick(question)
                                        }
                                    >
                                        {question}
                                    </Button>
                                ))}
                            </div>
                        </section>

                        <section className={styles.card}>
                            <Typography variant="h2">Возможности ИИ</Typography>
                            <ul className={styles.features}>
                                <li>🧮 Решение уравнений</li>
                                <li>📐 Геометрические задачи</li>
                                <li>📊 Статистика и вероятности</li>
                                <li>🔍 Математический анализ</li>
                            </ul>
                        </section>

                        <section className={styles.tipCard}>
                            <div className={styles.icon}>🧠</div>
                            <Typography variant="h3">Совет</Typography>
                            <Typography variant="base">
                                Чем подробнее задача, тем точнее ответ!
                            </Typography>
                        </section>
                    </aside>
                </div>
            </div>
        </Container>
    );
};
