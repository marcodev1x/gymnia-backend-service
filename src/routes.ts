import { Router, Request, Response } from 'express';
import { appConfig } from './config/app.config';
import { gymniaRouter } from './domains/gymnia-config-params/routes';
import { isDevelopment } from './global';
import { usersRoutes } from './domains/users/routes';

const routes = Router();

routes.use('/gymnia-params', gymniaRouter);
routes.use('/clients', usersRoutes);

if (isDevelopment) routes.get('/', async (_req: Request, res: Response) => {
  console.log('ZAI API KEY: ', appConfig.zaiApiKey);
  try {
    const zAiApi = await fetch('https://api.z.ai/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${appConfig.zaiApiKey}`,
      },
      body: JSON.stringify({
        model: 'glm-4.5-Flash',
        thinking: {
          type: 'disabled',
        },
        messages: [
          { role: 'system',
            content: 'Você é um professor de história com 20 anos de experiência. Traga exercícios para o professor com a quantidade de questões que ele pedir, utilizando questões geradas por você verificadas historicamente, atente-se ao tema que ele escolher. Traga apenas questões que existam historicamente. Responda EXCLUSIVAMENTE em JSON. É importante que possua gabarito e sejam de multipla escolha até a letra D (A,B,C e D). Siga o nível de dificuldade selecionada pelo professor. Responda apenas em portugues.' },
          {
            role: 'user',
            content: 'Me traga um JSON com 5 questões de história em segunda guerra mundial, relacionada a operação barbarossa.. Nível de dificuldade: DIFÍCIL, com bastante texto.' },
        ],
      }),
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await zAiApi.json() as any;
    console.log(data);

    res.json(data.choices[0].message.content);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Erro ao processar a requisição' });
  }
});

export default routes;
