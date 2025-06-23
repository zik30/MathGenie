import { useMutation, useQuery } from '@tanstack/react-query';
import { requester } from 'shared/api/requester';
import type {
    AskAiResponse,
    PopularQuestion,
    AskAiPayload,
} from '../types/AiQuestions';

export const useAskAiMutation = (accessToken: string) =>
    useMutation<AskAiResponse, Error, AskAiPayload>({
        mutationFn: async ({ question }) => {
            const res = await requester.post(
                '/ai/ask',
                { question },
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                },
            );
            return res.data;
        },
    });

export const useTopQuestionsQuery = (accessToken: string) =>
    useQuery<PopularQuestion[]>({
        queryKey: ['top-questions'],
        queryFn: async () => {
            const res = await requester.get('/ai/top-questions', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            return res.data;
        },
        enabled: !!accessToken,
    });
