import { routes } from 'shared/constants/constants';
import { Layout } from '../layout/Layout';
import { createBrowserRouter } from 'react-router-dom';
import { AiQuestionsPage } from 'pages/aiQuestions';
import { TestsPage } from 'pages/testsPage';
import { HomePage } from 'pages/home';
import { ProfilePage } from 'pages/profile';

export const router = () =>
    createBrowserRouter([
        {
            element: <Layout />,
            children: [
                {
                    path: routes.home,
                    element: <HomePage />,
                },
                {
                    path: routes.subjects,
                    element: <div>subjects</div>,
                },
                {
                    path: routes.questions,
                    element: <AiQuestionsPage />,
                },
                {
                    path: routes.tests,
                    element: <TestsPage />,
                },
                {
                    path: routes.profile,
                    element: <ProfilePage />,
                },
            ],
        },
    ]);
