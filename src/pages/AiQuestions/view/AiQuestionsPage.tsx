import { useState, type FC } from 'react';
import { useAuthStore } from 'widgets/login/store/useAuthStore';
import styles from './AiQuestions.module.scss';
import {
    useAskAiMutation,
    useTopQuestionsQuery,
} from 'shared/hooks/useAiQuestions';

export const AiQuestionsPage: FC = () => {
    const { refreshToken } = useAuthStore();
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');

    const { data: suggestions = [] } = useTopQuestionsQuery(refreshToken || '');
    const askAiMutation = useAskAiMutation(refreshToken || '');

    const handleSubmit = async () => {
        if (!question.trim()) return;
        try {
            const result = await askAiMutation.mutateAsync({ question });
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
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>ИИ-помощник по наукам</h1>
                <p>
                    Задайте вопрос по любому предмету и получите подробное
                    объяснение
                </p>
            </header>

            <div className={styles.grid}>
                <div className={styles.leftColumn}>
                    <section className={styles.card}>
                        <h2>🧠 Ваш вопрос</h2>
                        <p className={styles.subtext}>
                            Опишите задачу максимально подробно
                        </p>
                        <textarea
                            placeholder="Например: Как найти корни уравнения x² - 4x + 3 = 0?"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            rows={4}
                        />
                        <button
                            onClick={handleSubmit}
                            disabled={
                                !question.trim() || askAiMutation.isPending
                            }
                            className={styles.submitButton}
                        >
                            {askAiMutation.isPending
                                ? 'Анализирую...'
                                : '📤 Получить ответ'}
                        </button>
                    </section>

                    {response && (
                        <section className={styles.card}>
                            <h2 className={styles.responseTitle}>
                                💡 Ответ ИИ
                            </h2>
                            <pre className={styles.response}>{response}</pre>
                        </section>
                    )}
                </div>

                <aside className={styles.rightColumn}>
                    <section className={styles.card}>
                        <h2>📖 Популярные вопросы</h2>
                        <p className={styles.subtext}>
                            Нажмите, чтобы подставить
                        </p>
                        <div className={styles.suggestions}>
                            {suggestions.map(({ _id, question }) => (
                                <button
                                    key={_id}
                                    onClick={() =>
                                        handleSuggestionClick(question)
                                    }
                                >
                                    {question}
                                </button>
                            ))}
                        </div>
                    </section>

                    <section className={styles.card}>
                        <h2>Возможности ИИ</h2>
                        <ul className={styles.features}>
                            <li>🧮 Решение уравнений</li>
                            <li>📐 Геометрические задачи</li>
                            <li>📊 Статистика и вероятности</li>
                            <li>🔍 Математический анализ</li>
                        </ul>
                    </section>

                    <section className={styles.tipCard}>
                        <div className={styles.icon}>🧠</div>
                        <h3>Совет</h3>
                        <p>Чем подробнее задача, тем точнее ответ!</p>
                    </section>
                </aside>
            </div>
        </div>
    );
};
