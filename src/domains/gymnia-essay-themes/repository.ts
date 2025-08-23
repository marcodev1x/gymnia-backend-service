import { GymniaEssayThemes } from './model';

export interface GymniaEssayThemesRepository {
    getThemes(): Promise<GymniaEssayThemes[]>;
    getThemeById(id: number): Promise<GymniaEssayThemes | undefined>;
}

export class GymniaEssayThemesImplementation implements GymniaEssayThemesRepository {
  async getThemes(): Promise<GymniaEssayThemes[] | []> {
    return await GymniaEssayThemes.query();
  }

  async getThemeById(id: number): Promise<GymniaEssayThemes | undefined> {
    return await GymniaEssayThemes.query().findById(id);
  }
}
