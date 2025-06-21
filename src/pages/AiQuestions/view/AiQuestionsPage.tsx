import { useState, type FC } from 'react';

export const AiQuestionsPage: FC = () => {
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [suggestions] = useState([
        'Как решить квадратное уравнение x² - 5x + 6 = 0?',
        'Объясните теорему Пифагора с примером',
        'Что такое производная и как её найти?',
        'Как вычислить площадь треугольника?',
    ]);

    const handleSubmit = async () => {
        if (!question.trim()) return;
        setIsLoading(true);

        try {
            const res = await fetch(
                'https://mathgenie-server.onrender.com/api/ask/ai',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ question }),
                },
            );

            if (!res.ok)
                throw new Error('Ошибка при получении ответа с сервера');

            const data = await res.json();
            setResponse(
                data.answer ||
                    'Извините, не удалось получить корректный ответ.',
            );
        } catch (error) {
            console.error(error);
            setResponse(
                'Произошла ошибка при запросе к серверу. Попробуйте позже.',
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        setQuestion(suggestion);
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    ИИ-помощник по наукам
                </h1>
                <p className="text-gray-600 text-lg">
                    Задайте любой вопрос по различным предметам и получите
                    подробное объяснение
                </p>
            </div>

            <div className="grid xl:grid-cols-5 lg:grid-cols-3 gap-6">
                <div className="xl:col-span-3 lg:col-span-2 space-y-6">
                    <div className="border rounded-lg p-4 shadow-sm">
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <span>🧠</span>
                                Ваш вопрос
                            </h2>
                            <p className="text-sm text-gray-500">
                                Опишите задачу или вопрос по любому предмету как
                                можно подробнее
                            </p>
                        </div>
                        <textarea
                            placeholder="Например: Как найти корни уравнения x² - 4x + 3 = 0?"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            rows={4}
                            className="w-full p-3 border rounded resize-none"
                        />
                        <button
                            onClick={handleSubmit}
                            disabled={!question.trim() || isLoading}
                            className="mt-4 w-full py-2 text-white font-semibold rounded bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex items-center justify-center"
                        >
                            {isLoading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                    Анализирую...
                                </>
                            ) : (
                                <>
                                    <span className="mr-2">📤</span> Получить
                                    ответ
                                </>
                            )}
                        </button>
                    </div>

                    {response && (
                        <div className="border rounded-lg p-4 shadow-sm">
                            <h2 className="text-lg font-semibold flex items-center gap-2 text-yellow-600 mb-2">
                                <span>💡</span>
                                Ответ ИИ
                            </h2>
                            <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                                {response}
                            </pre>
                        </div>
                    )}
                </div>

                <div className="xl:col-span-2 lg:col-span-1 space-y-6">
                    <div className="border rounded-lg p-4 shadow-sm">
                        <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
                            <span>📖</span>
                            Популярные вопросы
                        </h2>
                        <p className="text-sm text-gray-500 mb-4">
                            Нажмите на вопрос, чтобы использовать его
                        </p>
                        <div className="space-y-2">
                            {suggestions.map((suggestion, index) => (
                                <button
                                    key={index}
                                    onClick={() =>
                                        handleSuggestionClick(suggestion)
                                    }
                                    className="w-full text-left border rounded px-3 py-2 text-sm hover:bg-gray-100"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="border rounded-lg p-4 shadow-sm">
                        <h2 className="text-lg font-semibold mb-3">
                            Возможности ИИ
                        </h2>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li>🧮 Решение уравнений</li>
                            <li>📐 Геометрические задачи</li>
                            <li>📊 Статистика и вероятности</li>
                            <li>🔍 Математический анализ</li>
                        </ul>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 text-center shadow-sm">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mx-auto flex items-center justify-center mb-2 text-white text-xl">
                            🧠
                        </div>
                        <h3 className="font-semibold mb-1">Совет</h3>
                        <p className="text-sm text-gray-600">
                            Чем подробнее вы опишете задачу, тем более точный
                            ответ вы получите!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
