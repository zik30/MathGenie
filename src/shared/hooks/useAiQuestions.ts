import { useMutation, useQuery } from '@tanstack/react-query';

interface AskAiPayload {
    question: string;
}

interface AiAnswer {
    answer: string;
}

interface TopQuestion {
    _id: string;
    question: string;
    answer: string;
    user: string;
    count: number;
    createdAt: string;
}

export const useAskAiMutation = (accessToken: string) =>
    useMutation<AiAnswer, Error, AskAiPayload>({
        mutationFn: async ({ question }) => {
            const res = await fetch(
                'https://mathgenie-server.onrender.com/ai/ask',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({ question }),
                },
            );

            if (!res.ok) throw new Error('Ошибка при получении ответа от AI');

            return res.json();
        },
    });

export const useTopQuestionsQuery = (accessToken: string) =>
    useQuery<TopQuestion[]>({
        queryKey: ['top-questions'],
        queryFn: async () => {
            const res = await fetch(
                'https://mathgenie-server.onrender.com/ai/top-questions',
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );

            if (!res.ok)
                throw new Error('Ошибка при загрузке популярных вопросов');

            return res.json();
        },
        enabled: !!accessToken,
    });
