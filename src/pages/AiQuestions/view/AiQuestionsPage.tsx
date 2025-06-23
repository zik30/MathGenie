import { useAuthStore } from 'widgets/login/store/useAuthStore';
import { AiQuestions } from 'widgets/aiQuestions';
import {
    useTopQuestionsQuery,
    useAskAiMutation,
} from 'widgets/aiQuestions/api/useAiQuestions';
import { Loader } from 'shared/ui';

export const AiQuestionsPage = () => {
    const { refreshToken } = useAuthStore();
    const { isPending: answerLoading } = useAskAiMutation(refreshToken || '');
    const { isLoading: topQuestionsLoading } = useTopQuestionsQuery(
        refreshToken || '',
    );
    const isLoading = answerLoading || topQuestionsLoading;

    if (isLoading) {
        return <Loader />;
    }

    return <AiQuestions />;
};
