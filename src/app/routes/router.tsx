import { routes } from 'shared/constants/constants';
import { Layout } from '../layout/Layout';
import { createBrowserRouter } from 'react-router-dom';
import { AiQuestionsPage } from 'pages/aiQuestions';
import { HomePage } from 'pages/home';
import { LoginPage } from 'pages/loginPage';
import { ProfilePage } from 'pages/profile';
import { TestsPage } from 'pages/testsPage';

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
                    path: routes.login,
                    element: <LoginPage />,
                },
                {
                    path: routes.test,
                    element: <TestsPage />,
                },
                {
                    path: routes.profile,
                    element: <ProfilePage />,
                },
            ],
        },
    ]);
