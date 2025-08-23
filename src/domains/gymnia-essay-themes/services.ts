import { ThrowHttpError } from '~/generic-errors';
import { GymniaEssayThemesRepository } from './repository';
import { gymniaConfigParamsService } from '../gymnia-config-params/controller';
import { GymniaConfigParamsEnum } from '../gymnia-config-params/model';
import { useAi } from '../useAi';
import { GymniaEssayThemes } from './model';

export class GymniaEssayThemesService {
  constructor(private gymniaEssayThemesRepository: GymniaEssayThemesRepository) {}

  async getThemes() {
    return await this.gymniaEssayThemesRepository.getThemes();
  }

  async getThemeById(id: number) {
    const theme = await this.gymniaEssayThemesRepository.getThemeById(id);

    if (!theme) {
      throw ThrowHttpError('NOT_FOUND');
    }

    return theme;
  }

  async sendEssayToAi(essay: string, theme: GymniaEssayThemes) {
    const systemEssayRule = await gymniaConfigParamsService
      .getSpecificConfigParam(GymniaConfigParamsEnum.REDACAO);

    if (!systemEssayRule) throw ThrowHttpError('NOT_FOUND');

    const { valor_parametro: essayRule } = systemEssayRule;
    const { theme_description: themeDescription } = theme;

    const essayCorrected = await useAi({
      systemContent: `${essayRule  }\nTema realizado: \n${themeDescription}`,
      userContent: essay,
    });

    return essayCorrected;
  }
}
