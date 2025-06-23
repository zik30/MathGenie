import { useQuery, useMutation } from '@tanstack/react-query';
import { requester } from '../api/requester';

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
            const res = await requester.post(
                '/ai/ask',
                { question },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );
            return res.data;
        },
    });

export const useTopQuestionsQuery = (accessToken: string) =>
    useQuery<TopQuestion[]>({
        queryKey: ['top-questions'],
        queryFn: async () => {
            const res = await requester.get('/ai/top-questions', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return res.data;
        },
        enabled: !!accessToken,
    });
